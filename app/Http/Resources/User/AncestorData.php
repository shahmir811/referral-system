<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class AncestorData extends JsonResource
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
            'contact_number' => $this->contact_number,
            'address' => $this->address,
            'bank' => $this->bank,
            'account_name' => $this->account_name,
            'account_number' => $this->account_number,
        ];
    }
}
