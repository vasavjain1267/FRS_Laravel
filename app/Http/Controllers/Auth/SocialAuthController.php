<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    // 1. Redirect to Google, but remember which role they selected!
    public function redirect(Request $request)
    {
        // Save the intended role to the session (defaults to applicant)
        $request->session()->put('intended_role', $request->query('role', 'applicant'));

        return Socialite::driver('google')->redirect();
    }

    // 2. Handle the callback from Google
    public function callback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $email = $googleUser->getEmail();

            // Pull the role out of the session
            $intendedRole = $request->session()->pull('intended_role', 'applicant');

            if ($intendedRole === 'admin' && ! str_ends_with($email, '@iiti.ac.in')) {
                return redirect()->route('login')->with('error', 'Unauthorized access. Institute login strictly requires an @iiti.ac.in email address.');
            }

            // Find the user, or create a new one
            $user = User::updateOrCreate([
                'email' => $email,
            ], [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                // If it's a new user, give them the role they requested. Otherwise keep their existing role.
                'role' => User::where('email', $email)->exists()
                            ? User::where('email', $email)->first()->role
                            : $intendedRole,
            ]);

            // Security check: Prevent an existing "applicant" from logging into the "admin" portal
            if ($user->role !== $intendedRole) {
                return redirect()->route('login')->with('error', 'Unauthorized. You cannot log in to the '.ucfirst($intendedRole).' portal with these credentials.');
            }

            // Log the user in securely
            Auth::login($user);

            // Redirect them to their proper dashboard
            if ($user->role === 'admin') {
                return redirect()->route('jobs.create')->with('success', 'Welcome back to the Institute Portal!');
            }

            return redirect()->route('dashboard')->with('success', 'Logged in successfully!');

        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google login failed or was cancelled. Please try again.');
        }
    }
}
