<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\DTO\PhotoDTO;
use App\Http\Requests\PhotoRequest;
use App\Http\Resources\PhotoResource;
use App\Models\Photo;
use App\Services\PhotosService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class PhotoController extends Controller
{
    use AuthorizesRequests;
    protected  $photoService;

    /**
     * @param PhotosService $photoService
     */
    public function __construct(PhotosService $photoService)
    {
        $this->photoService = $photoService;
    }

    public function index()
    {
        $this->authorize('viewAny', Photo::class);
        $data = $this->photoService->index();
        return ApiResponseClass::sendResponse(PhotoResource::collection($data),'',200);
    }


    public function store(PhotoRequest $request)
    {
        $images = $request->file('lien');
        try {
            DB::beginTransaction();

            foreach($images as $image) {

                $photoPDO = new PhotoDTO($request->lien, $request->equipements_id);

                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();

//                $image->move(public_path('storage/uploads/objets/images'), $imageName);

                $imagePath = $image->getRealPath();

                // Déplacement temporairement l'image
//                $tempPath = $image->storeAs('uploads/temp', $imageName, 'public');

//                $this->photoService->store($photoPDO);

            }

        }catch (\Exception $ex)
        {
            return ApiResponseClass::rollback($ex);
        }

    }

    public function show(Photo $photo)
    {
        $this->authorize('view', $photo);

        return new PhotoResource($photo);
    }

    public function update(PhotoRequest $request, Photo $photo)
    {
        $this->authorize('update', $photo);

        $photo->update($request->validated());

        return new PhotoResource($photo);
    }

    public function destroy(Photo $photo)
    {
        $this->authorize('delete', $photo);

        $photo->delete();

        return response()->json();
    }
}
