<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Authorization, Content-Type");
// header("Access-Control-Allow-Methods: DELETE");

use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['cors','json.response']], function () {
    Route::post('login', [UserController::class, 'login'])->name('login.api');;
	Route::post('register', [UserController::class, 'register'])->name('register.api');;


	Route::group(['middleware' => 'auth:api'], function(){
		Route::post('details', [UserController::class, 'details'])->name('details.api');
		Route::post('logout', [UserController::class, 'logout'])->name('logout.api');
	});
});
