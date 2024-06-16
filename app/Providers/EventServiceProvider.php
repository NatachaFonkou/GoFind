<?php

namespace App\Providers;

use App\Events\AlertCreation;
use App\Jobs\Test;
use App\Listeners\SendEmailOnAlertCreated;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    protected $listen = [
        AlertCreation::class=>[
            SendEmailOnAlertCreated::class,
        ]
    ];
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
