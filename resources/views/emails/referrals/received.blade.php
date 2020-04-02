@component('mail::message')
# {{ $sender->name }} has invited you to {{ config('app.name') }}

Click on the following button or use <strong> Referral ID:  {{ $sender->token }} </strong> in normal [register form]({{ url('/register') }}).

@component('mail::button', ['url' => url('/register?email=' . $referral->email . '&referral=' . $referral->token )])
Sign up now
@endcomponent

Checkout more info about Net Contacts, <a href="{{ url('/referral?referral=' . $sender->id) }}">Click here!</a>

Thanks,<br>
{{ config('app.name') }}
@endcomponent
