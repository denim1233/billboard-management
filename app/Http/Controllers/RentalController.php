<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;
use Illuminate\Support\Facades\DB;

class RentalController extends Controller
{
    public function get($id = null)
    {
        try {

        $data =  Rental::select(
            'cms_rental.id',
            'monthly_rental',
            'status_id',
            'status_name',
            'created_at',
            DB::raw('(SELECT full_name from users where id = cms_rental.created_by) AS created_by'),
            'updated_at',
            DB::raw('(SELECT full_name from users where id = cms_rental.updated_by) AS updated_by')
        )
        ->join('cms_status', 'cms_status.id', '=', 'cms_rental.status_id')
        ->whereRaw('cms_rental.id = IFNULL(?, cms_rental.id)', [$id])
        ->orderBy('cms_rental.id', 'desc')
        ->get();

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

        try {

            $data = $request->all();
            $lastInsertId = 0;

            $rental = Rental::updateOrCreate([
                'id'   => $data[0]['id'],
            ],[
                'monthly_rental'     => $data[0]['monthly_rental'],
                'status_id'   => $data[0]['status_id']
            ]);

            $lastInsertId = $rental->id;
            return response(["id" => $lastInsertId, "status" => 'Sucess!'], 200);
            
        } catch (\Exception $e) {

            $errorCode = $e->errorInfo[1];

            if($errorCode == 1062){
                return response(["id" => $lastInsertId, "status" => false], 200);
            }else{
                return response($e, 500);
            }

        }

    }
}
