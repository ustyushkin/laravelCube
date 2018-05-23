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

/**
 * Class User
 * @package App\Http
 */
class User
{

    private $name;
    private $level;
    private $lastDate;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $name = $request->cookie('name');
        $lastDate = $request->cookie('lastDate');
        $level = $request->cookie('level');

        $this->name = $name ?: $this->generateNewName();
        //$this->name = $this->generateNewName();
        $this->lastDate = $lastDate ?: date('d-m-Y H:m');
        $this->level = $level ?: 1;

        $this->storeUserInstance();

        $this->prepareResult();
    }

    /**
     * @return string
     */
    public function generateNewName()
    {
        //$seed = str_split('abcdefghijklmnopqrstuvwxyz' . 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' . '0123456789!@#$%^&*()');
        $seed = str_split('0123456789');
        shuffle($seed);
        $newName = '';
        foreach (array_rand($seed, 8) as $k) $newName .= $seed[$k];
        return 'Player' . $newName;
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
        if (!$this->isExists($value)) {
            $this->name = $value;
            $this->storeUserInstance();
        }
    }

    public function getCurrentLevel()
    {
        return $this->level;
    }

    public function setCurrentLevel($value)
    {
        $this->level = $value;

    }

    public function isExists($name)
    {
        return (!is_null(UserModel::where('name', $name)->first()) ? true : false);
    }

    /**
     * @return bool
     */
    public function storeUserInstance()
    {
        $user = UserModel::where('name', $this->name)->first();
        if (!$this->isExists($this->name)) {
            $user = new UserModel();
            $user->name = $this->getName();
        }
        $user->lastPlay = $this->getLastDate();
        $user->level = $this->getCurrentLevel();
        $user->save();
        return true;
    }

    public function prepareResult()
    {
        $preparedResult = [];
        $properties = get_class_vars(get_class($this));
        $keys = array_keys($properties);
        foreach ($keys as $key) {
            $preparedResult[$key] = $this->$key;
        }
        return $preparedResult;
    }

}