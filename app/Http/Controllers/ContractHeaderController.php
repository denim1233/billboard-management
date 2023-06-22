<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContractHeader;
use App\Models\Contract;
use App\Models\Slot;
use App\Models\Variable;
use Illuminate\Support\Facades\DB;

class ContractHeaderController extends Controller
{
    public function get(Request $request){

        try {
            $param = $request->all();
            $lesse = isset($param['lesse']) ? $param['lesse']:  null ;
            $data =  ContractHeader::select(
                'cms_parent_contract.id',
                'vendor_name',
                'parent_number'
            )
                ->leftjoin('cms_vendors', 'cms_vendors.id', '=', 'cms_parent_contract.lesse')
                ->whereRaw('cms_parent_contract.lesse = IFNULL(?, cms_parent_contract.lesse)', [$lesse])
                ->get();
    
                return response()->json($data);
    
            } catch (\Exception $e) {
    
                return response($e, 500);
    
            }
    }

    public function manage(Request $request){
        
       
        try {
            DB::beginTransaction();
            $data = $request->all();
            $headerId = 0;
            $id = isset($data[0]['id']) ? explode(',', $data[0]['id']):  [0] ;
            $parentNum = DB::table('cms_variable')->select(DB::raw("CONCAT(initial,counter) as parent_number"))->find(2);
            $parentNum =  $parentNum->parent_number;
            $lesse = isset($data[0]['lesse']) ?  explode(',', $data[0]['lesse']):  [0] ;
            // insert dapat
            $header = ContractHeader::where('id', $id)->update(['lesse' => $lesse,'parent_number' => $parentNum]);

            $header = new ContractHeader;
            $header->parent_number = $parentNum ;
            $header->lesse = $lesse[0];
            $header->save();
            $headerId = $header->id;

            Contract::whereIn('id', $id)->update(['parent_number' => $parentNum,'header_id' => $headerId]);

            //Increment the counter of Parent
            $PN = Variable::find(2);
            $PN->counter = $PN->counter + 1;
            $PN->save();

            //increment the counter in the variables after saving data
            DB::commit();
            return response()->json($data);
    
        } catch (\Exception $e) {
            DB::rollback();
            return response($e, 500);
        }
    }
}



