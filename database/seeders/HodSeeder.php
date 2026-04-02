<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class HodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Using updateOrCreate ensures we don't duplicate the user if we run the seeder twice
        User::updateOrCreate(
            ['email' => 'hodcse@iiti.ac.in'], // Identify by email
            [
                'name' => 'Head of CSE',
                'password' => Hash::make('password123'), // Default testing password
                'role' => 'hod',
                'department' => 'Computer Science and Engineering',
                'email_verified_at' => now(), // Auto-verify the email for instant login
            ]
        );

        $this->command->info('CSE HOD created successfully. Login: hodcse@iiti.ac.in | Pass: password123');
    }
}