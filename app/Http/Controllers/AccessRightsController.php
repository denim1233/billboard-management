<?php

namespace App\Http\Controllers;
use App\Models\AccessRights;
use App\Models\Modules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccessRightsController extends Controller
{
    public function getAccessRights()
    {
        try {

            $data =  Modules::select(
                'cms_modules.id as module_id',
                DB::raw('(SELECT allow_view from cms_access_rights where role_id = 2 and module_id = cms_modules.id) AS creator'),
                DB::raw('(SELECT allow_view from cms_access_rights where role_id = 1 and module_id = cms_modules.id) AS approver'),
                DB::raw('(SELECT allow_view from cms_access_rights where role_id = 3 and module_id = cms_modules.id) AS admin'),
                'module_name'
            )
            // ->orderBy('cms_modules.display_order', 'asc')
            ->get();
            

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function routeGuard(Request $request){
        try {

            $data =  AccessRights::select('allow_view','allow_edit')
             -> join('cms_modules', 'cms_modules.id', '=', 'cms_access_rights.module_id')
            ->where('cms_access_rights.role_id', $request->role_id)
            ->where('cms_modules.api_link', $request->api_link)
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
            $rights = AccessRights::updateOrCreate([
                'module_id'   => $data['module_id'],
                'role_id'   => $data['role_id']
            ],[
                'allow_edit'     => $data['allow_edit'],
                'allow_view'     => $data['allow_view']
            ]);

            $lastInsertId = $rights->id;
            return response(["id" => $lastInsertId, "status" => true], 200);

        } catch (\Exception $e) {

                return response($e, 500);

        }
            
    }


}
