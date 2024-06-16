<?php

namespace App\Services;

use App\DTO\EquipementDTO;
use App\Interfaces\EquipementRepositoryInterface;
use App\Models\Equipement;

class EquipementService
{
    /**
     * Create a new class instance.
     */
    public function __construct(EquipementRepositoryInterface $equipementRepository)
    {
        $this->equipementRepository = $equipementRepository ;
    }
    public function index()
    {
        return $this->equipementRepository->index();
    }
    public function show($id)
    {
        return $this->equipementRepository->show($id);
    }
    public function store(EquipementDTO $equipementDTO)
    {
        return  $this->equipementRepository->store([
            'nom'=>$equipementDTO->nom,
            'marque'=>$equipementDTO->marque,
            'type'=>$equipementDTO->type,
            'vole'=>$equipementDTO->vole,
            'etat_objet'=>$equipementDTO->etat_objet,
        ]);
    }
    public function update(EquipementDTO $equipementDTO,$id)
    {
        return  $this->equipementRepository->store([
            'nom'=>$equipementDTO->nom,
            'marque'=>$equipementDTO->marque,
            'type'=>$equipementDTO->type,
            'vole'=>$equipementDTO->vole,
            'etat_objet'=>$equipementDTO->etat_objet,
        ],$id);
    }
    public function destroy($id)
    {
        return $this->equipementRepository->destroy($id);
    }
}
