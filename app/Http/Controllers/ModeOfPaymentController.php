<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModeOfPayment;
use Illuminate\Support\Facades\DB;

class ModeOfPaymentController extends Controller
{
    public function get($modeid = null)
    {
        try {

        $data =  ModeOfPayment::select(
            'cms_modeofpayment.id',
            'mode_of_payment',
            'terms_of_contract',
            'no_of_months',
            'start_date',
            'end_date',
            'status_id',
            'status_name',
            'created_at',
            DB::raw('(SELECT full_name from users where id = cms_modeofpayment.created_by) AS created_by'),
            'updated_at',
            DB::raw('(SELECT full_name from users where id = cms_modeofpayment.updated_by) AS updated_by')
        )
            ->join('cms_status', 'cms_status.id', '=', 'cms_modeofpayment.status_id')
            ->whereRaw('cms_modeofpayment.id = IFNULL(?, cms_modeofpayment.id)', [$modeid])
        // ->where('is_active', '=', 1)
            ->orderBy('cms_modeofpayment.id', 'desc')
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

            $mode = ModeOfPayment::updateOrCreate([
                // 'id'   => $request->get('id'),
                'id'   => $data[0]['id'],
            ],[
                'mode_of_payment'     => $data[0]['mode_of_payment'],
                'terms_of_contract' => $data[0]['terms_of_contract'],
                'no_of_months' => $data[0]['no_of_months'],
                'status_id'   => $data[0]['status_id']
            ]);

            $lastInsertId = $mode->id;
            return response(["id" => $lastInsertId, "status" => 'Sucess!'], 200);
        } catch (\Exception $e) {

            $errorCode = 'a' ;
            
            if (isset($e->errorInfo[1])) {
                $errorCode = $e->errorInfo[1];
              }

            if($errorCode == 1062){
                return response(["id" => $lastInsertId, "status" => false], 200);
            }else{
                return response($e, 500);
            }

        }

    }
    //
}
