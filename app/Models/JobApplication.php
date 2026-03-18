<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    // Add this property to allow these fields to be filled via create()
    protected $fillable = [
        'user_id',
        'job_opening_id',
        'status',
    ];

    /**
     * Relationship: An application belongs to a user (applicant).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: An application belongs to a specific job opening.
     */
    public function jobOpening(): BelongsTo
    {
        return $this->belongsTo(JobOpening::class);
    }
}