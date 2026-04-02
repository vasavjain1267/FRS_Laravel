<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use App\Models\Department;
use App\Models\JobApplication;
use App\Models\User; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();

        $applicationsQuery = JobApplication::query();

        if ($user->role === 'hod') {
            $applicationsQuery->where('department', $user->department);
        }

        $statusCounts = (clone $applicationsQuery)
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        $byDepartment = (clone $applicationsQuery)
            ->select('department', DB::raw('count(*) as count'))
            ->whereIn('status', ['submitted', 'shortlisted', 'rejected'])
            ->groupBy('department')
            ->orderByDesc('count')
            ->get();

        $byAdvertisement = (clone $applicationsQuery)
            ->select('advertisement_id', DB::raw('count(*) as count'))
            ->whereIn('status', ['submitted', 'shortlisted', 'rejected'])
            ->with('advertisement:id,title,reference_number')
            ->groupBy('advertisement_id')
            ->orderByDesc('count')
            ->get();

        $overTime = (clone $applicationsQuery)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('count(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(30))
            ->whereIn('status', ['submitted', 'shortlisted', 'rejected'])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $viewFolder = $user->role === 'admin' ? 'Admin' : 'Hod';

        return Inertia::render("{$viewFolder}/Dashboard", [
            'stats' => [
                'totalAdvertisements' => Advertisement::count(),
                'activeAdvertisements' => Advertisement::where('is_active', true)->count(),
                'totalApplications' => (clone $applicationsQuery)->whereIn('status', ['submitted', 'shortlisted', 'rejected'])->count(),
                'submitted' => $statusCounts['submitted'] ?? 0,
                'shortlisted' => $statusCounts['shortlisted'] ?? 0,
                'rejected' => $statusCounts['rejected'] ?? 0,
                'drafts' => $statusCounts['draft'] ?? 0,
                'totalApplicants' => $user->role === 'admin' ? User::where('role', 'applicant')->count() : null,
            ],
            'byDepartment' => $byDepartment,
            'byAdvertisement' => $byAdvertisement,
            'overTime' => $overTime,
            'recentApplications' => (clone $applicationsQuery)->with(['user', 'advertisement'])
                ->whereIn('status', ['submitted', 'shortlisted', 'rejected'])
                ->latest()
                ->take(5)
                ->get(),
            'recentAdvertisements' => Advertisement::latest()->take(5)->get(),
        ]);
    }

    /**
     * Display Settings page for Admin/HOD
     */
    public function settings(Request $request)
    {
        $user = $request->user();
        $viewFolder = $user->role === 'admin' ? 'Admin' : 'Hod';

        return Inertia::render("{$viewFolder}/Settings", [
            'departments' => Department::orderBy('name')->get(),
            'status' => session('status'),
            'mustVerifyEmail' => false, 
        ]);
    }

    /**
     * Store a new department (Admin only)
     */
    public function storeDepartment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:departments,name|max:255',
        ]);

        Department::create($request->only('name'));

        return back()->with('success', 'Department added successfully.');
    }

    /**
     * Delete a department (Admin only)
     */
    public function destroyDepartment(Department $department)
    {
        $department->delete();

        return back()->with('success', 'Department deleted successfully.');
    }

    /**
     * Manage Users and assign HOD roles
     */
    public function users()
    {
        $users = User::whereIn('role', ['hod', 'applicant'])
            ->select('id', 'name', 'email', 'role', 'department')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'departments' => Department::orderBy('name')->get(), 
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:hod,applicant',
            'department' => 'required_if:role,hod|string|nullable|max:255',
        ]);

        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot change your own role.');
        }

        $user->update([
            'role' => $request->role,
            'department' => $request->role === 'hod' ? $request->department : null,
        ]);

        return back()->with('success', 'Role updated to '.strtoupper($request->role)." for {$user->name}.");
    }
}
