<?php

namespace App\Providers;

use App\Interfaces\AlertRepositoryInterface;
use App\Interfaces\PhotosRepositoryInterface;
use App\Repositories\AlertRepository;
use App\Repositories\PhotosRepository;
use Illuminate\Support\ServiceProvider;
//Ici nous faisons appel a nos Interfaces
use App\Interfaces\EquipementRepositoryInterface;

/**
    * Leur implémentation
*/
use App\Repositories\EquipementRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(EquipementRepositoryInterface::class,EquipementRepository::class);
        $this->app->bind(AlertRepositoryInterface::class,AlertRepository::class);
        $this->app->bind(PhotosRepositoryInterface::class,PhotosRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
