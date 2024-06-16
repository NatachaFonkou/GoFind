<?php

namespace App\Providers;

use App\Jobs\SendEmailJob;
use App\Jobs\Test;
use App\Jobs\SendAlertEmail;
use App\Jobs\TestCreated;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // \App::bindMethod(Test::class, '@handle', fn($job)=>$job->handle());
        \App::bindMethod(SendEmailJob::class, '@handle', fn($job)=>$job->handle());
//        \App::bindMethod(SendEmailJob::class, '@handle', fn($job)=>$job->handle());

    }
}
