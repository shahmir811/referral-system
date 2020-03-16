# About Refferal System

Laravel based application used for referring new friends. Once a user is signed up with some referral link, he becomes child of his ancestor.If a user signs up without any referral email, admin will become his ancestor. At start, he has free account, only admin user or his parent user will activate his account.

## Requirements
- PHP >= 7.2.5
- BCMath PHP Extension
- Ctype PHP Extension
- Fileinfo PHP extension
- JSON PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PDO PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

***Note:***
Improper permission on `storage` & `public` folder will lead to server & application errors

##  Installation
1. Download or clone repository to your server root.
2. Run `composer install` to install all dependencies
3. Create `.env` in application root 
```cp .env.example .env```
4. Update database details and mail credentials in `.env`
5. Run `php artisan key:generate` to generate key
6. Run `php artisan migrate --seed` to install the database & required data

use the following credentials to log in
```
email: admin@gmail.com
password: 123456
```

## Troubleshooting

**APP_KEY not getting added to .env**
- Add APP_KEY to .env
- Copy generated key from terminal
- Run `php artisan key:generate` to generate key

### Frontend
- [VueJS] - Progressive JavaScript Framework
- [Vuex] - State management pattern + library for Vue.js applications
- [Axios] - Promise based HTTP client for the browser
- [Lodash] - A modern JavaScript utility library delivering modularity, performance & extras

### Backend
- [Laravel] - Web application framework with expressive, elegant syntax. 
- [JWT] - Authentication package for protecting private routes. 

[VueJS]: https://vuejs.org/
[Vuex]: https://vuex.vuejs.org/
[Axios]: https://github.com/axios/axios
[Lodash]: https://lodash.com/

[Laravel]: https://laravel.com/docs/7.x
[JWT]: https://jwt-auth.readthedocs.io/en/docs/