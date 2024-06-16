<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotoRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'lien' => ['required|image'],
            'equipements_id' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
