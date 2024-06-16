<?php

use App\Http\Controllers\ApiGatewayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


//Route::prefix('api/')->group(function () {
Route::any('{any}', [ApiGatewayController::class, 'forwardRequest'])->where('any', '.*');
//});
////Route::prefix('api')->group(function () {
//    Route::any('{any}', [ApiGatewayController::class, 'forwardRequest'])->where('any', '.*');
//});

//require __DIR__.'/auth.php';

