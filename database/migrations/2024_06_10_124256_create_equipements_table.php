<?php

use App\Enum\EquipementType;
use App\Enum\ObjetState;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('equipements', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('marque');
            $table->string('type');
//            $table->enum('etat_objet', array_map(fn($case) => $case->value, EquipementType::cases()))->default(EquipementType::others->value);
//            $table->enum('vole', array_map(fn($case) => $case->value, ObjetState::cases()))->default(ObjetState::vole->value);
            $table->string('vole');
            $table->string('etat_objet');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipements');
    }
};
