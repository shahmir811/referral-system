@component('mail::message')
# Hello Admin,

## Following email has been sent by {{ $name }}. Following is his details and message 

### Name
{{ $name }}


### Email
{{ $email }}


### Phone Number
{{ $contact_number }}


### Membership
{{ $membership }} membership 


### Invitation Code
{{ $invitation_code }}


### Message
{{ $message }}



Thanks,<br>
{{ config('app.name') }}
@endcomponent
