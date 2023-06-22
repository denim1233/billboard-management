<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function get($id = null)
    {
        try {

        $data =  Role::select(
            'cms_roles.id',
            'role_name',
            'role_description',
            'status_id',
            'status_name',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by'
        )
        ->join('cms_status', 'cms_status.id', '=', 'cms_roles.status_id')
        ->whereRaw('cms_roles.id = IFNULL(?, cms_roles.id)', [$id])
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

            $role = Role::updateOrCreate([
                'id'   => $request->get('id'),
            ],[
                'role_name'     => $data['role_name'],
                'role_description' => $data['role_description'],
                'status_id'   => $data['status_id']
            ]);

            $lastInsertId = $role->id;
            return response(["id" => $lastInsertId, "status" => 'Sucess!'], 200);
        } catch (\Exception $e) {

            return response($e, 500);

        }

    }
    //
}
