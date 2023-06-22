<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use App\Models\Brand;
use App\Models\Vendor;
use App\Models\Type;
use App\Models\Contract;
use App\Models\ContractHeader;
use App\Models\Status;
use App\Models\ModeOfPayment;
use App\Models\Rental;
use Illuminate\Support\Facades\DB;

class ResourcesController extends Controller
{

    public function getDashboard(){

        try {

        $submitted = Contract::where('approval_status', '=', 10)->get()->count();
        $modification = Contract::where('approval_status', '=', 11)->get()->count();
        $approved = Contract::where('approval_status', '=', 6)->get()->count();
        $renew = Contract::where('is_new', '=', 9)->get()->count();
        $printed = Contract::where('is_printed', '=', 1)->get()->count();
  

        return response(
            
            [
            "submitted" => $submitted, 
            "modification" => $modification,
            "new" => $approved, "renew" => $renew,
            "printed" => $printed
            ], 200);

    } catch (\Exception $e) {

        return response($e, 500);

    }
}

public function getAllParameter(){

    try {
        $contractNumber = Contract::select('contract_number')->where('status_id', '!=', 14)->where('contract_number', '!=', '')->orderBy('contract_number', 'asc')->get();
        $parentNumber = ContractHeader::select('parent_number')->orderBy('parent_number', 'asc')->get();
        $contractStatus = Status::where('type', '=', 1)->get();
        $approvalStatus = Status::where('type', '=', 2)->get();
        $contractType = Status::where('type', '=', 3)->get();
        $newrenew = Status::where('type', '=', 4)->get();
        $type = Type::select('id',DB::raw('UPPER(type_name) type_name'))->where('status_id', '=', 1)->orderBy('type_name', 'asc')->get();
        $branch = Branch::where('status_id', '=', 1)->orderBy('branch_name', 'asc')->get();
        $brand = Brand::where('status_id', '=', 1)
                ->orderBy('brand_name', 'asc')
                ->get()
                ->map(function ($data) {
                    $data->brand_name = str_replace('?', 'Ñ', $data->brand_name);
                    return $data;
                });
                
        $lesse = Vendor::select('id','vendor_name')
                ->where('vendor_name', 'not like', "%DO NOT USE%")
                ->orderBy('vendor_name', 'asc')
                ->distinct()
                ->get()
                ->map(function ($data) {
                    $data->vendor_name = str_replace('?', 'Ñ', $data->vendor_name);
                    return $data;
                });
                ;

        return response(
                
            [
            "newRenew" => $newrenew, 
            "contractType" => $contractType,
            "approvalStatus" => $approvalStatus, 
            "contractStatus" => $contractStatus,
            "type" => $type,
            "brand" => $brand,
            "branch" => $branch,
            "lesse" => $lesse,
            "contractNumber" => $contractNumber,
            "parentNumber" => $parentNumber
            ]
            , 200);

    } catch (\Exception $e) {

        return response($e, 500);

    }

}

public function getLeaseParameter(){

    try {
        $type = Type::select('id',DB::raw('UPPER(type_name) type_name'))->where('status_id', '=', 1)->get();
        $brand = Brand::where('status_id', '=', 1)
                ->orderBy('brand_name', 'asc')
                ->get()
                ->map(function ($data) {
                    $data->brand_name = str_replace('?', 'Ñ', $data->brand_name);
                    return $data;
                });
                ;
        $lesse = Vendor::select('id','vendor_name')
                ->where('vendor_name', 'not like', "%DO NOT USE%")
                ->orderBy('vendor_name', 'asc')
                ->distinct()
                ->get()
                ->map(function ($data) {
                    $data->vendor_name = str_replace('?', 'Ñ', $data->vendor_name);
                    return $data;
                });
                ;
        $modepayment = ModeOfPayment::where('status_id', '=', 1)->orderBy('mode_of_payment', 'asc')->get();
        $rental = Rental::select('id',DB::raw('format(monthly_rental,0) monthly_rental'))->where('status_id', '=', 1)->get();
        $branch = Branch::where('status_id', '=', 1)->orderBy('branch_name', 'asc')->get();

        return response(
                
            [
            "type" => $type,
            "brand" => $brand,
            "lesse" => $lesse,
            "modeofpayment" => $modepayment,
            "branch" => $branch,
            "rental" => $rental
            ]
            , 200);

    } catch (\Exception $e) {

        return response($e, 500);

    }

}

public function getSlotParameter(){

    try {
        
        $type = Type::where('status_id', '=', 1)->orderBy('type_name', 'asc')->get();
        $brand = Brand::where('status_id', '=', 1)
        ->orderBy('brand_name', 'asc')
        ->get()
        ->map(function ($data) {
            $data->brand_name = str_replace('?', 'Ñ', $data->brand_name);
            return $data;
        });
        ;
        $branch = Branch::where('status_id', '=', 1)->orderBy('branch_name', 'asc')->get();
        $status = Status::where('type', '=', 3)->orderBy('status_name', 'asc')->get();

        return response(
                
            [
            "type" => $type,
            "brand" => $brand,
            "branch" => $branch,
            "status" => $status
            ]
            , 200);

    } catch (\Exception $e) {

        return response($e, 500);

    }

}

}
