<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::prefix('objets-perdus')->group(function(){
    Route::apiResource('objets',\App\Http\Controllers\EquipementController::class);
    Route::apiResource('pictures',\App\Http\Controllers\PhotoController::class);
    Route::apiResource('alert',\App\Http\Controllers\alertController::class);
});
