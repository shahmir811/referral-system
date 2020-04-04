<?php

namespace App\Http\Controllers\Api\Guest;

use Mail;
use App\Models\User;
use App\Models\Contact;
use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\ContactUsRequest;
use Illuminate\Http\Request;
use App\Mail\Guest\ContactUs;

class ContactController extends Controller
{
    public function contactUS(ContactUsRequest $request)
    {

        $admin = User::where('role', '=', 'admin')->first();

        Mail::to($admin->email)
            ->send(new ContactUs(
                $request->name, 
                $request->email, 
                $request->contact_number, 
                $request->invitation_code, 
                $request->membership, 
                $request->message
            )
        );

        return response() -> json([
            'status' => 1,
            'message' => 'Contact us email sent',
        ], 200);   
    }

    public function getUser($token)
    {
        $user = User::where('token', '=', $token)->first();

        return response() -> json([
            'status' => 1,
            'message' => 'Contact us email sent',
            'data' => [
                'user' => $user
            ]
        ], 200);   

    }
}
