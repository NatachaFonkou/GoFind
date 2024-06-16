<?php

namespace App\Jobs;

use App\Mail\AlertMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailInALert implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public $user;
    public $alert;

    /**
     * @param $user
     * @param $alert
     */
    public function __construct($user, $alert)
    {
        $this->user = $user;
        $this->alert = $alert;
    }


    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->user->email, $this->user->name)->send(new AlertMail($this->user->name, $this->alert));
    }
}

