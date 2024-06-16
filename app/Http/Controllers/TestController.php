<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestRequest;
use App\Http\Resources\TestResource;
use App\Jobs\TestCreated;
use App\Models\Test;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class TestController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
//        $this->authorize('viewAny', Test::class);

        return TestResource::collection(Test::all());
    }

    public function store(TestRequest $request)
    {
//        $this->authorize('create', Test::class);
        $test = Test::create($request->validated());
//        TestCreated::dispatch($test->toArray());
        return new TestResource($test);
    }

    public function show(Test $test)
    {
        $this->authorize('view', $test);

        return new TestResource($test);
    }

    public function update(TestRequest $request, Test $test)
    {
        $this->authorize('update', $test);

        $test->update($request->validated());

        return new TestResource($test);
    }

    public function destroy(Test $test)
    {
        $this->authorize('delete', $test);

        $test->delete();

        return response()->json();
    }
}
