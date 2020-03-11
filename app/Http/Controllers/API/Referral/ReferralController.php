<?php

namespace App\Http\Controllers\API\Referral;

use URL;
use Mail;
use App\Models\{User, Referral};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\Referrals\ReferralReceived;
// use App\Rules\{NotReferAgain, NotReferMySelf};
use App\Http\Resources\User\CurrentUserRecord;
use App\Http\Requests\Referrals\SendReferralRequest;

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
            'message' => 'Invitation sent'
        ], 200);
    }
}
