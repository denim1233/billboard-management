<?php

namespace App\Http\Controllers;

use App\Models\UOM;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Contract;
use Auth;

class UOMController extends Controller
{
    public function get(Request $request)
    {

        try {
       
        $data =  UOM::select(
            'id',
            'uom_name',
            'uom_description'
        )
            ->get();

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }
}
