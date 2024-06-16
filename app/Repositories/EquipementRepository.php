<?php

namespace App\Repositories;

use App\Interfaces\EquipementRepositoryInterface;
use App\Models\Equipement;

class EquipementRepository implements EquipementRepositoryInterface

{
    /**
     * Create a new class instance.
     */
    public function index()
    {
        return Equipement::all();
    }
    public function show($id)
    {
        return Equipement::find($id);
    }
    public function store(array $data)
    {
        return Equipement::create( $data);
    }
    public function update(array $data,$id)
    {
        try {
            $equipement = Equipement::find($id);
            $equipement->update($data);
            return $equipement;
        }catch (\Error $error){
            return null;
        }
    }
    public function destroy($id)
    {
        try {
            $equipement = Equipement::find($id);
            dd($equipement);
            $equipement->delete($id);
            return true;
        }catch (\Error $error){
            return false;
        }
    }
}
