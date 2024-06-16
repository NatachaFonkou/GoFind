<?php

namespace Database\Factories;

use App\Models\Equipement;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class EquipementFactory extends Factory
{
    protected $model = Equipement::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'nom' => $this->faker->word(),
            'marque' => $this->faker->word(),
            'type' => $this->faker->word(),
            'etat_objet' => $this->faker->numberBetween([0,1]),
            'vole' => $this->faker->boolean(),
        ];
    }
}
