<?php

namespace App\Http\Requests;

use App\Enum\EquipementType;
use App\Enum\ObjetState;
use Illuminate\Foundation\Http\FormRequest;

class EquipementRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'nom' => ['required'],
            'marque' => ['required'],
            'type' => ['required'],
            'etat_objet' => 'required|in:' . implode(',', array_map(fn($case) => $case->value, EquipementType::cases())),
            'vole' => 'required|in:' . implode(',', array_map(fn($case) => $case->value, ObjetState::cases())),

        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
