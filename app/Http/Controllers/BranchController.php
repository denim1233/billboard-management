<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;

class BranchController extends Controller
{
    public function get()
    {
        try {

        $data =  Branch::select(
            'cms_branch.id',
            'branch_name',
            'status_id',
            'status_name',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by'
        )
            ->join('cms_status', 'cms_status.id', '=', 'cms_branch.status_id')
            ->orderBy('branch_name', 'asc')
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

                $branch = Branch::updateOrCreate([
                    'id'   => $data[0]['id'],
                ],[
                    'branch_name'     => $data[0]['branch_name'],
                    'status_id'   => $data[0]['status_id']
                ]);

                $lastInsertId = $branch->id;
                return response(["id" => $lastInsertId, "status" => true], 200);

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
