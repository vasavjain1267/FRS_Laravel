<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\ApplicationController;
use App\Mail\ApplicationSubmitted;
use App\Mail\RefereeNotification;
use App\Models\Advertisement;
use App\Models\JobApplication;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JobOpeningController extends Controller
{
    /**
     * Dashboard: Display active advertisements.
     */
    public function index()
    {
        $advertisements = Advertisement::where('is_active', true)->latest()->get();
        $submittedAdvtIds = [];
        $draftAdvtIds = [];

        if (Auth::check()) {
            $applications = JobApplication::where('user_id', Auth::id())
                ->get(['advertisement_id', 'status']);

            foreach ($applications as $app) {
                if ($app->status === 'submitted') {
                    $submittedAdvtIds[] = $app->advertisement_id;
                } elseif ($app->status === 'draft') {
                    $draftAdvtIds[] = $app->advertisement_id;
                }
            }
        }

        return Inertia::render('Dashboard', [
            'advertisements' => $advertisements,
            'submittedAdvtIds' => $submittedAdvtIds,
            'draftAdvtIds' => $draftAdvtIds,
        ]);
    }

    /**
     * Applicant: View their own application list.
     */
    public function myApplications()
    {
        $applications = JobApplication::with('advertisement')
            ->where('user_id', Auth::id())
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'advertisement' => $app->advertisement,
                    'department' => $app->department,
                    'grade' => $app->grade,
                    'status' => $app->status,
                    'current_step' => $app->form_data['current_step'] ?? 1,
                    'updated_at' => $app->updated_at->format('M d, Y - h:i A'),
                    'has_pdf' => $app->status === 'submitted',
                    'pdf_url' => $app->status === 'submitted' ? route('applicant.applications.export.pdf', $app->id) : null,
                ];
            });

        return Inertia::render('Applicant/MyApplications', [
            'applications' => $applications,
        ]);
    }

    /**
     * Applicant: View their detailed read-only application.
     */
    public function show($id)
    {
        // Security: Ensure user can only see their own application
        $application = JobApplication::with('advertisement')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return Inertia::render('Applicant/ApplicationShow', [
            'application' => $application,
        ]);
    }

    /**
     * Applicant: Securely export their own PDF.
     */
    public function exportPdf($id)
    {
        $application = JobApplication::with(['user', 'advertisement'])
            ->where('user_id', Auth::id()) // Ownership check
            ->findOrFail($id);

        $data = $application->form_data;
        $p = $data['personal_details'] ?? [];

        $pdf = Pdf::loadView('pdf.application_format', [
            'application' => $application,
            'advertisement' => $application->advertisement,
            'data' => $data,
        ]);

        // Sanitize reference number for filename (remove slashes)
        $safeRef = str_replace(['/', '\\'], '_', $application->advertisement->reference_number ?? 'Ref');
        $name = str_replace(' ', '_', $p['first_name'] ?? 'Applicant');
        $fileName = "Application_{$name}_{$safeRef}.pdf";

        return $pdf->stream($fileName);
    }

    /**
     * Applicant: Securely export their own Excel data.
     */
    public function exportExcel($id)
    {
        // Security: Ensure user owns the data
        $application = JobApplication::where('user_id', Auth::id())->findOrFail($id);

        // Proxy to Admin controller logic to avoid repeating CSV generation code
        return app(ApplicationController::class)->exportExcel($id);
    }

    /**
     * Show the application form wizard.
     */
    public function showApplyForm(Advertisement $advertisement)
    {
        $application = JobApplication::where('user_id', Auth::id())
            ->where('advertisement_id', $advertisement->id)
            ->first();

        if ($application && $application->status === 'submitted') {
            return redirect()->route('dashboard')->with('error', 'Application already submitted for this position.');
        }

        return Inertia::render('Applicant/ApplyForm', [
            'advertisement' => $advertisement,
            'existingDraft' => $application ? $application->form_data : null,
            'existingDepartment' => $application ? $application->department : '',
            'existingGrade' => $application ? $application->grade : '',
        ]);
    }

    /**
     * SAVE AS DRAFT
     */
    public function saveDraft(Request $request, Advertisement $advertisement)
    {
        // 1. Grab only the fields that exist in your database columns
        // and provide defaults for the ones missing from the request
        $data = collect($request->only(['department', 'grade']))
            ->map(fn ($value) => $value ?? '') // Turn NULL into ''
            ->all();

        $formData = $request->input('form_data', []);

        // 2. Handle profile image
        if ($request->hasFile('form_data.personal_details.profile_image')) {
            $path = $request->file('form_data.personal_details.profile_image')
                ->store('applications/'.Auth::id()."/{$advertisement->id}/photos", 'public');
            $formData['personal_details']['profile_image'] = $path;
        }

        // 3. Upsert using the sanitized data
        JobApplication::updateOrCreate(
            ['user_id' => Auth::id(), 'advertisement_id' => $advertisement->id],
            array_merge($data, [
                'form_data' => $formData,
                'status' => 'draft',
            ])
        );

        return redirect()->back();
    }

    /**
     * FINAL SUBMIT
     */
    public function submitApplication(Request $request, Advertisement $advertisement)
    {
        $validated = $request->validate([
            'department' => 'required|string',
            'grade' => 'required|string',
            'form_data' => 'required|array',
        ]);

        $user = Auth::user();
        $formData = $validated['form_data'];
        $documentPaths = $formData['uploaded_documents'] ?? [];

        // 1. Process Profile Image
        if ($request->hasFile('form_data.personal_details.profile_image')) {
            $path = $request->file('form_data.personal_details.profile_image')
                ->store("applications/{$user->id}/{$advertisement->id}/photos", 'public');
            $formData['personal_details']['profile_image'] = $path;
        }

        // 2. Process Supporting Documents
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $key => $file) {
                $documentPaths[$key] = $file->store("applications/{$user->id}/{$advertisement->id}", 'public');
            }
        }
        $formData['uploaded_documents'] = $documentPaths;

        // 3. Save to Database
        $application = JobApplication::updateOrCreate(
            ['user_id' => $user->id, 'advertisement_id' => $advertisement->id],
            [
                'department' => $validated['department'],
                'grade' => $validated['grade'],
                'form_data' => $formData,
                'status' => 'submitted',
            ]
        );

        // 4. Generate & Save PDF
        $pdf = Pdf::loadView('pdf.application_format', [
            'application' => $application,
            'user' => $user,
            'advertisement' => $advertisement,
            'data' => $formData,
        ]);

        Storage::disk('public')->put("applications/{$user->id}/{$advertisement->id}/Final_Application_Form.pdf", $pdf->output());

        // 5. Email Notification
        Mail::to($user->email)->send(new ApplicationSubmitted($application, $pdf->output()));

        // 6. Email Notifications to Referees
        $referees = $formData['referees_section']['referees'] ?? [];
        $applicantName = trim(($formData['personal_details']['first_name'] ?? '').' '.($formData['personal_details']['last_name'] ?? ''));

        foreach ($referees as $referee) {
            // Only send if the referee array actually has an email address
            if (! empty($referee['email'])) {
                Mail::to($referee['email'])->send(new RefereeNotification($application, $applicantName, $referee));
            }
        }

        return redirect()->route('dashboard')->with('success', 'Application Submitted! A confirmation copy has been sent to your email.');
    }

    /**
     * Admin: Advertisement management
     */
    public function adminIndex()
    {
        return Inertia::render('Admin/Jobs/Index', [
            'advertisements' => Advertisement::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Jobs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_number' => 'required|string|unique:advertisements,reference_number',
            'title' => 'required|string|max:255',
            'deadline' => 'required|date',
            'document' => 'required|file|mimes:pdf|max:5120',
            'departments' => 'required|array|min:1',
        ]);

        $filePath = $request->file('document')->store('advertisements', 'public');

        Advertisement::create([
            'reference_number' => $validated['reference_number'],
            'title' => $validated['title'],
            'deadline' => $validated['deadline'],
            'departments' => $validated['departments'],
            'document_path' => $filePath,
        ]);

        return redirect()->route('admin.jobs.create')->with('success', 'Advertisement published successfully!');
    }
}
