@component('mail::message')
# Hi {{ $user->name }},

<br>
Thank you for creating an account with us. Don't forget to complete your registration!
<br>

<br>
Please click on the link below to confirm your email address:
<br>

@component('mail::button', ['url' => url('user/verify', $user->email_verification_token) ])
Confirm my email address
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent


