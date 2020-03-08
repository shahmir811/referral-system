<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class CurrentUserRecord extends JsonResource
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
            'user' => new UserData($request->user()),
            'ancestor' => new AncestorData($this->getAncestor()),
            'current_referrals' => MyReferralsResource::collection($this->currentReferrals()),
            'pending_referrals' => MyReferralsResource::collection($this->pendingReferrals),
        ];
    }
}
