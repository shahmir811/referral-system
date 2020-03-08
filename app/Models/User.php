<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public function referrals() {
        return $this->hasMany(Referral::class);
    }

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function (User $user) {
            $user->token = time() . mt_rand(10,100);
        });
    }

    public function getAncestor()
    {
        return User::where('id', '=', $this->referred_by)->first();
    }

    public function currentReferrals()
    {
        return User::where('referred_by', '=', $this->id)->where('id', '!=', $this->id)->get();
    }

    public function pendingReferrals()
    {
        return $this->referrals();
    }
}
