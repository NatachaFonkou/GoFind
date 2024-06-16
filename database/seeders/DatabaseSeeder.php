<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'wwwmbassiloic@gmail.com',
        ]);
                User::factory()->create([
            'name' => 'Test User',
            'email' => 'loicmbassi5@gmail.com',
        ]);
                User::factory()->create([
            'name' => 'Test User',
            'email' => 'mbassiewolo.loic@polytechnique.cm',
        ]);


    }
}
