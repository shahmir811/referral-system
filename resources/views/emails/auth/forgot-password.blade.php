@component('mail::message')
# Hello {{ $user->name }},

Click on the following button to reset your password

@component('mail::button', ['url' => url('/password-reset?referral=' . $user->token )])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
