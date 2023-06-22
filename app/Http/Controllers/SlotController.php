<?php

namespace App\Http\Controllers;

use App\Models\Slot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SlotController extends Controller
{
    public function get(Request $request)
    {
        try {
            $param = $request->all();
            $id = isset($param['id']) ? $param['id']:  null ;
            $branchId = isset($param['branch_id']) ? $param['branch_id']:  null ;
            $typeId = isset($param['type_id']) ? $param['type_id']:  null ;
            $brandId = isset($param['brand_id']) ? $param['brand_id']:  null ;
            $slotNumber = isset($param['slot_number']) ? $param['slot_number']:  null ;
            $sizeId = isset($param['size_id']) ? $param['size_id']:  null ;
            $statusId = isset($param['status_id']) ? $param['status_id']:  null ;
            $orderColumn = isset($param['order_column']) ? $param['order_column']: 'cms_slot.id';
            $orderBy = isset($param['order_by']) ? $param['order_by']: 'desc';
            $data =  Slot::select(
                DB::raw("CONCAT(cms_type_size.length,'x',cms_type_size.width ,' ',cms_uom.uom_name) as size"),
                'cms_slot.id as slot_id',
                'slot_number',
                'branch_id',
                'branch_name',
                'cms_slot.type_id',
                'type_name',
                'cms_type_size.width',
                'cms_type_size.length',
                'cms_uom.uom_name',
                'cms_type.material',
                'cms_slot.brand_id',
                'brand_name',
                'cms_slot.status_id',
                'cms_slot.remarks',
                'status_name',
                'cms_slot.created_at',
                DB::raw('(SELECT full_name from users where id = cms_slot.created_by) AS created_by'),
                'cms_slot.updated_at',
                DB::raw('(SELECT full_name from users where id = cms_slot.updated_by) AS updated_by'),
                'cms_slot.deleted_at',
                'cms_slot.deleted_by',
                'cms_slot.add_by',
                'cms_type_size.id as size_id',
            )
                ->leftJoin('cms_brand', 'cms_brand.id', '=', 'cms_slot.brand_id')
                ->join('cms_branch', 'cms_branch.id', '=', 'cms_slot.branch_id')
                ->join('cms_type', 'cms_type.id', '=', 'cms_slot.type_id')
                ->join('cms_status', 'cms_status.id', '=', 'cms_slot.status_id')
                ->join('cms_type_size', 'cms_type_size.id', '=', 'cms_slot.size')
                ->join('cms_uom', 'cms_uom.id', '=', 'cms_type_size.uom_id')
                ->whereRaw('cms_slot.id = IFNULL(?, cms_slot.id)', [$id])
                ->whereRaw('cms_slot.branch_id = IFNULL(?, cms_slot.branch_id)', [$branchId])
                ->whereRaw('cms_slot.type_id = IFNULL(?, cms_slot.type_id)', [$typeId])
                ->whereRaw('cms_slot.slot_number = IFNULL(?, cms_slot.slot_number)', [$slotNumber])
                ->whereRaw('cms_slot.size = IFNULL(?, cms_slot.size)', [$sizeId])
                ->whereRaw('cms_slot.status_id = IFNULL(?, cms_slot.status_id)', [$statusId])
                ->orderBy($orderColumn, $orderBy)
                ->get();

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function getCreateSlot(Request $request)
    {
        try {

            $param = $request->all();
            $id = isset($param['id']) ? $param['id']:  null ;
            $branchId = isset($param['branch_id']) ? $param['branch_id']:  null ;
            $typeId = isset($param['type_id']) ? $param['type_id']:  null ;
            $brandId = isset($param['brand_id']) ? $param['brand_id']:  null ;
            $slotNumber = isset($param['slot_number']) ? $param['slot_number']:  null ;
            $sizeId = isset($param['size_id']) ? $param['size_id']:  null ;
            $statusId = isset($param['status_id']) ? $param['status_id']:  null ;
            $orderColumn = isset($param['order_column']) ? $param['order_column']: 'cms_slot.id';
            $orderBy = isset($param['order_by']) ? $param['order_by']: 'desc';
            $data =  Slot::select(
                DB::raw("CONCAT(cms_type_size.length,'x',cms_type_size.width ,' ',cms_uom.uom_name) as size"),
                'cms_slot.id as slot_id',
                'cms_contract.id as contract_id',
                'slot_number',
                'branch_id',
                'branch_name',
                'cms_slot.type_id',
                'type_name',
                'cms_type_size.width',
                'cms_type_size.length',
                'cms_uom.uom_name',
                'cms_type.material',
                'cms_slot.brand_id',
                'brand_name',
                'cms_slot.status_id',
                'cms_slot.remarks',
                'status_name',
                'cms_slot.created_at',
                DB::raw('(SELECT full_name from users where id = cms_slot.created_by) AS created_by'),
                'cms_slot.updated_at',
                DB::raw('(SELECT full_name from users where id = cms_slot.updated_by) AS updated_by'),
                'cms_slot.deleted_at',
                'cms_slot.deleted_by',
                'cms_slot.add_by',
                'cms_type_size.id as size_id',
                'cms_contract.start_date',
                'cms_contract.end_date',
                'cms_contract.contract_number',
                DB::raw('(SELECT brand_name from cms_brand where id = cms_contract.brand_id) AS contract_brand'),
            )
                ->leftJoin('cms_brand', 'cms_brand.id', '=', 'cms_slot.brand_id')
                ->join('cms_branch', 'cms_branch.id', '=', 'cms_slot.branch_id')
                ->join('cms_type', 'cms_type.id', '=', 'cms_slot.type_id')
                ->join('cms_status', 'cms_status.id', '=', 'cms_slot.status_id')
                ->join('cms_type_size', 'cms_type_size.id', '=', 'cms_slot.size')
                ->join('cms_uom', 'cms_uom.id', '=', 'cms_type_size.uom_id')
                ->leftjoin('cms_contract', 'cms_contract.slot_id', '=', 'cms_slot.id')
                ->whereRaw('cms_slot.id = IFNULL(?, cms_slot.id)', [$id])
                ->whereRaw('cms_slot.branch_id = IFNULL(?, cms_slot.branch_id)', [$branchId])
                ->whereRaw('cms_contract.brand_id = IFNULL(?, cms_contract.brand_id)', [$brandId])
                ->whereRaw('cms_slot.type_id = IFNULL(?, cms_slot.type_id)', [$typeId])
                ->whereRaw('cms_slot.slot_number = IFNULL(?, cms_slot.slot_number)', [$slotNumber])
                ->whereRaw('cms_slot.size = IFNULL(?, cms_slot.size)', [$sizeId]);
                // ->whereRaw('cms_slot.status_id = IFNULL(?, cms_slot.status_id)', [$statusId]);
                
                if(!$brandId){
                    $data = $data->orWhereNull('cms_contract.brand_id');
                }

                $data = $data->where('cms_slot.status_id','!=' , 2);

                $data = $data->orderBy($orderColumn, $orderBy)->get();

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

        try {
            DB::beginTransaction();
            //slot always insert data
            $data = $request->all();
            $lastInsertId = 0;
            $excuteQuery = true;
            $id = isset($data['id']) ? $data['id']:  0 ;
            $brandId = isset($data['brand_id']) ? $data['brand_id']:  0 ;

            // dd($brandId);
            if($data['add_by'] == 'quantity'){

                //check if the action is update then dont insert batch
                if($id != 0){
                    
                    $slot = Slot::updateOrCreate([
                        'id'   => $id,
                    ],[
                        'slot_number'     => $data['slot_number'],
                        'branch_id' => $data['branch_id'],
                        'type_id'    => $data['type_id'],
                        'brand_id'    => $brandId,
                        'size'    => $data['size_id'],
                        'add_by'    => $data['add_by'],
                        'status_id'   => $data['status_id']
                    ]);
                    DB::commit();
                    return;
                }
                $maxSlot = intval(DB::table('cms_slot')->where('branch_id',$data['branch_id'])->max('slot_number')) + 1;

                for ($x = 1; $x < ($data['slot_number'] + 1); $x++) {

                    if (Slot::where('slot_number', $maxSlot )->where('branch_id', $data['branch_id'])->exists()) {

                    }else{
                        $slot = Slot::updateOrCreate([
                            'id'   => 0,
                        ],[
                            'slot_number'     => $maxSlot,
                            'branch_id' => $data['branch_id'],
                            'type_id'    => $data['type_id'],
                            'brand_id'    => $brandId,
                            'size'    => $data['size_id'],
                            'add_by'    => $data['add_by'],
                            'status_id'   => $data['status_id']
                        ]);
                    }

                    $maxSlot =  $maxSlot + 1;
                  
                }
            }else{

                if(intval($id) === 0){
                    if (Slot::where('slot_number', $data['slot_number'])->where('branch_id', $data['branch_id'])->exists()) {
                        $excuteQuery = false;
                        return response(["id" => $lastInsertId, "status" => 'Save Failed Slot Number and Branch Exists!',"status_id" => 0], 200);
                    }
                }

                if($excuteQuery === true){
                
                    $slot = Slot::updateOrCreate([
                        'id'   => $request->get('id'),
                    ],[
                        'slot_number'     => $data['slot_number'],
                        'branch_id' => $data['branch_id'],
                        'type_id'    => $data['type_id'],
                        'brand_id'    => $brandId,
                        'size'    => $data['size_id'],
                        'add_by'    => $data['add_by'],
                        'status_id'   => $data['status_id']
                    ]);
                }
            }

            // there is two types of insert
            // quantity insert 
            // single insert 

            $lastInsertId = $slot->id;
            // $temp = $this->getSingleData($lastInsertId);
            // $url = 'http://web44.citihardwarelan.com:8000/api/ccms/AdminController.php';
            //   // just insert the action with the parameter
            // $data = array(    'action' => 'manage_slot', 'slot_id' => $lastInsertId , 'store_id' => $data['branch_id'],
            //                     'store_name' => $temp[0]['branch_name'], 'contract_id' => '', 'slot_type' => $temp[0]['type_name'],
            //                     'slot_size' => $temp[0]['size'], 'contract_number' => '', 'contract_start_date' => '',
            //                     'contract_end_date' => '', 'slot_status' => $temp[0]['status_name'], 'slot_position' => $data['slot_number'],
            //                     'creation_date' => $temp[0]['created_at']->format('m/d/Y'), 'created_by' => 1367, 'last_update_login' => '',
            //                     'last_update_by' => '', 'last_update_date' => $temp[0]['updated_at']->format('m/d/Y'), 'slot_operating_unit' => $temp[0]['operating_unit'],
            //                     'slot_supplier_name' => '', 'slot_supplier_id' => ''

            //               );

            // $options = array(
            //     'http' => array(
            //         'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            //         'method'  => 'POST',
            //         'content' => http_build_query($data)
            //     )
            // );
            
            // $context  = stream_context_create($options);
            // $result = file_get_contents($url, false, $context);
            // if ($result === FALSE) { /* Handle error */ }
        //   var_dump($result);
            // Storage::disk('local')->put('file.txt', 'Your content here');
        // when update user the 1367
        //what will happen if we will do an update

            // DB::rollback();
            DB::commit();
            return response(["id" => $lastInsertId, "status" => 'Sucess!',"status_id" => 1], 200);
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

    public function delete(Request $request){

        try {
            $data = $request->all();

            $deleted_at = ($data['status_id'] == 2) ? date("Y/m/d h:i:sa"): ' ';
            $deleted_by = ($data['status_id'] == 2) ? 'save user id':  ' ';
            $remarks = isset($data['remarks']) ? $data['remarks']:  ' ' ;
            
            $lastInsertId = 0;
            $slot = Slot::updateOrCreate([
                'id'   => $request->get('slot_id'),
            ],[
                'status_id'   => 2,
                'remarks'   => $remarks,
                'deleted_by'   => $deleted_by,
                'deleted_at'   => $deleted_at
            ]);

            return response(["status" => 'Sucess!'], 200);
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

    public function getSingleData($id){
        $data =  Slot::select(
            DB::raw("CONCAT(cms_type_size.length,'x',cms_type_size.width ,' ',cms_uom.uom_name) as size"),
            'cms_slot.id as slot_id',
            'slot_number',
            'branch_id',
            'branch_name',
            'cms_slot.type_id',
            'type_name',
            'cms_type_size.width',
            'cms_type_size.length',
            'cms_uom.uom_name',
            'cms_type.material',
            'cms_slot.brand_id',
            'brand_name',
            'cms_slot.status_id',
            'cms_slot.remarks',
            'status_name',
            'cms_slot.created_at',
            DB::raw('(SELECT full_name from users where id = cms_slot.created_by) AS created_by'),
            'cms_slot.updated_at',
            DB::raw('(SELECT full_name from users where id = cms_slot.updated_by) AS updated_by'),
            'cms_slot.deleted_at',
            'cms_slot.deleted_by',
            'cms_slot.add_by',
            'cms_type_size.id as size_id',
        )
            ->leftJoin('cms_brand', 'cms_brand.id', '=', 'cms_slot.brand_id')
            ->join('cms_branch', 'cms_branch.id', '=', 'cms_slot.branch_id')
            ->join('cms_type', 'cms_type.id', '=', 'cms_slot.type_id')
            ->join('cms_status', 'cms_status.id', '=', 'cms_slot.status_id')
            ->join('cms_type_size', 'cms_type_size.id', '=', 'cms_slot.size')
            ->join('cms_uom', 'cms_uom.id', '=', 'cms_type_size.uom_id')
            ->where('cms_slot.id','=', $id)
            ->orderBy($orderColumn, $orderBy)
            ->get();

        return response()->json($data);
    }

}
