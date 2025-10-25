<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponseTrait
{
    protected function successResponse($data = null, $message = 'Success', $meta = null, $status = 200): JsonResponse
    {
        return response()->json([
          'success' => true,
          'message' => $message,
          'data'    => $data,
        ], $status);
    }

    protected function errorResponse($message = 'Error', $errors = null, $status = 400): JsonResponse
    {
        return response()->json([
          'success' => false,
          'message' => $message,
          'errors'  => $errors,
        ], $status);
    }
}
