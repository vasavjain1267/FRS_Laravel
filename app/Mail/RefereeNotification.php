<?php

namespace App\Mail;

use App\Models\JobApplication;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RefereeNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $application;

    public $applicantName;

    public $referee;

    /**
     * Create a new message instance.
     */
    public function __construct(JobApplication $application, string $applicantName, array $referee)
    {
        $this->application = $application;
        $this->applicantName = $applicantName;
        $this->referee = $referee;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject("Reference Notification: Application of {$this->applicantName} at IIT Indore")
            ->view('emails.referee_notification');
    }
}
