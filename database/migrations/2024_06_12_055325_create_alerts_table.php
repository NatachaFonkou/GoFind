<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('alerts', function (Blueprint $table) {
            $table->id();
            $table->string('localisation');
            $table->string('type');
            $table->unsignedBigInteger('proprietaire_id');
            $table->unsignedBigInteger('objet_id');
            $table->softDeletes();
            $table->timestamps();
//            $table->foreign('proprietaire_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('objet_id')->references('id')->on('equipements')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};
