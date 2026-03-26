<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Core Identity
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'nullable', // Set to nullable if disabled in frontend, or required if they can change it
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            // Profile Picture (Updated from 'photo')
            'profile_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],

            // Master Profile Personal Details
            'father_name' => ['nullable', 'string', 'max:255'],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'gender' => ['nullable', 'string', Rule::in(['Male', 'Female', 'Other'])],
            'marital_status' => ['nullable', 'string', Rule::in(['Married', 'Unmarried'])],
            'category' => ['nullable', 'string', Rule::in(['General', 'OBC', 'SC', 'ST', 'EWS'])],
            'nationality' => ['nullable', 'string', 'max:100'],
            'id_proof' => ['nullable', 'string', 'max:255'],

            // Contact Information
            'phone' => ['nullable', 'string', 'max:25'],
            'alt_phone' => ['nullable', 'string', 'max:25'],
            'alt_email' => ['nullable', 'email', 'max:255'],

            // Correspondence Address
            'corr_address' => ['nullable', 'string', 'max:500'],
            'corr_city' => ['nullable', 'string', 'max:100'],
            'corr_state' => ['nullable', 'string', 'max:100'],
            'corr_pincode' => ['nullable', 'string', 'max:20'],
            'corr_country' => ['nullable', 'string', 'max:100'],

            // Permanent Address
            'perm_address' => ['nullable', 'string', 'max:500'],
            'perm_city' => ['nullable', 'string', 'max:100'],
            'perm_state' => ['nullable', 'string', 'max:100'],
            'perm_pincode' => ['nullable', 'string', 'max:20'],
            'perm_country' => ['nullable', 'string', 'max:100'],

            // Professional Links
            'google_scholar_url' => ['nullable', 'url', 'max:255'],
            'orcid_url' => ['nullable', 'url', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'personal_website_url' => ['nullable', 'url', 'max:255'],

            // Legacy / Additional Academic & Professional Details
            // (Kept intact from your original file)
            'designation' => ['nullable', 'string', 'max:150'],
            'affiliation' => ['nullable', 'string', 'max:200'],
            'location' => ['nullable', 'string', 'max:150'],
            'highest_qualification' => ['nullable', 'string', 'max:150'],
            'education_institution' => ['nullable', 'string', 'max:200'],
            'education_year' => ['nullable', 'string', 'max:20'],
            'education_details' => ['nullable', 'string'],
            'thesis_details' => ['nullable', 'string'],
            'supervisors' => ['nullable', 'string'],
            'research_areas' => ['nullable', 'string'],
            'research_statement' => ['nullable', 'string'],
            'publications' => ['nullable', 'string'],
            'achievements' => ['nullable', 'string'],
            'teaching_experience' => ['nullable', 'string'],
            'teaching_philosophy' => ['nullable', 'string'],
            'projects_research_work' => ['nullable', 'string'],
            'professional_experience' => ['nullable', 'string'],
            'skills' => ['nullable', 'string'],
            'curriculum_contributions' => ['nullable', 'string'],
            'certifications' => ['nullable', 'string'],
            'academic_service' => ['nullable', 'string'],
            'statement' => ['nullable', 'string'],

            // Documents
            'cv' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'research_statement_document' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'teaching_statement_document' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
        ];
    }
}
