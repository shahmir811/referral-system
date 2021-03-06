<?php


Route::post('contact-us', 'Api\Guest\ContactController@contactUS');
Route::get('getUser/{token}', 'Api\Guest\ContactController@getUser');

Route::group([
    'namespace' => 'API\Auth',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');
    Route::get('verifyUser', 'AuthController@verifyUser');
    Route::delete('deleteUser/{id}', 'AuthController@deleteUser');

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
    Route::post('/changePasswordByAdmin/{id}', 'ReferralController@changePasswordByAdmin');

});

Route::group([
    'namespace' => 'API\Auth'

], function () {

    Route::post('/userForgotPassword', 'ForgotPasswordController@userForgotPassword');
    Route::post('/resetPassword/{token}', 'ForgotPasswordController@resetPassword');

});

