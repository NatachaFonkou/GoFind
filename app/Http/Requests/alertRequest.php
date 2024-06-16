<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class alertRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'localisation' => ['required'],
            'type' => ['required'],
            'proprietaire_id' => ['required', 'integer'],
            'objet_id' => ['required', 'integer'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
