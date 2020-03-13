<?php

Route::group([
    'namespace' => 'API\Auth',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');

});

Route::group([
    'namespace' => 'API\Referral',
    'prefix' => 'referral'

], function () {

    Route::get('/', 'ReferralController@index');
    Route::post('/sendReferral', 'ReferralController@sendReferral');
    Route::get('/activateUserAccount/{id}', 'ReferralController@activateUserAccount');
    Route::post('/updateProfile/{id}', 'ReferralController@updateProfile');
    Route::post('/updatePassword/{id}', 'ReferralController@updatePassword');
    Route::get('/changeUserStatusByAdmin/{id}', 'ReferralController@changeUserStatusByAdmin');
    Route::get('/allSystemUsers', 'ReferralController@allSystemUsers');

});