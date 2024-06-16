<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmailInALert;
use App\Models\User;
use Illuminate\Http\Request;

class SendEmailController extends Controller
{

    public $data;

    /**
     * @param $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    public function index(){

        $users = User::all();
        foreach ($users as $user){
            SendEmailInALert::dispatch($user,$this->data);
        }

        echo "Message en cours d'envoies";
    }
}
