<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UomController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SlotController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\TermsController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\AccessRightsController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\ModeOfPaymentController;
use App\Http\Controllers\ContractHeaderController;
use App\Http\Controllers\CookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['api']], function () {
    Route::get("/getBranch", [BranchController::class, "get"]);
    Route::post("/manageBranch", [BranchController::class, "manage"]);
    Route::get("/getBrand", [BrandController::class, "get"]);
    Route::post("/manageBrand", [BrandController::class, "manage"]);
    Route::get("/getMode/{modeid?}", [ModeOfPaymentController::class, "get"]);
    Route::post("/manageMode", [ModeOfPaymentController::class, "manage"]);
    Route::get("/getRental/{rentalid?}", [RentalController::class, "get"]);
    Route::post("/manageRental", [RentalController::class, "manage"]);
    Route::get("/getRole/{id?}", [RoleController::class, "get"]);
    Route::post("/manageRole", [RoleController::class, "manage"]);
    Route::get("/getSlot/{slotid?}", [SlotController::class, "get"]);
    Route::get("/getCreateSlot/{slotid?}", [SlotController::class, "getCreateSlot"]);
    Route::post("/manageSlot", [SlotController::class, "manage"]);
    Route::post("/deleteSlot", [SlotController::class, "delete"]);
    Route::post("/editSlot", [SlotController::class, "edit"]);
    Route::get("/getStatus/{type?}", [StatusController::class, "get"]);

    Route::get("/getType/{typeid?}", [TypeController::class, "get"]);
    Route::post("/manageType", [TypeController::class, "manage"]);
    Route::get("/getUom", [UomController::class, "get"]);
    Route::get("/getTypeSize/{id}", [TypeController::class, "getSize"]);
    Route::get("/manageTypeSize", [TypeController::class, "manageSize"]);
    Route::get("/getContract", [ContractController::class, "get"]);
    Route::post("/manageContract", [ContractController::class, "manage"]);
    Route::get("/getContractStatus", [ContractController::class, "getContractStatus"]);
    Route::get("/getVendor", [VendorController::class, "get"]);

    //try to merge with table of sso the employeeid 
    Route::get("/getUser/{keycloakid?}", [UserController::class, "get"]);
    Route::get("/getDashboard", [ResourcesController::class, "getDashboard"]);
    Route::get("/getAllParameter", [ResourcesController::class, "getAllParameter"]);
    Route::get("/getLeaseParameter", [ResourcesController::class, "getLeaseParameter"]);
    Route::get("/getSlotParameter", [ResourcesController::class, "getSlotParameter"]);
    Route::get("/getAccessRights", [AccessRightsController::class, "getAccessRights"]);
    Route::post("/manageAccessRights", [AccessRightsController::class, "manage"]);
    Route::post("/changeContractStatus", [ContractController::class, "changeStatus"]);

    Route::post("/manageUser", [UserController::class, "manage"]);

    Route::post("/authenticateUser", [UserController::class, "AuthenticateUser"]);
    Route::post("/logoutUser", [UserController::class, "LogoutUser"]);

    Route::get("/getHeaderContract", [ContractHeaderController::class, "get"]);
    Route::post("/manageHeaderContract", [ContractHeaderController::class, "manage"]);
    Route::get("/printContract", [ContractController::class, "printContract"]);

    // get users load data from keycloak database
    // http://192.168.4.44:8000/api/key_cloak_users.php

    Route::post("/middleware", [AccessRightsController::class, "routeGuard"]);

    Route::get("/get-terms",[TermsController::class,"get_terms"])->name("get_terms");
    Route::post("/edit-terms",[TermsController::class,"edit_terms"])->name("edit_terms");

    Route::get("/getRights/{roleid}",[UserController::class,"getRights"]);

    Route::get('/cookie/set',[CookieController::class,"setCookie"]);
    Route::get('/cookie/get',[CookieController::class,"getCookie"]);
    
});

