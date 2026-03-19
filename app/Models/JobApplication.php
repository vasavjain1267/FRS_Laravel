<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'advertisement_id',
        'department',
        'grade',
        'form_data', 
        'sop',
        'research_interest',
        'status',
    ];

    // This tells Laravel to automatically convert the JSON string
    // from the database into a usable Array/Object in our code.
    protected $casts = [
        'form_data' => 'array',
    ];
}
