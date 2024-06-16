<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string('lien');
            $table->unsignedBigInteger('equipements_id');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('equipements_id')->references('id')->on('equipements')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('photos');
    }
};
