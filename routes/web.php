<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/mail',function(){
    return view('alertMail');
});

require __DIR__.'/auth.php';
