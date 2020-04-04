<?php

namespace App\Http\Controllers\API\Referral;

use URL;
use Mail;
use Hash;
use File;
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
            'email' => "required|unique:users,email, $id",
            'contact_number' => "required|unique:users,contact_number, $id",
            // 'address' => 'required',
            // 'state' => 'required',
            // 'account_number' => 'sometimes|required',
            // 'bank' => 'sometimes|required',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg'
        ], [
            'image.image' => 'Image must be of type .png, .jpeg or .jpg'
        ]);

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->contact_number = $request->contact_number;
        $user->address = $request->address;
        $user->state = $request->state;
        $user->account_number = $request->account_number;
        $user->account_name = $request->account_name;
        $user->bank = $request->bank;

        if($request->hasFile('image')) {

            // delete old image
            if($user->image) {
                File::delete($user->image);
            }
            
            // add new image
            $filename = time() . '_' .$request->image->getClientOriginalName();
            $name = str_replace(' ', '_', $filename);

            $request->image->storeAs('public/uploads', $name);
            $path = 'storage/uploads/' . $name;

            $user->image = $path;
        }

        $user->save();

        return response() -> json([
            'status' => 1,
            'message' => 'User profile updated',
            'data' => [
                'user' => $user
            ]
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
            'message' => 'List of all system Users',
            'data' => UserResource::collection($users)
        ], 200);


    }

    public function changePasswordByAdmin(Request $request, $id)
    {
       $request->validate([
            'new_password' => 'required|min:6',
        ]);

        // $user = User::where('token', '=', $token)->first();
        $user = User::findOrFail($id);
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response() -> json([
            'status' => 1,
            'message' => 'User password changed by admin',
        ], 200);   

    }
}
