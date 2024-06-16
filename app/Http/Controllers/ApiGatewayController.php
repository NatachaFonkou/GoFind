<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ApiGatewayController extends Controller
{
    protected  $client;

    /**
     * @param $client
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    public function forwardRequest(Request $request)
    {
        $targetService = $this->determineTargetService($request);

        return $this->forwardToService($request, $targetService);
    }

    protected function determineTargetService(Request $request)
    {
        if ($request->is('colocation/*')) {
            return config('services.colocation.base_url');
        } elseif ($request->is('covoiturage/*')) {
            return config('services.covoiturage.base_url');
        } elseif ($request->is('api/objets-perdus/*')) {
            return config('services.object.base_url');
        }
        return config('services.default.base_url');
    }
    protected function forwardToService(Request $request, $targetService)
    {
        $url = $targetService . $request->getRequestUri();
//        echo $url;
        $options = [
            'headers' => $request->headers->all(),
            'body' => $request->getContent(),
        ];

        try {
            $response = $this->client->request($request->method(), $url, $options);

            return response($response->getBody(), $response->getStatusCode())
                ->withHeaders($response->getHeaders());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ce service est inexistant'], 503);
        }
    }
}
