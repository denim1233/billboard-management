<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;

class BrandController extends Controller
{

    public function get()
    {
        try {

        $data =  Brand::select(
            'cms_brand.id',
            'brand_name',
            'status_id',
            'status_name',
            'created_at',
            'created_by',
            'updated_at',
            'updated_by'
        )
            ->join('cms_status', 'cms_status.id', '=', 'cms_brand.status_id')
            ->orderBy('brand_name', 'asc')
            ->get()
            ->map(function ($data) {
                $data->brand_name = str_replace('?', 'Ñ', $data->brand_name);
                return $data;
            });
            ;

            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }

    public function manage(Request $request){

        try {
            $data = $request->all();
            // dd($data);

                $lastInsertId = 0;
                $brand = Brand::updateOrCreate([
                    'id'   => $data[0]['id'],
                ],[
                    'brand_name'     => $data[0]['brand_name'],
                    'status_id'   => $data[0]['status_id']
                ]);

                $lastInsertId = $brand->id;
                return response(["id" => $lastInsertId, "status" => true], 200);

            
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
