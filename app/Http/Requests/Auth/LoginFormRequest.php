<?php

namespace App\Http\Requests\Auth;

// use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\FormRequest;

class LoginFormRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email',
            'password' => 'required'
        ];
    }
}
