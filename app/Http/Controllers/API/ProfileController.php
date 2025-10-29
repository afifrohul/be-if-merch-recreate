<?php

namespace App\Http\Controllers\API;

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
            
            $profile = new Profile();
            $profile->user_id = $user->id;
            $profile->gender = $request->gender;
            $profile->address = $request->address;
            $profile->phone_number = $request->phone_number;
            $profile->save();
    
            return response()->json([
                'message' => 'Profile created successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create profile',
                'error' => $th->getMessage(),
            ], 500);
        }


    }
}
