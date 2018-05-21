<?php
/**
 * Created by IntelliJ IDEA.
 * User: yustas
 * Date: 20.05.18
 * Time: 22:06
 */

namespace App\Http;


class Level
{
    private $level;

    public function _constructor ()
    {}

    public function getLevel(int $value)
    {
        //var arr = [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]]
        return 'var arr = [[10, 7], [5, 2], [1, 1], [0, 6], [13, 12], [11, 9], [7, 5], [3, 10], [2, 4], [14, 3], [15, 0], [9, 8], [12, 11], [8, 15], [4, 13], [6, 14]]';
    }
}