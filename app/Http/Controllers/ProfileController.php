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
        return Inertia::render('Profile/MasterProfile', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        // 1. Validate the incoming request
        // This acts as a secondary shield to our frontend validation
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'], // Max 2MB (2048 KB)
            // You can add validation for phone numbers, dates, etc., here if needed
        ]);

        // 2. Update Core User (Name/Email)
        $user->update([
            'name' => $request->input('name', $user->name),
        ]);

        // 3. Separate profile data
        // Exclude Inertia's _method and the file itself from the raw mass-assignment array
        $profileData = $request->except(['name', 'email', 'profile_image', '_method']);

        // 4. Handle File Uploads for the Profile
        if ($request->hasFile('profile_image')) {
            $currentProfile = $user->applicantProfile;

            // Delete the old image if it exists
            if ($currentProfile && $currentProfile->photo_path) {
                Storage::disk('public')->delete($currentProfile->photo_path);
            }

            // Store the new image and map it to your database's `photo_path` column
            $profileData['photo_path'] = $request->file('profile_image')->store("profiles/{$user->id}", 'public');
        }

        // 5. Update or Create the 1-to-1 Applicant Profile
        $user->applicantProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $profileData
        );

        return Redirect::route('profile.edit')->with('success', 'Profile updated successfully.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate(['password' => ['required', 'current_password']]);
        $user = $request->user();

        // Optional: Clean up the user's profile image folder before deleting the user
        $profile = $user->applicantProfile;
        if ($profile && $profile->profile_image_path) {
            Storage::disk('public')->deleteDirectory("profiles/{$user->id}");
        }

        Auth::logout();
        $user->delete(); // This automatically deletes their ApplicantProfile too because of cascadeOnDelete!
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
