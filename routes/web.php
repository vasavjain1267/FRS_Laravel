<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\RecruitmentController;
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
    Route::get('/dashboard', [RecruitmentController::class, 'index'])->name('dashboard');

    // --- NEW APPLICANT DASHBOARD ROUTES ---
    Route::get('/applications', [RecruitmentController::class, 'myApplications'])->name('applicant.applications');
    Route::get('/applications/{id}', [RecruitmentController::class, 'show'])->name('applicant.applications.show');
    Route::get('/applications/{id}/export/pdf', [RecruitmentController::class, 'exportPdf'])->name('applicant.applications.export.pdf');
    Route::get('/applications/{id}/export/excel', [RecruitmentController::class, 'exportExcel'])->name('applicant.applications.export.excel');

    // Application Wizard Routes
    Route::get('/apply/{advertisement}', [RecruitmentController::class, 'showApplyForm'])->name('applicant.apply');
    Route::post('/apply/{advertisement}/draft', [RecruitmentController::class, 'saveDraft'])->name('applicant.draft');
    Route::post('/apply/{advertisement}/submit', [RecruitmentController::class, 'submitApplication'])->name('applicant.store');
});

// Shared Admin + HOD Routes
Route::middleware(['auth', 'role:admin,hod'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Applications (both admin and hod can access)
    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/{id}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::patch('/applications/{id}', [ApplicationController::class, 'updateStatus'])->name('applications.update');
    Route::get('/applications/{id}/export/pdf', [ApplicationController::class, 'exportPdf'])->name('applications.export.pdf');
    Route::get('/applications/{id}/export/excel', [ApplicationController::class, 'exportExcel'])->name('applications.export.excel');

    // Admin-only routes (nested)
    Route::middleware('role:admin')->group(function () {
        Route::get('/jobs', [RecruitmentController::class, 'adminIndex'])->name('jobs.index');
        Route::get('/jobs/create', [RecruitmentController::class, 'create'])->name('jobs.create');
        Route::post('/jobs', [RecruitmentController::class, 'store'])->name('jobs.store');
        Route::patch('/users/{user}/role', [AdminController::class, 'updateRole'])->name('users.update-role');
        Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    });
});

require __DIR__.'/auth.php';
