<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/','CubeController@index');
Route::get('/test','CubeController@test');
Route::post('/user/changename','CubeController@changeName');
Route::post('/user/changelevel','CubeController@changeLevel');