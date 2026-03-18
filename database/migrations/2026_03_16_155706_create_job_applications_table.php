<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('job_applications', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('job_opening_id')->constrained()->onDelete('cascade');
        $table->string('status')->default('pending'); // pending, shortlisted, rejected
        $table->timestamps();
        
        // Prevent duplicate applications for the same job
        $table->unique(['user_id', 'job_opening_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
