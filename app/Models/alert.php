<?php

namespace App\Models;

use App\Events\AlertCreation;
use App\Jobs\Test;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class alert extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable = [
        'localisation',
        'type',
        'proprietaire_id',
        'objet_id',
    ];

//    protected static function booted()
//    {
//        static::created(function ($alert) {
//            event(new AlertCreation($alert));
////            Test::dispatch($alert);
//        });
//    }

    public  function equipement(): BelongsTo
    {
        return  $this->belongsTo(Equipement::class,"objet_id");
    }
}
