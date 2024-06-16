<?php

namespace App\Repositories;

use App\Interfaces\AlertRepositoryInterface;
use App\Models\alert;

class AlertRepository implements  AlertRepositoryInterface
{
    /**
     * Create a new class instance.
     */
    public function index()
    {
        return alert::all();
    }
    public function show($id)
    {
        return alert::find($id);
    }
    public function store(array $data)
    {
        return alert::create( $data);
    }
    public function update(array $data,$id)
    {
        try {
            $alert = alert::find($id);
            $alert->update($data);
            return $alert;
        }catch (\Error $error){
            return null;
        }
    }
    public function destroy($id)
    {
        try {
            $alert = alert::find($id);
            $alert->delete($id);
            return true;
        }catch (\Error $error){
            return false;
        }
    }
}
