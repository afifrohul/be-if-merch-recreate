<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Traits\ApiResponseTrait;

class ProfileController extends Controller
{

    use ApiResponseTrait;
    public function index()
    {
        $user = User::with('profile')->where('id', Auth::user()->id)->get();
        return $this->successResponse($user, 'User fetched successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'gender' => 'required',
            'address' => 'required',
            'phone_number' => 'required',
        ]);

        $user = Auth::user();

        try {
            
            \DB::table('profiles')->updateOrInsert(
                ['user_id' => $user->id],
                [
                    'gender' => $request->gender,
                    'address' => $request->address,
                    'phone_number' => $request->phone_number,
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );

            $user = User::with('profile')->find($user->id);
    
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create profile',
                'error' => $th->getMessage(),
            ], 500);
        }
    }
}
