<?php
/**
 * Created by IntelliJ IDEA.
 * User: yustas
 * Date: 21.05.18
 * Time: 22:05
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    public $timestamps = false;
    protected $connection = 'cube';
    protected $table = 'users';
}