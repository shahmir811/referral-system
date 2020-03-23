<?php

namespace App\Http\Requests\Guest;

use App\Http\Requests\FormRequest;

class ContactUsRequest extends FormRequest
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
            'email' => 'required|email',
            'contact_number' => 'required',
            'message' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'contact_number.required' => 'Phone number is required',
            'message.required' => 'Write some brief message',
        ];
    }
}
