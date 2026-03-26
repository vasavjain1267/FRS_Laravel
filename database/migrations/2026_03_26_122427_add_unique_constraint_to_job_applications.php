<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Check if the index already exists to prevent "Duplicate Key Name" errors
        $indexExists = DB::select("SHOW INDEX FROM job_applications WHERE Key_name = 'job_apps_user_adv_unique'");

        if (empty($indexExists)) {
            Schema::table('job_applications', function (Blueprint $table) {
                $table->unique(['user_id', 'advertisement_id'], 'job_apps_user_adv_unique');
            });
        }
    }

    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            // Check before dropping to prevent errors during rollback
            $indexExists = DB::select("SHOW INDEX FROM job_applications WHERE Key_name = 'job_apps_user_adv_unique'");
            if (! empty($indexExists)) {
                $table->dropUnique('job_apps_user_adv_unique');
            }
        });
    }
};
