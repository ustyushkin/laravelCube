<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CubeController extends Controller
{
  /**
   * Показать профиль данного пользователя.
   *
   * @param  int  $id
   * @return Response
   */
  public function index(Request $request)
  {
	$value = $request->cookie('test');
	var_dump($value);
	$response = new Response(view('cube'));

	return $response->withCookie(cookie('test', 'value2', 45000));
  }
}
