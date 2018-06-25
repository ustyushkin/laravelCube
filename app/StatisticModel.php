<?php
/**
 * Created by IntelliJ IDEA.
 * User: yustas
 * Date: 25.06.18
 * Time: 20:23
 */
namespace App;

use Illuminate\Database\Eloquent\Model;

class StatisticModel extends Model
{
    public $timestamps = false;
    protected $connection = 'cube';
    protected $table = 'statistic';
}