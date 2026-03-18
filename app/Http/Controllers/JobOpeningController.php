<?php

namespace App\Http\Controllers;

use App\Models\JobOpening;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class JobOpeningController extends Controller
{
    /**
     * Display active job openings.
     */
    public function index()
    {
        $jobs = JobOpening::where('is_active', true)->latest()->get();
        
        $appliedJobIds = Auth::check() 
            ? JobApplication::where('user_id', Auth::id())->pluck('job_opening_id')->toArray()
            : [];

        return Inertia::render('Dashboard', [
            'jobs' => $jobs,
            'appliedJobIds' => $appliedJobIds
        ]);
    }

    /**
     * Show the long-form application page.
     */
    public function showApplyForm(JobOpening $job)
    {
        // Check if already applied to prevent manual URL access
        $hasApplied = JobApplication::where('user_id', Auth::id())
            ->where('job_opening_id', $job->id)
            ->exists();

        if ($hasApplied) {
            return redirect()->route('dashboard')->with('error', 'You have already submitted an application for this position.');
        }

        return Inertia::render('Applicant/ApplyForm', [
            'job' => $job
        ]);
    }

    /**
     * Handle the complex application submission.
     */
    public function submitApplication(Request $request, JobOpening $job)
    {
        $validated = $request->validate([
            'sop' => 'required|string|min:100',
            'research_interest' => 'required|string|min:50',
            // Future fields: 'cv_path' => 'required|file|mimes:pdf|max:2048',
        ]);

        JobApplication::create([
            'user_id' => Auth::id(),
            'job_opening_id' => $job->id,
            'sop' => $validated['sop'],
            'research_interest' => $validated['research_interest'],
            'status' => 'pending'
        ]);

        return redirect()->route('dashboard')->with('status', 'Application for ' . $job->title . ' submitted successfully!');
    }

    /**
     * Admin: Create Job View
     */
    public function create()
    {
        return Inertia::render('Admin/Jobs/Create');
    }

    /**
     * Admin: Store Job
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'description_and_criteria' => 'required|string',
            'deadline' => 'required|date',
        ]);

        JobOpening::create($validated);

        return redirect()->route('jobs.create')->with('status', 'Job Opening published successfully!');
    }
}