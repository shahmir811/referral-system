<?php

namespace App\Mail\Referrals;

use App\Models\{User, Referral};
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ReferralReceived extends Mailable
{
    use Queueable, SerializesModels;

    public $sender, $referral;

    public function __construct(User $sender, Referral $referral)
    {
        $this->sender = $sender;
        $this->referral = $referral;
    }

    public function build()
    {
        return $this->subject($this->sender->name . " has invited you")->markdown('emails.referrals.received');
    }

}
