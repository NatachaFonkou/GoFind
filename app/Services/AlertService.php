<?php

namespace App\Services;

use App\DTO\AlertDTO;
use App\Interfaces\AlertRepositoryInterface;
use App\Jobs\TestCreated;

class AlertService
{
    /**
     * Create a new class instance.
     */
    public function __construct(AlertRepositoryInterface $alertRepository)
    {
        $this->alertRepository = $alertRepository ;
    }
    public function index()
    {
        return $this->alertRepository->index();
    }
    public function show($id)
    {
        return $this->alertRepository->show($id);
    }
    public function store(AlertDTO $alertDTO)
    {
        $alert = $this->alertRepository->store([
            'localisation' => $alertDTO->localisation,
            'type' => $alertDTO->type,
            'proprietaire_id' => $alertDTO->proprietaire_id,
            'objet_id' => $alertDTO->objet_id,

        ]);
        return  $alert;
    }
    public function update(alertDTO $alertDTO,$id)
    {
        return  $this->alertRepository->store([
            'localisation' => $alertDTO->localisation,
            'type' => $alertDTO->type,
            'proprietaire_id' => $alertDTO->proprietaire_id,
            'objet_id' => $alertDTO->objet_id,

        ],$id);
    }
    public function destroy($id)
    {
        return $this->alertRepository->destroy($id);
    }
}
