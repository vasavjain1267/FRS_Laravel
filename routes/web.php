<?php

use App\Http\Controllers\JobOpeningController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Applicant Routes
Route::middleware(['auth', 'role:applicant'])->group(function () {
    Route::get('/dashboard', [JobOpeningController::class, 'index'])->name('dashboard');
    Route::get('/applications', function () {
        return 'My Applications Page (Coming Soon)';
    })->name('applicant.applications');

    // Application Wizard Routes
    Route::get('/apply/{advertisement}', [JobOpeningController::class, 'showApplyForm'])->name('applicant.apply');
    Route::post('/apply/{advertisement}/draft', [JobOpeningController::class, 'saveDraft'])->name('applicant.draft');
    Route::post('/apply/{advertisement}/submit', [JobOpeningController::class, 'submitApplication'])->name('applicant.store');
});

// Admin Job Routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/jobs/create', [JobOpeningController::class, 'create'])->name('jobs.create');
    Route::post('/admin/jobs', [JobOpeningController::class, 'store'])->name('jobs.store');

    // Placeholder routes
    Route::get('/admin', function () {
        return 'Admin Dashboard Overview (Coming Soon)';
    })->name('admin.dashboard');
    Route::get('/admin/applications', function () {
        return 'Review Applications (Coming Soon)';
    })->name('admin.applications');
});

require __DIR__.'/auth.php';
