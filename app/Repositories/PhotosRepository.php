<?php

namespace App\Repositories;

use App\Interfaces\PhotosRepositoryInterface;
use App\Models\Photo;

class PhotosRepository  implements PhotosRepositoryInterface


{
    /**
     * Create a new class instance.
     */
    public function index()
    {
        return Photo::all();
    }
    public function show($id)
    {
        return Photo::find($id);
    }
    public function store(array $data)
    {
        return Photo::create($data);
    }
    public function update(array $data,$id)
    {
        try {
            $photo = Photo::find($id);
            $photo->update($data);
            return $photo;
        }catch (\Error $error){
            return null;
        }
    }
    public function destroy($id)
    {
        try {
            $photo = Photo::find($id);
            dd($photo);
            $photo->delete($id);
            return true;
        }catch (\Error $error){
            return false;
        }
    }
}
