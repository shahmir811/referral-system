@component('mail::message')
# {{ $sender->name }} has invited you to {{ config('app.name') }}


@component('mail::button', ['url' => url('/register?email=' . $referral->email . '/referral=' . $referral->token )])
Sign up now
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
