<?php
/**
 * Created by IntelliJ IDEA.
 * User: yustas
 * Date: 20.05.18
 * Time: 22:01
 */

namespace App\Http;

use Illuminate\Http\Request;
use App\UserModel;

class User
{
    private $name;
    private $level;
    private $lastDate;
    private $id;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->name = ($request->cookie('name')) ?: $this->generateNewName();
        //$this->name = $this->generateNewName();
        $this->lastDate = ($request->cookie('lastDate')) ?: date('d-m-Y H:m');
        $this->level = ($request->cookie('level')) ?: 1;
        $this->storeUserInstance();
        //$this->level = 1;
        /*var_dump($this->name);
        var_dump($this->level);
        var_dump($this->lastDate);*/
    }

    public function generateNewName()
    {
        //$seed = str_split('abcdefghijklmnopqrstuvwxyz' . 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' . '0123456789!@#$%^&*()');
        $seed = str_split('0123456789');
        shuffle($seed);
        $newName = '';
        foreach (array_rand($seed, 8) as $k) $newName .= $seed[$k];
        return 'Player'.$newName;
    }

    public function getLastDate()
    {
        return $this->lastDate;
    }

    public function setLastDate()
    {
        $this->lastDate = date('d-m-Y H:m');
    }

    public function getName()
    {
        return $this->name;
    }

    /**
     * @param $value
     */
    public function setName($value)
    {
        $this->name = $value;
    }

    public function getCurrentLevel()
    {
        return $this->level;
    }

    public function setCurrentLevel($value)
    {
        $this->level = $value;

    }
    public function storeUserInstance()
    {
        $user = UserModel::where('name',$this->name)->first();
        if($user->count()==0)
        {
            $user = new UserModel();
            $user->name = $this->getName();
        }
        $user->lastPlay = $this->getLastDate();
        $user->level = $this->getCurrentLevel();
        $user->save();
    }

}