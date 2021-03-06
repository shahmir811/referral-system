<?php

namespace App\Http\Requests\Auth;

// use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\FormRequest;

class RegisterFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'token' => 'sometimes|required|exists:users,token'
        ];
    }

    public function messages()
    {
        return [
            'token.exists' => 'It seems that entered referral ID is incorrect',
        ];
    }
}
