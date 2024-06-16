<?php

namespace Database\Factories;

use App\Models\alert;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class alertFactory extends Factory
{
    protected $model = alert::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'localisation' => $this->faker->word(),
            'type' => $this->faker->word(),
            'proprietaire_id' => $this->faker->randomNumber(),
            'objet_id' => $this->faker->randomNumber(),
        ];
    }
}
