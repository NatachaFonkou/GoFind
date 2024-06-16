<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\alert */
class alertResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'localisation' => $this->localisation,
            'type' => $this->type,
            'proprietaire_id' => $this->proprietaire_id,
//            'objet_id' => $this->objet_id,
            'equipement'=>$this->equipement

        ];
    }
}
