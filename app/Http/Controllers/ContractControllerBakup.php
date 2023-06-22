<?php

namespace App\Http\Controllers;
use App\Models\Contract;
use App\Models\Status;
use App\Models\Slot;
use App\Models\Variable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use Illuminate\Http\Response;

class ContractController extends Controller
{
    public function get(Request $request)
    {
        try {

        $param = $request->all();
        $contractId = isset($param['id']) ? $param['id']:  null ;
        $headerId = isset($param['header_id']) ? $param['header_id']:  null ;
        $contractType = isset($param['contract_type']) ? explode(',',$param['contract_type']): array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
        $approvalStatus = isset($param['approval_status']) ? explode(',',$param['approval_status']): array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
        $isNew = isset($param['is_new']) ? explode(',',$param['is_new']): array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
        $contractStatus = isset($param['contract_status']) ? explode(',',$param['contract_status']): array(1,2);
        $branchId = isset($param['branch_id']) ? $param['branch_id']: null;
        $typeId = isset($param['type_id']) ? $param['type_id']: null;
        $brandId = isset($param['brand_id']) ? $param['brand_id']: null;
        $lesseId = isset($param['lesse']) ? $param['lesse']: null;
        $date_from = isset($param['date_from']) ? $param['date_from'] : '1900-01-01';
        $date_to = isset($param['date_to']) ? $param['date_to'] : '3000-12-30';
        $inst_from = isset($param['installation_from']) ? $param['installation_from']: '1900-01-01';
        $inst_to = isset($param['installation_to']) ? $param['installation_to']: '3000-12-30';
     
        $orderColumn = isset($param['order_column']) ? $param['order_column']: 'cms_contract.id';
        $orderBy = isset($param['order_by']) ? $param['order_by']: 'desc';

        // SELECT * FROM `cms_contract` order by contract_type desc,id desc 

        $data =  Contract::select(
            'cms_contract.id',
            DB::raw("CONCAT(cms_type_size.width,'x',cms_type_size.length ,' ',cms_uom.uom_name) as size"),
            DB::raw('(SELECT status_name from cms_status where id = cms_contract.contract_type) AS contract_type'),
            'cms_contract.contract_type as contract_type_id',
            DB::raw('(SELECT status_name from cms_status where id = cms_contract.approval_status) AS approval_status'),
            'cms_contract.approval_status AS approval_status_id',
            'cms_type.material',
            DB::raw('(SELECT status_name from cms_status where id = cms_contract.is_new) AS isNew'),
            'cms_contract.is_new as is_new_id',
            'cms_contract.type_id',
            'cms_contract.slot_id',
            'parent_number',
            'contract_number',
            'type_name',
            'cms_contract.brand_id',
            'cms_contract.parent_contract_id',
            'brand_name',
            'branch_name',
            'cms_contract.status_id',
            'cms_contract.lesse',
            'cms_vendors.vendor_name',
            'cms_vendors.id as vendor_id',
            'installation_date',
            'status_name AS contract_status',
            'status_name',
            'users.name',
            'rental_id',
            'terms_of_contract',
            'cms_contract.mode_of_payment',
            'cms_contract.remarks',
            'contract_price',
            'contract_number',
            'cms_contract.created_at',
            'cms_contract.created_by',
            'cms_contract.updated_at',
            'cms_contract.updated_by',
            'cms_modeofpayment.mode_of_payment as payment_name',
            'cms_contract.installation_date',
            'cms_contract.start_date',
            'cms_contract.end_date',
            'cms_contract.no_of_months as number_of_months',
            DB::raw('(SELECT monthly_rental from cms_rental where id = cms_contract.rental_id) AS monthly_rental'),
            'contract_price',
            'material',
            'terms_of_contract',
            'cms_contract.remarks',
            'cms_contract.return_remarks',
            DB::raw('(SELECT full_name from users where id = cms_contract.created_by) AS created_by'),
            'cms_contract.created_at',
            DB::raw('(SELECT status_name from cms_status where id = cms_contract.approval_status) AS approval_status'),
            DB::raw('(SELECT full_name from users where id = cms_contract.updated_by) AS updated_by'),
            'cms_contract.updated_at',
            DB::raw('(SELECT status_name from cms_status where id = cms_contract.status_id) AS contract_status'),
            DB::raw('(SELECT full_name from users where id = cms_contract.printed_by) AS printed_by'),
            'cms_contract.printed_at',
            'cms_contract.parent_number'
        )
            ->leftJoin('cms_slot', 'cms_slot.id', '=', 'cms_contract.slot_id')
            ->leftJoin('cms_brand', 'cms_brand.id', '=', 'cms_contract.brand_id')
            ->leftJoin('cms_branch', 'cms_branch.id', '=', 'cms_slot.branch_id')
            ->leftJoin('cms_type', 'cms_type.id', '=', 'cms_slot.type_id')
            ->leftJoin('cms_status', 'cms_status.id', '=', 'cms_contract.status_id')
            ->leftJoin('users', 'users.id', '=', 'cms_contract.lesse')
            ->leftJoin('cms_modeofpayment', 'cms_modeofpayment.id', '=', 'cms_contract.mode_of_payment')
            ->leftJoin('cms_uom', 'cms_uom.id', '=', 'cms_type.uom_id')
            ->leftJoin('cms_type_size', 'cms_type_size.id', '=', 'cms_slot.size')
            ->leftJoin('cms_vendors', 'cms_vendors.id', '=', 'cms_contract.lesse')
            ->whereRaw('cms_contract.lesse = IFNULL(?, cms_contract.lesse)', [$lesseId])
            ->whereRaw('cms_slot.branch_id = IFNULL(?, cms_slot.branch_id)', [$branchId])
            ->whereRaw('cms_contract.brand_id = IFNULL(?, cms_contract.brand_id)', [$brandId])
            ->whereRaw('cms_slot.type_id = IFNULL(?, cms_slot.type_id)', [$typeId])
            ->whereIn('cms_contract.contract_type', $contractType)
            ->whereIn('cms_contract.status_id', $contractStatus)
            ->whereIn('cms_contract.is_new', $isNew)
            ->whereIn('cms_contract.approval_status', $approvalStatus)
            ->whereBetween('cms_contract.start_date', [$date_from, $date_to])
            // ->whereBetween('IFNULL(installation_date, installation_date)', [$inst_from, $inst_to])
            ->whereRaw('IFNULL(cms_contract.installation_date, cms_contract.start_date) BETWEEN  ? AND ? ', [$inst_from, $inst_to])
            // ->orWhereNotNull('installation_date')
            ->whereRaw('cms_contract.id = IFNULL(?, cms_contract.id)', [$contractId])
            ->whereRaw('cms_contract.header_id = IFNULL(?, cms_contract.header_id)', [$headerId])
            ->orderBy($orderColumn, $orderBy)
            ->orderBy('cms_contract.id', 'desc')
            ->get();
            
            //show approved by when the contract is approved
            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

            /// mali ang input sa lesse
            // no remarks saved

            // UPDATE `cms_contract` SET contract_status = 7 WHERE end_date < curdate() and contract_type = 5 and approval_status = 6

        try {
            DB::beginTransaction();
            $data = $request->all();
            $id = isset($data[0]['id']) ? explode(',', $data[0]['id']):  0 ;
            $contractId = isset($data[0]['contract_id']) ? explode(',', $data[0]['contract_id']):  [0] ;
            $brandId = isset($data[0]['brand_id']) ? $data[0]['brand_id']:  0 ;
            $slotId = isset($data[0]['slot_id']) ? explode(',', $data[0]['slot_id']):  null ;
            $startDate = isset($data[0]['start_date']) ? $data[0]['start_date']:  null ;
            $endDate = isset($data[0]['end_date']) ? $data[0]['end_date']:  null ;
            $installationDate = isset($data[0]['installation_date']) ? $data[0]['installation_date']:  null ;
            $modePayment = isset($data[0]['payment_id']) ? explode(',', $data[0]['payment_id']): [0] ;
            $lesse = isset($data[0]['lesse']) ? explode(',', $data[0]['lesse']):  [0] ;
            $statusId = isset($data[0]['status_id']) ? $data[0]['status_id']:  1 ;
            $isNew = isset($data[0]['is_new']) ? $data[0]['is_new']:  8;
            $contractType = isset($data[0]['contract_type']) ? explode(',', $data[0]['contract_type']):  null;
            $rentalId = isset($data[0]['rental_id']) ? explode(',', $data[0]['rental_id']):  [0];
            $contractPrice = isset($data[0]['contract_price']) ? explode(',', $data[0]['contract_price']):  [0];
            $isNew = isset($data[0]['is_new']) ? $data[0]['is_new']:  null;
            $approvalStatus = isset($data[0]['approval_status']) ? $data[0]['approval_status']:  10;
            $remarks = isset($data[0]['remarks']) ? $data[0]['remarks']:  ' ' ;
            $no_of_months = isset($data[0]['no_of_months']) ? $data[0]['no_of_months']: 0;
            $modify = isset($data[0]['modify']) ? $data[0]['modify']: 0;

            $lastInsertId = 0;
            // dd($modify);
            for ($x = 0; $x < count($slotId); $x++) {
                $contractNum =   ' ' ;
                $parentNum =  ' ' ;
                $tempType = isset($contractType[$x]) ? $contractType[$x]:  $contractType[0];
                $tempContractPrice = isset($contractPrice[$x]) ? $contractPrice[$x]:  $contractPrice[0];
                $templesse = isset($lesse[$x]) ? $lesse[$x]:  $lesse[0];
                $tempRental = isset($rentalId[$x]) ? $rentalId[$x]:  $rentalId[0];
                $tempMode = isset($modePayment[$x]) ? $modePayment[$x]:  $modePayment[0];
                $tempContractId = isset($contractId[$x]) ? $contractId[$x]:  $contractId[0];


                if(intval($tempType)  === 5){ //check if the created data is lease
                    $contractNum = DB::table('cms_variable')->select(DB::raw("CONCAT(initial,counter) as contract_number"))->find(1);
                    $contractNum = $contractNum->contract_number;
                }
    
                if($isNew === 9){ //check if the created data is renew
                    $parentNum = DB::table('cms_variable')->select(DB::raw("CONCAT(initial,counter) as parent_number"))->find(2);
                    $parentNum =  $parentNum->parent_number;
                }


                $contractUpdate = array();
                $tempContractNum = '';

                if($modify != 1){
                    $tempContractNum = $contractNum;
                }else{
                    $tempContractNum = DB::table('cms_contract')->select('contract_number')->find($id[$x]);
                    $tempContractNum = $tempContractNum->contract_number;
                }

                $contract = Contract::updateOrCreate([
                    'id'   => $var = isset($id[$x]) ? $id[$x] : 0,
                ],[   
                    'brand_id'     => $brandId,
                    'slot_id'     => $slotId[$x],
                    'mode_of_payment' => $tempMode,
                    'start_date'     => $startDate,
                    'end_date'     => $endDate,
                    'installation_date' => $installationDate,
                    'lesse' => $templesse ,
                    'rental_id' => $tempRental ,
                    'contract_type'   => $tempType ,
                    'status_id'   => $statusId,
                    'contract_price' => $tempContractPrice,
                    'is_new' => $isNew,
                    'approval_status' => $approvalStatus,
                    'contract_number' => $tempContractNum,
                    'parent_number' => $parentNum ,
                    'remarks' => $remarks ,
                    'parent_contract_id' => $tempContractId,
                    'no_of_months' => $no_of_months
                ]);

                //increment contract number when lease

                if($modify === 0){
                    if(intval($tempType)  === 5){
                        $CN = Variable::find(1);
                        $CN->counter = $CN->counter + 1;
                        $CN->save();
                    }
                }

                //update the status of slot based on contract type
                // take note with the renewal and other transaction for the contract it may affect the slot status

                $slot = Slot::find($slotId[$x]);
                $slot->status_id = isset($contractType[$x]) ? $contractType[$x]:  $contractType[0];
                $slot->save();
           
              } 

            $lastInsertId = $contract->id;
            DB::commit();

            $data = array("action" => "upload_data");

            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($data)
                )
            );


            $context  = stream_context_create($options);
            $result = file_get_contents($url, false, $context);
            if ($result === FALSE) { /* Handle error */ }
          //   var_dump($result);
            Storage::disk('local')->put('file.txt', 'Your content here');
            return response(["id" => $lastInsertId, "status" => true], 200);

            

        } catch (\Exception $e) {
            DB::rollback();

            $errorCode = 'error message';

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

    public function changeStatus(Request $request){
        try {
            DB::beginTransaction();
            $data = $request->all();
            $lastInsertId = 0;
            $data = $request->all();
            $id = isset($data[0]['id']) ? explode(',', $data[0]['id']):  [0] ;
            $parent_contract_id = isset($data[0]['parent_contract_id']) ? explode(',', $data[0]['parent_contract_id']):  [0] ;
            $contractType = isset($data[0]['contract_type']) ? explode(',', $data[0]['contract_type']):  null;
            $isNew = isset($data[0]['is_new']) ? explode(',', $data[0]['is_new']):  null;
            $approvalStatus = isset($data[0]['approval_status']) ? explode(',', $data[0]['approval_status']):  null;;
            $returnRemarks = isset($data[0]['return_remarks']) ? $data[0]['return_remarks']:  ' ' ;
            $lastInsertId = 0;
            $contractNum =   ' ' ;
            $parentNum =  ' ' ;

            for ($x = 0; $x < count($id); $x++) {
                $tempisNew = isset($isNew[$x]) ? $isNew[$x]:  $isNew[0];
                $tempApproval = isset($approvalStatus[$x]) ? $approvalStatus[$x]:  $approvalStatus[0];
                $tempArray = array();


                $contract = Contract::updateOrCreate([
                    'id'   => $id[$x]
                ],[
                    'is_new'   => $tempisNew,
                    'approval_status' => $tempApproval,
                    'contract_type' => $contractType[$x],
                    "return_remarks" => $returnRemarks
                ]);

            }
            $lastInsertId = $contract->id;
            DB::commit();
            return response(["id" => $lastInsertId, "status" => true], 200);

        } catch (\Exception $e) {

            DB::rollback();

            $errorCode = 'error message';

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

    public function printContract(Request $request){

        try {

            $data = $request->all();
            $headerId = isset($data['header_id']) ? $data['header_id']:  null ;
            $contractId = isset($data['contract_id']) ? $data['contract_id']:  null ;
            $data =  Contract::select(
            'cms_contract.id',
             DB::raw("CONCAT(cms_type_size.width,'x',cms_type_size.length ,' ',cms_uom.uom_name) as size"),
             DB::raw("CONCAT(type_name,' ',contract_number) as ad_space"),
             DB::raw('(SELECT status_name from cms_status where id = cms_contract.contract_type) AS contract_type'),
             DB::raw('(SELECT monthly_rental from cms_rental where id = cms_contract.rental_id) AS monthly_rental'),
             'cms_contract.contract_type as contract_type_id',
             DB::raw('(SELECT status_name from cms_status where id = cms_contract.approval_status) AS approval_status'),
            'cms_type.material',
             DB::raw('(SELECT status_name from cms_status where id = cms_contract.is_new) AS isNew'),
             'terms_of_contract',
             'cms_contract.no_of_months as number_of_months',
            'cms_contract.type_id',
            'cms_contract.slot_id',
            'parent_number',
            'contract_number',
            'type_name',
            'cms_contract.brand_id',
            'cms_contract.parent_contract_id',
            'brand_name',
            'branch_name',
            'cms_contract.status_id',
            'cms_contract.lesse',
            'cms_vendors.vendor_name',
            'cms_contract.start_date',
            'cms_contract.end_date',
            'installation_date',
            'status_name AS contract_status',
            'status_name',
            'users.name',
            'rental_id',
            'cms_modeofpayment.mode_of_payment',
            'contract_price',
            'contract_number',
            'parent_number',
            'cms_vendors.fax',
            'cms_vendors.email',
            'cms_vendors.phone',
            'cms_contract.created_at',
            DB::raw('(SELECT full_name from users where id = cms_contract.created_by) AS created_by'),
            'cms_contract.updated_at',
            DB::raw('(SELECT full_name from users where id = cms_contract.updated_by) AS updated_by'),
            'cms_type.material',
            'cms_contract.remarks'
        )
            ->leftJoin('cms_slot', 'cms_slot.id', '=', 'cms_contract.slot_id')
            ->leftJoin('cms_brand', 'cms_brand.id', '=', 'cms_contract.brand_id')
            ->leftJoin('cms_branch', 'cms_branch.id', '=', 'cms_slot.branch_id')
            ->leftJoin('cms_type', 'cms_type.id', '=', 'cms_slot.type_id')
            ->leftJoin('cms_status', 'cms_status.id', '=', 'cms_contract.status_id')
            ->leftJoin('cms_rental', 'cms_rental.id', '=', 'cms_contract.rental_id')
            ->leftJoin('users', 'users.id', '=', 'cms_contract.lesse')
            ->join('cms_uom', 'cms_uom.id', '=', 'cms_type.uom_id')
            ->leftJoin('cms_type_size', 'cms_type_size.id', '=', 'cms_slot.size')
            ->leftJoin('cms_vendors', 'cms_vendors.id', '=', 'cms_contract.lesse')
            ->leftJoin('cms_modeofpayment', 'cms_modeofpayment.id', '=', 'cms_contract.mode_of_payment')
            // ->where('cms_contract.header_id', $headerId)
            ->whereRaw('cms_contract.header_id  = IFNULL(?, cms_contract.header_id)', [$headerId])
            ->whereRaw('cms_contract.id = IFNULL(?, cms_contract.id)', [$contractId])
            ->get();
            
            Contract::where('header_id', $headerId)->update(['is_printed' => 1,'printed_by' => $request->cookie('user_id') , 'printed_at' => date("Y/m/d h:i:sa")]);
            return response()->json($data);

        } catch (\Exception $e) {
       
           return response($e, 500);

        }
        
    }

}
