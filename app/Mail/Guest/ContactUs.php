<?php

namespace App\Mail\Guest;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactUs extends Mailable
{
    use Queueable, SerializesModels;

    public $name, $email, $contact_number, $invitation_code, $membership, $message;

    public function __construct($name, $email, $contact_number, $invitation_code, $membership, $message)
    {
        $this->name = $name;
        $this->email = $email;
        $this->contact_number = $contact_number;
        $this->invitation_code = $invitation_code ? $invitation_code : '---';
        $this->membership = $membership;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Net Contacts: Contact Us Form')->markdown('emails.guest.contact-us');
    }
}
