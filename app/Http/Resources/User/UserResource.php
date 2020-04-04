<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'is_verified' => $this->is_verified,
            'contact_number' => $this->contact_number,
            'address' => $this->address,
            // 'token' => $this->token,
            'token' => $this->role == 'free' ? '' : $this->token,
            'bank' => $this->bank,
            'state' => $this->state,
            'account_number' => $this->account_number,
            'account_name' => $this->account_name,
            'image' => $this->image,
            'role' => $this->role,
            'created_at' => date("dS M Y", strtotime($this->created_at)),
            'referral_name' => $this->ancestorName()
        ];
    }
}
