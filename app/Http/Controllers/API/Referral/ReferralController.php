<?php

namespace App\Http\Controllers\API\Referral;

use App\Models\{User, Referral};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\User\CurrentUserRecord;

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
}
