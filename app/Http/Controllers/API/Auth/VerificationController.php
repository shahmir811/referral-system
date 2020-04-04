<?php

namespace App\Http\Controllers\ApI\Auth;

use App\Models\User;
use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VerificationController extends Controller
{

    /////////////////////////////////////////////////////////////////////////
    public function verifyUser($verification_code)
    {

        $check = User::where('email_verification_token', '=', $verification_code)->first();

        if(!is_null($check)){
            $user = User::findOrFail($check->id);
            
            if($user->is_verified == 1){
                return redirect('/home');
            }

            $user->is_verified = 1;
            $user->email_verification_token = null;
            $user->email_verified_at = Carbon::now();
            $user->save();

            return redirect('/home');
        }

        return redirect('/home');
    }    
    
    
}
