<?php

namespace App\Http\Controllers\API\Auth;

use Auth;
use App\Models\{User, Referral};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\{RegisterFormRequest, LoginFormRequest};

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(LoginFormRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function me()
    {
        return response()->json([
            'data' => [
                'user' => $this->guard()->user()
                ]
            ]
        );
    }

    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::guard();
    }


    /////////////////////////////////////////////////////////////////////////
    public function register(RegisterFormRequest $request)
    {
        $newUser = new User;
        $newUser->name = $request->name;
        $newUser->email = $request->email;
        $newUser->password = bcrypt($request->password);

        // if no token, then admin will be his ancestor
        if(!$request->token) {
            $newUser->referred_by = 1; // admin user id
        
        } else {
        // else the person who refers him will be his ancestor
            $findAncertorUser = User::where('token', '=', $request->token)->first();
            $newUser->referred_by = $findAncertorUser->id; 
        }

        $newUser->save();

        // remove all similar emails from referrals table
        $this->removeEmailFromReferralTable($request->email);

        return response() -> json([
            'status' => 1,
            'message' => 'User registered successfully'
        ]);
    }

    private function removeEmailFromReferralTable($email)
    {
        $records = Referral::where('email', '=', $email)->get();
        if($records) {
            foreach($records as $record) {
                $record->delete();
            }
        }
        return ;
    }

}
