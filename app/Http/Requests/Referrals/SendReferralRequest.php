<?php

namespace App\Http\Requests\Referrals;

use App\Rules\{NotReferAgain, NotReferMySelf};
// use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\FormRequest;

class SendReferralRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => [
                'required',
                'email',
                new NotReferMySelf($this->user()),
                'unique:users,email',
                new NotReferAgain($this->user()),
            ]
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'This user is already a part of this application'
        ];
    }
}
