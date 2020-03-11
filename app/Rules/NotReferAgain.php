<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class NotReferAgain implements Rule
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function passes($attribute, $value)
    {
        if($this->user->referrals->contains('email', $value)) {

            return false;
        }

        return true;
    }

    public function message()
    {
        return 'You have already sent an inviation to that person';
    }
}
