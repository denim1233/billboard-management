import axios from 'axios';

export class API {

    static get_contract_parameters = '/api/getAllParameter';    
    static get_boxIcon_data = '/api/getDashboard';    
    static get_contract_url = '/api/getContract';    
    static get_renewal_url = '/api/getContract/9';    
    static get_for_renewal_url = '/api/getContract/13';    
    
    static get_slot_url = '/api/getSlot';    
    static manage_slot_url = '/api/manageSlot';    
   
    static get_brand_url = '/api/getBrand';    
    static manage_brand_url = '/api/manageBrand';    

    static get_branch_url = '/api/getBranch';    
    static manage_branch_url = '/api/manageBranch';    

    static get_payment_url = '/api/getMode';    
    static manage_payment_url = '/api/manageMode';    

    static get_rental_url = '/api/getRental';    
    static manage_rental_url = '/api/manageRental';    
    
    static get_type_url = '/api/getType';    
    static manage_type_url = '/api/manageType';    
    
    static get_size_url = '/api/getTypeSize/';    
    static manage_size_url = '/api/manageTypeSize';    
    

}