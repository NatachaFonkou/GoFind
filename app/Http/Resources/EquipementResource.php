<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Equipement */
class EquipementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'id' => $this->id,
            'nom' => $this->nom,
            'marque' => $this->marque,
            'type' => $this->type,
            'vole' => $this->vole,
            'etat_objet' => $this->etat_objet,
        ];
    }
}
