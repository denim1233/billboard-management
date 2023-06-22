<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;

class StatusController extends Controller
{
    public function get($type = null)
    {
        try {

            $type = isset($type) ? explode(',',$type):array(0,1,2,3,4,5,6,7,8,9,10) ;
        $data =  Status::select(
            'id',
            'status_name'
        )
            // ->whereRaw('type = IFNULL(?, type)', [$type])
            ->whereIn('type', $type)
            ->get();

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    //
}
