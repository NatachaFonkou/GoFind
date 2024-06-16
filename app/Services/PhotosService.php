<?php

namespace App\Services;

use App\DTO\PhotoDTO;
use App\Interfaces\PhotosRepositoryInterface;
use \App\Models\Photo;
class PhotosService
{
    /**
     * Create a new class instance.
     */
    public function __construct(PhotosRepositoryInterface $photosRepository)
    {
        $this->photosRepository = $photosRepository ;
    }

    public function index()
    {
        return $this->photosRepository->index();
    }
    public function show($id)
    {
        return $this->photosRepository->show($id);
    }
    public function store(EquipementDTO $photoDTO)
    {
        return  $this->photosRepository->store([
            'lien'=>$photoDTO->lien,
            'equipements_id'=>$photoDTO->equipements_id,

        ]);
    }
    public function update(EquipementDTO $photoDTO,$id)
    {
        return  $this->equipementRepository->store([
            'lien'=>$photoDTO->lien,
            'equipements_id'=>$photoDTO->equipements_id,

        ],$id);
    }
    public function destroy($id)
    {
        return $this->equipementRepository->destroy($id);
    }

}
