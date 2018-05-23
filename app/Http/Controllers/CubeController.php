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

        $response = new Response(view('cube',$userInstance->prepareResult()));

        return $response->withCookie(cookie('name', $userInstance->getName(), 1000000000))
            ->withCookie(cookie('lastDate', $userInstance->getLastDate(), 60))
            ->withCookie(cookie('level',$userInstance->getCurrentLevel(),60));
    }

    public function changeName(Request $request)
    {
        $userInstance = new User($request);
        $userInstance->setName($request->input('newName'));
        return response()->json(json_encode("{name:".$userInstance->getName()."}"))->withCookie(cookie('name', $userInstance->getName(), 1000000000));
    }
    /**
     * @return bool
     */
    public function test(Request $request)
    {
        /*$testFunction = function ($request) {
            $testRequest = $request;
            echo "in test function";
            echo "<br>";
            return "test";
        };
        $testFunction2 = function () {
            echo "in test function";
            echo "<br>";
        };

        echo $this->callAction("test3", array());
        echo $this->test3();

        echo $testFunction($request);

        $this->middleware($testFunction);
        $this->middleware($testFunction2);

        $testMiddleware = $this->getMiddleware();
        var_dump($testMiddleware);*/

        /*$test = $request->input('*');
        echo $test[0];*/

        $test = $request->server();
        foreach ($test as $key=>$value)
        {
            echo $key,"=",$value."<br>";
        }

        $test = $request->session();
        foreach ($test as $key=>$value)
        {
            echo $key,"=",$value."<br>";
        }
        return "test";
    }

    /**
     * @return string
     */
    public function test3()
    {
        return "test3//";
    }

}
