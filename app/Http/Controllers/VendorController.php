<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;

class VendorController extends Controller
{
    public function get()
    {
        try {

        // Ñ

        $data =  Vendor::select(
            'id',
            // 'vendor_name',
            DB::raw('REPLACE("vendor_name", "?", "Ñ") AS vendor_name'),
            'creation_date',
            'last_update_date'
        )
            ->where('vendor_name', 'not like', "%DO NOT USE%")
            ->orderBy('vendor_name', 'asc')
            ->get()
            ->map(function ($data) {
                $data->vendor_name = str_replace('?', 'Ñ', $data->vendor_name);
                return $data;
            });
            
            return response()->json($data);

        } catch (\Exception $e) {

            return response($e, 500);

        }
    }
}
