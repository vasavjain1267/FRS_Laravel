<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
    use HasFactory;

    protected $fillable = [
        'reference_number',
        'title',
        'document_path',
        'deadline',
        'departments',
        'is_active',
    ];

    // This automatically converts the JSON from the database into a PHP Array
    protected $casts = [
        'departments' => 'array',
        'deadline' => 'date',
        'is_active' => 'boolean',
    ];
}
