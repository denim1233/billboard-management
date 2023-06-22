import axios from "axios";

export class API {
    static get_ora_contracts =
        "http://192.168.4.44:8000/api/ccms/AdminController.php";
    static get_contract_parameters = "/api/getAllParameter";
    static get_lease_parameters = "/api/getLeaseParameter";
    static get_boxIcon_data = "/api/getDashboard";
    static get_contract_url = "/api/getContract";
    static get_renewal_url = "/api/getContract";
    static get_for_renewal_url = "/api/getContract";
    static manage_contract_url = "/api/manageContract";
    static changeStatus_contract_url = "/api/changeContractStatus";

    static get_slot_parameters = "/api/getSlotParameter";
    static get_slot_url = "/api/getSlot";
    static get_createSlot_url = "/api/getCreateSlot";

    static manage_slot_url = "/api/manageSlot";
    static delete_slot_url = "/api/deleteSlot";
    static get_brand_url = "/api/getBrand";
    static manage_brand_url = "/api/manageBrand";

    static get_branch_url = "/api/getBranch";
    static manage_branch_url = "/api/manageBranch";

    static get_payment_url = "/api/getMode";
    static manage_payment_url = "/api/manageMode";

    static get_rental_url = "/api/getRental";
    static manage_rental_url = "/api/manageRental";

    static get_type_url = "/api/getType";
    static manage_type_url = "/api/manageType";

    static get_size_url = "/api/getTypeSize/";
    static get_size_url = "/api/getTypeSize/";

    static get_uom_url = "/api/getUom";

    static get_user_url = "/api/getUser";
    static manage_user_url = "/api/manageUser";

    static get_role_url = "/api/getRole";
    static manage_role_url = "/api/manageRole";

    static get_user_access_url = "/api/getAccessRights";
    static manage_user_access_url = "/api/manageAccessRights";
}
