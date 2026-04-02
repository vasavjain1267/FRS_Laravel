<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        // This is specifically the Applicant's master profile view
        return Inertia::render('Profile/MasterProfile', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $user->update([
            'name' => $request->input('name', $user->name),
        ]);

        if ($user->role === 'applicant') {
            $request->validate([
                'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            ]);

            $profileData = $request->except(['name', 'email', 'profile_image', '_method']);

            // Handle File Uploads for the Applicant Profile
            if ($request->hasFile('profile_image')) {
                $currentProfile = $user->applicantProfile;

                // Delete the old image if it exists
                if ($currentProfile && $currentProfile->photo_path) {
                    Storage::disk('public')->delete($currentProfile->photo_path);
                }

                // Store the new image
                $profileData['photo_path'] = $request->file('profile_image')->store("profiles/{$user->id}", 'public');
            }

            // Update or Create the 1-to-1 Applicant Profile
            $user->applicantProfile()->updateOrCreate(
                ['user_id' => $user->id],
                $profileData
            );

            // Redirect back to Applicant Master Profile
            return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
        }

        // --- Admin & HOD Redirections ---
        if ($user->role === 'admin') {
            return Redirect::route('admin.settings')->with('success', 'Profile updated successfully.');
        }

        if ($user->role === 'hod') {
            return Redirect::route('hod.settings')->with('success', 'Profile updated successfully.');
        }

        // Fallback for any unknown roles
        return Redirect::route('dashboard')->with('success', 'Profile updated successfully.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);
        $user = $request->user();

        // Clean up the user's profile image folder before deleting the user (if they have one)
        $profile = $user->applicantProfile;
        if ($profile && $profile->photo_path) {
            Storage::disk('public')->deleteDirectory("profiles/{$user->id}");
        }

        Auth::logout();

        // This automatically deletes their ApplicantProfile too because of cascadeOnDelete in the migration
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
