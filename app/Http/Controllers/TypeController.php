<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;
use App\Models\TypeSize;
use Illuminate\Support\Facades\DB;

class TypeController extends Controller
{
    public function get($id = null)
    {
        try {
            
            $data =  Type::select(
                'cms_type.id',
               'type_name',
                'material',
                'cms_type.size',
                DB::raw('(SELECT full_name from users where id = cms_type.created_by) AS created_by'),
                DB::raw("(select CONCAT(cts.length,'x',cts.width ,' ',cou.uom_name) size from cms_type_size cts
                inner join cms_uom cou on cou.id = cts.uom_id
                where type_id = cms_type.id limit 1) as size"),
                'status_id',
                'status_name',
                'created_at',
                DB::raw('(SELECT full_name from users where id = cms_type.created_by) AS created_by'),
                'updated_at',
                DB::raw('(SELECT full_name from users where id = cms_type.updated_by) AS updated_by')
                )
                ->join('cms_status', 'cms_status.id', '=', 'cms_type.status_id')
                ->whereRaw('cms_type.id = IFNULL(?, cms_type.id)', [$id])
                ->orderBy('cms_type.id', 'desc')
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
                $statusId = isset($data[0]['status_id']) ? $data[0]['status_id']: 1;
                $sizeStatusId = isset($data[0]['size_status_id']) ? explode(',',$data[0]['size_status_id']): 1;
                
                
                $type = Type::updateOrCreate([
                    'id'   => $data[0]['id'],
                ],[
                    'type_name'     => $data[0]['type_name'],
                    'uom_id' => 1,
                    'material'    => $data[0]['material'],
                    'size'    => 'default',
                    'status_id'   =>  $statusId 
                ]);
                
                $lastInsertId = $type->id;
                
                if (isset($data[0]['size_id'])) {
                    
                    $length = explode(',', $data[0]['length']);
                    $width = explode(',', $data[0]['width']);
                    $uomId = explode(',', $data[0]['uom_id']);
                    $sizeId = explode(',', $data[0]['size_id']);
                    
                    $tempId =  ($sizeId[0] === 0) ?  0 : $sizeId;
                    // dd($typeId[0]);
                    $this->saveSize($tempId,$lastInsertId,$length,$width,$uomId,$sizeStatusId);
                    
                }else{
                    if(!isset($data[0]['length'])){return;}
                    $this->saveSize($tempId,$data[0]['id'],$length,$width,$uomId,$sizeStatusId);
                }
                
                
                
                return response(["id" => $lastInsertId, "status" => 'Sucess!'], 200);
            } catch (\Exception $e) {
                
                return response($e, 500);
                
            }
            
        }
        
        public function saveSize($id,$typeId,$length,$width,$uomId,$statusId){
            //check paraeter if edit or delete
            // dd($uomId);
            //convert to array then save to type sizes
            DB::beginTransaction();
            $temp = '';
            
            $freshparam = '';
            try {
                for ($x = 0; $x < count($uomId); $x++) {
                    if($length[$x] != '' && $width[$x] != ''){
                        
                        $tempId = isset($id[$x]) ? intval($id[$x]) : 0;
                        $paramStatus = isset($statusId[$x]) ? $statusId[$x] : 1;
                        if($paramStatus  === ''){$paramStatus = 1;}
                        $freshparam .= '-'.$paramStatus;
                        $temp .= '-'.$paramStatus;
                        $typeSize = TypeSize::updateOrCreate([
                            'id'   =>   $tempId 
                        ],[
                            'type_id'    => $typeId,
                            'length'    => $length[$x],
                            'width'    => $width[$x],
                            'uom_id'    => $uomId[$x],
                            'status_id'   => $paramStatus,
                        ]);
                    }
                } 
                DB::commit();
                return response([ "status" => 'Save Sucess!'], 200);
            } catch (\Exception $e) {
                DB::rollback();
                return response($e, 500);
                
            }
        }
        
        public function getSize($id)
        {
            
            try {
                
                $data =  TypeSize::select(
                    'cms_type_size.id',
                    'width',
                    'length',
                    'uom_id',
                    'uom_name',
                    'cms_type_size.status_id',
                    'cms_type_size.created_at',
                    'cms_type_size.created_by',
                    'cms_type_size.updated_at',
                    'cms_type_size.updated_by'
                    )
                    ->join('cms_uom', 'cms_uom.id', '=', 'cms_type_size.uom_id')
                    ->join('cms_status', 'cms_status.id', '=', 'cms_type_size.status_id')
                    ->where('type_id', $id )
                    ->where('cms_type_size.status_id', 1 )
                    ->get();
                    
                    
                    // dd($request);
                    // $data =  DB::table('cms_type_size')
                    //         ->join('cms_uom', 'cms_uom.id', '=', 'cms_type_size.uom_id')
                    //         ->where('type_id', $id )
                    //         ->get();
                    
                    return response()->json($data);
                    
                } catch (\Exception $e) {
                    
                    return response($e, 500);
                    
                }
            }
            
            public function manageSize(Request $request){
                
                
                $length = explode(',', $data['length']);
                $width = explode(',', $data['width']);
                $uomId = explode(',', $data['uom_id']);
                $typeId = $data['type_id'];
                $statusId = $data['status_id'];
                $id = explode(',', $data['size_id']);
                $this->saveSize($id,$typeId,$length,$width,$uomId,$statusId);
                
            }
            
            
            public function deleteSize(){
                
            }
            
            
            public function testManage()
            {
                
            }
            
        }
        