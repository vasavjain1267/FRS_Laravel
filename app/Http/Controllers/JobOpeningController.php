<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobOpeningController extends Controller
{
    /**
     * Display active advertisements on the dashboard.
     */
    public function index()
    {
        $advertisements = Advertisement::where('is_active', true)->latest()->get();

        $submittedAdvtIds = [];
        $draftAdvtIds = [];

        if (Auth::check()) {
            // Fetch all applications for this user and look at their status
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
     * Admin: Create Advertisement View
     */
    public function create()
    {
        return Inertia::render('Admin/Jobs/Create');
    }

    /**
     * Admin: Store Advertisement & Upload PDF
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'reference_number' => 'required|string|unique:advertisements,reference_number',
            'title' => 'required|string|max:255',
            'deadline' => 'required|date',
            'document' => 'required|file|mimes:pdf|max:5120',

            // 1. Must be an array with at least one department
            'departments' => 'required|array|min:1',

            // 2. THE FIX: Every department inside the array MUST have at least one grade!
            'departments.*' => 'required|array|min:1',
        ], [
            // Custom error message so the Admin understands what went wrong
            'departments.*.min' => 'Every selected department must have at least one grade assigned to it.',
        ]);

        $filePath = $request->file('document')->store('advertisements', 'public');

        Advertisement::create([
            'reference_number' => $validated['reference_number'],
            'title' => $validated['title'],
            'deadline' => $validated['deadline'],
            'departments' => $validated['departments'],
            'document_path' => $filePath,
        ]);

        return redirect()->route('jobs.create')->with('success', 'Advertisement published successfully!');
    }

    /**
     * Show the long-form application wizard.
     */
    public function showApplyForm(Advertisement $advertisement)
    {
        // Check if they already have an application started or submitted
        $application = JobApplication::where('user_id', Auth::id())
            ->where('advertisement_id', $advertisement->id)
            ->first();

        // If they already submitted it fully, kick them back to the dashboard
        if ($application && $application->status === 'submitted') {
            return redirect()->route('dashboard')->with('error', 'You have already submitted an application for this advertisement.');
        }

        return Inertia::render('Applicant/ApplyForm', [
            'advertisement' => $advertisement,
            // Pass the existing draft data to React so they can resume where they left off!
            'existingDraft' => $application ? $application->form_data : null,
            'existingDepartment' => $application ? $application->department : '',
            'existingGrade' => $application ? $application->grade : '',
        ]);
    }

    /**
     * SAVE AS DRAFT: Handles partial saves without strict validation
     */
    public function saveDraft(Request $request, Advertisement $advertisement)
    {
        JobApplication::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'advertisement_id' => $advertisement->id,
            ],
            [
                'department' => $request->input('department', ''),
                'grade' => $request->input('grade', ''),
                'form_data' => $request->input('form_data', []),
                'status' => 'draft',
            ]
        );

        return redirect()->back();
    }

    /**
     * FINAL SUBMIT: Handles the final lock-in of the application
     */
    public function submitApplication(Request $request, Advertisement $advertisement)
    {
        // Only run strict validation when they actually hit "Submit Application"
        $validated = $request->validate([
            'department' => 'required|string',
            'grade' => 'required|string',
            'form_data' => 'required|array',
        ]);

        JobApplication::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'advertisement_id' => $advertisement->id,
            ],
            [
                'department' => $validated['department'],
                'grade' => $validated['grade'],
                'form_data' => $validated['form_data'],
                'status' => 'submitted', 
            ]
        );

        return redirect()->route('dashboard')->with('success', 'Your application has been submitted successfully!');
    }
}
