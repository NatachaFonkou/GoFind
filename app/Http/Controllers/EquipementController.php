<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\DTO\EquipementDTO;
use App\Http\Requests\EquipementRequest;
use App\Http\Resources\EquipementResource;
use App\Models\Equipement;
use App\Services\EquipementService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class EquipementController extends Controller
{
    use AuthorizesRequests;
    protected  $equipementService;

    /**
     * @param EquipementService $equipementService
     */
    public function __construct(EquipementService $equipementService)
    {
        $this->equipementService = $equipementService;
    }

    public function index()
    {
//        $this->authorize('viewAny', Equipement::class);
        $data = $this->equipementService->index();
        return ApiResponseClass::sendResponse(EquipementResource::collection($data),'',200);
    }

    public function store(EquipementRequest $request)
    {
        $request->validated();
        $equipementDTO = new EquipementDTO(
            $request->nom,
            $request->marque,
            $request->type,
            $request->vole,
            $request->etat_objet,
        );
        try {
            DB::beginTransaction();
            $equipement = $this->equipementService->store($equipementDTO);
            DB::commit();
            return ApiResponseClass::sendResponse(new EquipementResource($equipement),"'Object Create Successful'",201);
        }catch (\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    public function show($equipement)
    {
//        $this->authorize('view', $equipement);
        $equipement = $this->equipementService->show($equipement);

        return ApiResponseClass::sendResponse(new EquipementResource($equipement),'',200);
    }

    public function update(EquipementRequest $request, Equipement $equipement, $id)
    {
//        $this->authorize('update', $equipement);


        $request->validated();

        $equipementDTO = new EquipementDTO(
            $request->nom,
            $request->marque,
            $request->type,
            $request->vole,
            $request->etat_objet,
        );
        DB::beginTransaction();
        try {
            $equipement = $this->equipementService->update($equipementDTO, $id);
            DB::commit();
            return ApiResponseClass::sendResponse(new EquipementResource($equipement),"Product update Successful",201);
        }catch (\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }

    public function destroy($id)
    {
//        $this->authorize('delete', $equipement);

        $this->equipementService->destroy($id);

        return ApiResponseClass::sendResponse($id,"Product Delete Successful",204);
    }
}
