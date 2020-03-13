<?php

namespace App\Http\Controllers\API\Referral;

use URL;
use Mail;
use Hash;
use App\Models\{User, Referral};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\Referrals\ReferralReceived;
use App\Http\Resources\User\{CurrentUserRecord, UserResource};
use App\Http\Resources\User\MyReferralsResource;
use App\Http\Requests\Referrals\{SendReferralRequest, UpdatePasswordRequest};

class ReferralController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        return response([
            'status' => 1,
            'message' => 'Get user record',
            'data' => new CurrentUserRecord($request->user())
        ]);
    }

    public function sendReferral(SendReferralRequest $request)
    {           
        $referral = $request->user()->referrals()->create([
            'email' => $request->email,
            'token' => $request->user()->token
        ]);

        Mail::to($referral->email)->send(new ReferralReceived($request->user(), $referral));

        return response() -> json([
            'status' => 1,
            'message' => 'Invitation sent',
            'data' => [
                'referral' => new MyReferralsResource($referral),
            ]
        ], 200);
    }

    public function activateUserAccount($id)
    {
        $user = User::findOrFail($id);
        $user->role = 'active';
        $user->save();

        return response() -> json([
            'status' => 1,
            'message' => 'User account activated',
        ], 200);
    }

    public function changeUserStatusByAdmin($id)
    {
        $user = User::findOrFail($id);
        $user->role = $user->role == 'free' ? 'active' : 'free' ;
        $user->save();

        return response() -> json([
            'status' => 1,
            'message' => 'User status changed',
        ], 200);
    }

    public function updateProfile(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'contact_number' => "required|unique:users,contact_number, $id",
            'address' => 'required',
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->contact_number = $request->contact_number;
        $user->address = $request->address;
        $user->save();

        return response() -> json([
            'status' => 1,
            'message' => 'User profile updated',
        ], 200);

    }

    public function updatePassword(UpdatePasswordRequest $request, $id)
    {
        User::find($request->user()->id)->update(['password'=> Hash::make($request->new_password)]);

        return response() -> json([
            'status' => 1,
            'message' => 'User password updated',
        ], 200);
    }

    public function allSystemUsers()
    {
        $users = User::orderBy('name', 'asc')->get();
        return response() -> json([
            'status' => 1,
            'message' => 'User profile updated',
            'data' => UserResource::collection($users)
        ], 200);


    }
}
