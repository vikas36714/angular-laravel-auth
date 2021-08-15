<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Validator;


class UserController extends Controller
{
    public $successStatus = 200;
	/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            return response(['success' => $success], $this-> successStatus); 
        } 
        else{ 
            return response(['error'=>'Unauthorised'], 401); 
        } 
    }

 	//  public function login (Request $request)
 	//  {
	//     $validator = Validator::make($request->all(), [
	//         'email' => 'required|string|email|max:255',
	//         'password' => 'required|string|min:6',
	//     ]);
	//     if ($validator->fails())
	//     {
	//         return response(['errors'=>$validator->errors()->all()], 422);
	//     }
	//     $user = User::where('email', $request->email)->first();
	//     if ($user) {
	//         if (Hash::check($request->password, $user->password)) {
	//             $token = $user->createToken('Laravel Password Grant Client')->accessToken;
	//             $response = ['token' => $token];
	//             return response($response, 200);
	//         } else {
	//             $response = ["message" => "Password mismatch"];
	//             return response($response, 422);
	//         }
	//     } else {
	//         $response = ["message" =>'User does not exist'];
	//         return response($response, 422);
	//     }
	// }
	/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 

	public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'first_name' => 'required|string|max:255',
	        'last_name' => 'required|string|max:255',
	        'email' => 'required|string|email|max:255|unique:users',
	        'password' => 'required|string|min:6',
        ]);
		if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
		$input = $request->all(); 
        $input['password'] = Hash::make($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['first_name'] =  $user->first_name;
		return response(['success'=>$success], $this-> successStatus); 
    }
	/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 
        return response(['success' => $user], $this-> successStatus); 
    } 

    public function logout (Request $request) {
	    $token = $request->user()->token();
	    $token->revoke();
	    $response = ['message' => 'You have been successfully logged out!'];
	    return response($response, $this-> successStatus);
	}

}
