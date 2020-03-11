<?php

namespace App\Rules;

use App\Models\User;
use Illuminate\Contracts\Validation\Rule;

class NotReferMySelf implements Rule
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function passes($attribute, $value)
    {
        if($this->user->email === $value) {
            return false;
        }

        return true;
    }

    public function message()
    {
        return 'You can\'t send an invitation to yourself';
    }
}
