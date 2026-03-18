<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobOpeningController;
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

Route::get('/dashboard', [JobOpeningController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:applicant']) // <--- Added 'role:applicant'
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Job Routes - ONLY accessible by users with the 'admin' role
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/jobs/create', [JobOpeningController::class, 'create'])->name('jobs.create');
    Route::post('/admin/jobs', [JobOpeningController::class, 'store'])->name('jobs.store');
});

// Inside the 'role:applicant' group (Update your dashboard route to be in this group)
Route::middleware(['auth', 'verified', 'role:applicant'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\JobOpeningController::class, 'index'])->name('dashboard');
    
    // Placeholder routes so our sidebar doesn't crash
    Route::get('/applications', function () { return "My Applications Page (Coming Soon)"; })->name('applicant.applications');
});

// Inside the 'role:admin' group
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/jobs/create', [\App\Http\Controllers\JobOpeningController::class, 'create'])->name('jobs.create');
    
    // Placeholder routes
    Route::get('/admin', function () { return "Admin Dashboard Overview (Coming Soon)"; })->name('admin.dashboard');
    Route::get('/admin/applications', function () { return "Review Applications (Coming Soon)"; })->name('admin.applications');
});

Route::get('/jobs/{job}/apply', [JobOpeningController::class, 'showApplyForm'])->name('jobs.apply.form');
Route::post('/jobs/{job}/apply', [JobOpeningController::class, 'submitApplication'])->name('jobs.apply.submit');

require __DIR__.'/auth.php';