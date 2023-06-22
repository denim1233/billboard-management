<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\AccessRights;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\JsonResponse;
use Auth;
use Illuminate\Http\Response;
use Cookie;

class UserController extends Controller
{

    public function getRights($roleid){

        try {

        $rights = AccessRights::select(
            'module_id',
            'role_id',
            'allow_view',
            'allow_edit'
        )
        ->where('role_id', $roleid )
        ->get();

        return response(["rights" =>$rights , "message" => 'get data sucess'], 200);

        } catch (\Exception $e) {

            return response($e, 500);

        }

    }

    public function AuthenticateUser(Request $request){

        try {
          
            if (Auth::attempt(['keycloak_id' => $request['keycloak_id'], 'password' => 'secret', 'status_id' => 1])){

                $minutes = 60;
                $response = new Response(["full_name" => Auth::user()->full_name,"role_id" => Auth::user()->role_id,"status_id" => 1, "message" => 'login success'], 200);
                $response->withCookie(cookie('full_name', Auth::user()->full_name, $minutes));
                $response->withCookie(cookie('user_id', Auth::user()->id, $minutes));
                $response->withCookie(cookie('role_id', Auth::user()->role_id, $minutes));
                return $response;

            }else{

                return response(["status_id" => 0, "message" => 'access not found'], 200);

            }

        } catch (\Exception $e) {

            return response($e, 500);

        }

    }

    public function LogoutUser(){

        try {

        Auth::logout();

            return response(["status_id" => 1, "message" => 'logout successfull'], 200);

        } catch (\Exception $e) {

            return response($e, 500);

        }

    }
    
    public function get($keycloakid = null)
    {
        try {

            $keyCloakUsers = DB::connection('mysql2')
            ->table('user_entity')
            ->select(
                    'username as employee_number',
                    'ID',
                    'EMAIL',
                    'FIRST_NAME',
                    'LAST_NAME',
                    'USERNAME',
                    'assigned_store',
                    'job_description'
                    )
                    ->join(DB::connection('mysql2')->raw('(SELECT
                            user_attribute.USER_ID,
                            MAX(case when NAME = "department" then VALUE end)  as departments,
                            MAX(case when NAME = "department_id" then VALUE end)  as department_id,
                            MAX(case when NAME = "job_desc" then VALUE end)  as job_description,
                            MAX(case when NAME = "job_id" then VALUE end)  as job_code,
                            MAX(case when NAME = "org_code" then VALUE end)  as org_code,
                            MAX(case when NAME = "org_id" then VALUE end)  as store_id,
                            MAX(case when NAME = "org_name" then VALUE end)  as assigned_store,
                            MAX(case when NAME = "origin" then VALUE end)  as origin,
                            MAX(case when NAME = "position_id" then VALUE end)  as position_id,
                            id as keycloak_id
                        from keycloak.`user_attribute` 
                        where VALUE = "HEAD OFFICE"
                        GROUP BY  user_attribute.USER_ID
                    )
                    USER_ATTRIBUTES'), 
             function($join)
             {
                $join->on('user_entity.ID', '=', 'USER_ATTRIBUTES.USER_ID');
             })
            ->where('assigned_store', 'HEAD OFFICE' )
            ->whereRaw('ID = IFNULL(?, ID)', [$keycloakid])
            ->get()->toArray();

            $CCMS_USERS = User::select(
                'users.id',
                'keycloak_id',
                'users.status_id',
                'role_id',
                'role_name',
                'users.status_id',
                'status_name',
                'users.created_at',
                DB::raw('(SELECT full_name from users where id = users.created_by) AS created_by'),
                'users.updated_at',
                DB::raw('(SELECT full_name from users where id = users.updated_by) AS updated_by')
            )
            ->join('cms_roles', 'cms_roles.id', '=', 'users.role_id')
            ->join('cms_status', 'cms_status.id', '=', 'users.status_id')
            ->get()->toArray();

            $combined = array();
            foreach ($keyCloakUsers as $arr) {
                    $comb = array(
                                    'keycloak_id' => $arr->ID,
                                    'username' => $arr->USERNAME,
                                    'email' => $arr->EMAIL,
                                    'created_at' => '',
                                    'created_by' => '',
                                    'updated_at'=> '',
                                    'updated_by' => '',
                                    'first_name' => $arr->FIRST_NAME, 'last_name' => $arr->LAST_NAME,'middle_name' => ' ',
                                    'full_name' => $arr->FIRST_NAME.' '.$arr->LAST_NAME,
                                    'job_description' =>$arr->job_description,
                                    'role_name' => '', 'role_id' => '',
                                    'status_name' => '', 'status_id' => '');
                    foreach ($CCMS_USERS as $arr2) {
                        if ( $arr2['keycloak_id'] == $arr->ID) {
                            $comb['role_name'] = $arr2['role_name'];
                            $comb['role_id'] = $arr2['role_id'];
                            $comb['status_name'] = $arr2['status_name'];
                            $comb['status_id'] = $arr2['status_id'];
                            $comb['created_at'] = $arr2['created_at'];
                            $comb['created_by'] = $arr2['created_by'];
                            $comb['updated_at'] = $arr2['updated_at'];
                            $comb['updated_by'] = $arr2['updated_by'];
                            break;
                        }

                    }
                $combined[] = $comb;
            }

            $newString = mb_convert_encoding($combined, "UTF-8", "auto");
            return response()->json($newString);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

        try {

            $data = $request->all();
            $statusId = isset($data['status_id']) ? $data['status_id']:  1;

            $user = user::updateOrCreate([
                'keycloak_id'   => $data['keycloak_id'],
            ],[
                "keycloak_id" => $data['keycloak_id'],
                "status_id" => 1,
                "password" => '$2a$10$6lcXntC8CS3TdYG.yJIKT.T3wyMvcVcCGCQuPEJB8S/JgKsXXJUwC' ,
                "username" => $data['username'] ,
                "role_id" => $data['role_id'],
                "full_name" => $data['full_name']            ]);

            return response(["keycloak_id" =>  $data['keycloak_id'], "status" => true], 200);

        } catch (\Exception $e) {

            return response($e, 500);

        }

    }

    //
}
