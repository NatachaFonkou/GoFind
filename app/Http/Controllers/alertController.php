<?php

namespace App\Http\Controllers;

use App\Classes\ApiResponseClass;
use App\DTO\AlertDTO;
use App\Http\Requests\alertRequest;
use App\Http\Resources\alertResource;
use App\Jobs\SendEmailJob;
use App\Jobs\Test;
use App\Jobs\TestCreated;
use App\Models\alert;
use App\Services\AlertService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\DB;

class alertController extends Controller
{
    use AuthorizesRequests;
    protected   $alertService;

    /**
     * @param AlertService $alertService
     */
    public function __construct(AlertService $alertService)
    {
        $this->alertService = $alertService;
    }

    public function index()
    {
//        $this->authorize('viewAny', alert::class);
        $data = $this->alertService->index();
        return ApiResponseClass::sendResponse(alertResource::collection($data),'',200);
    }

    public function store(alertRequest $request)
    {
        $request->validated();
        $alertDTO = new AlertDTO(
            $request->localisation,
            $request->type,
            $request->proprietaire_id,
            $request->objet_id
        );
        try {
            DB::beginTransaction();
            $alert = $this->alertService->store($alertDTO);
            DB::commit();
//

            SendEmailJob::dispatch($alert->toArray());

            return ApiResponseClass::sendResponse(new alertResource($alert),"alert Create Successful",201);
        }catch (\Exception $ex){
//            return ApiResponseClass::rollback($ex);
            return response($ex);
        }
    }

    public function show($alert)
    {
//        $this->authorize('view', $alert);
        $alert = $this->alertService->show($alert);

        return ApiResponseClass::sendResponse(new alertResource($alert),'',200);
    }

    public function update(alertRequest $request, alert $alert, $id)
    {
//        $this->authorize('update', $alert);


        $request->validated();

        $alertDTO = new AlertDTO(
            $request->localisation,
            $request->type,
            $request->proprietaire_id,
            $request->objet_id
        );
        DB::beginTransaction();
        try {
            $alert = $this->alertService->update($alertDTO, $id);
            DB::commit();
            return ApiResponseClass::sendResponse(new alertResource($alert),"alert update Successful",201);
        }catch (\Exception $ex){
            return ApiResponseClass::rollback($ex);
        }
    }
}
