<?php

namespace App\Jobs;

use App\Http\Controllers\SendEmailController;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public  $data;
    public function __construct($data)
    {
        $this->data =  $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $send = new SendEmailController($this->data);
        $send->index();
    }
}
