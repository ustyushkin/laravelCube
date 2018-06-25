<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


/**
 * Class CubeController
 * @package App\Http\Controllers
 */
class CubeController extends Controller
{
    /**
     * Показать профиль данного пользователя.
     *
     * @param  int $id
     * @return Response
     */
    public function index(Request $request)
    {
        $userInstance = new User($request);
        /*$value = $request->cookie('level');
        var_dump($value);*/

        /*
        $response = new Response(view('cube',[
            'name'=>$userInstance->getName(),
            'lastDate'=>$userInstance->getLastDate(),
            'level'=>$userInstance->getCurrentLevel()
        ]));
        vs
        $response = new Response(view('cube',$userInstance->prepareResult()));
        */

        $preparedResult = $userInstance->prepareResult();
        $response = new Response(view('cube',$preparedResult));

        /*foreach ($preparedResult as $key=>$value)
        {
            //var_dump($key.$value);
            $response->withCookie(cookie($key, $value, 1000));
        }*/

        //return $response;
        return $response->withCookie(cookie('name', $userInstance->getName(), 1000000000))
            ->withCookie(cookie('lastDate', $userInstance->getLastDate(), 60))
            ->withCookie(cookie('level',$userInstance->getCurrentLevel(),60));
    }

    public function changeName(Request $request)
    {
        $userInstance = new User($request);
        $userInstance->setName($request->input('newName'));
        return response()->json(json_encode("{name:".$userInstance->getName()."}"))
            ->withCookie(cookie('name', $userInstance->getName(), 1000000000))
            ->withCookie(cookie('lastDate', $userInstance->getLastDate(), 60))
            ->withCookie(cookie('level',$userInstance->getCurrentLevel(),60));
    }

    public function changeLevel(Request $request)
    {
        $userInstance = new User($request);
        $userInstance->setCurrentLevel($request->input('level'));
        return response()->json(json_encode("{level:".$userInstance->getCurrentLevel()."}"))
            ->withCookie(cookie('name', $userInstance->getName(), 1000000000))
            ->withCookie(cookie('lastDate', $userInstance->getLastDate(), 60))
            ->withCookie(cookie('level',$userInstance->getCurrentLevel(),60));
    }

    /**
     * @return bool
     */
    public function statistic(Request $request)
    {
        $userInstance = new User($request);
        $userInstance->saveStatistic($request);
    }

    /**
     * @return string
     */
    public function test3()
    {
        return "test3//";
    }

}
