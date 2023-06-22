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

    public function getRights($roleId){
        try {

        $rights = AccessRights::select(
            'module_id',
            'role_id',
            'allow_view',
            'allow_edit',
            'module_name',
            'api_link',
            'link_title',
            'display_group'
        )
        ->join('cms_modules', 'cms_modules.id', '=', 'cms_access_rights.module_id')
        ->where('role_id', $roleId )
        ->where('allow_view', 1 )
        ->orderBy('cms_modules.display_order', 'asc')
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
                // return response(["status_id" => 1, "message" => 'access not found'], 200);
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

            // DB::table('keycloak_users')
            $CCMS_USERS = DB::table('keycloak_users')->select(
                'keycloak_users.keycloak_id',
                'users.status_id',
                'role_id',
                'role_name',
                'users.status_id',
                'status_name',
                'users.created_at',
                'keycloak_users.username',
                'job_desc as job_description',
                'keycloak_users.email',
                'keycloak_users.first_name',
                'keycloak_users.last_name',
                DB::raw('(SELECT full_name from users where id = users.created_by) AS created_by'),
                'users.updated_at',
                DB::raw('(SELECT full_name from users where id = users.updated_by) AS updated_by'),
                DB::raw("CONCAT(keycloak_users.first_name,' ',keycloak_users.last_name) as full_name")
            )
            ->leftJoin('users', 'users.keycloak_id', '=', 'keycloak_users.keycloak_id')
            ->leftJoin('cms_roles', 'cms_roles.id', '=', 'users.role_id')
            ->leftJoin('cms_status', 'cms_status.id', '=', 'users.status_id')
            ->whereRaw('keycloak_users.keycloak_id = IFNULL(?, keycloak_users.keycloak_id)', [$keycloakid])
            ->get();

            return response()->json($CCMS_USERS);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

        try {

            $data = $request->all();
            $statusId = isset($data['status_id']) ? $data['status_id']:  1;
            $statusId = isset($data['status_id']) ? $data['status_id']:  1;

            $user = user::updateOrCreate([
                'keycloak_id'   => $data['keycloak_id'],
            ],[
                "keycloak_id" => $data['keycloak_id'],
                "status_id" => $statusId ,
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
