<?php

namespace App\Http\Controllers\API\Auth;

use Mail;
use App\Models\User;
use App\Mail\Auth\ForgotPassword;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    public function userForgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', '=', $request->email)->first();

        if(!$user) {
            return response() -> json([
                'status' => 0,
                'message' => 'No user found',
            ], 200);   
        } 

        Mail::to($user->email)->send(new ForgotPassword($user));

        return response() -> json([
            'status' => 1,
            'message' => 'Email link sent',
        ], 200);   

    }
}
