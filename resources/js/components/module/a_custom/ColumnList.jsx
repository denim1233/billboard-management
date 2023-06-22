import { ActionBTN, EditBTN, PrintBTN, CHECKBOX } from "../a_custom/Custom";
import Helper from "../../.././utils/Helper.js";

{
    /* 
            Contract Number	
            Branch	
            Lessee	
            Contract 
            Type	
            Slot Type	
            Size	
            Approval Status	
            Interface Status	
            Start Date	
            End Date	
            Date Installed	
            Contract Price	
            Mode of Payment	
            Monthly 
            Rental	
            Brand	
            Material	
            Remarks	
            Transaction Date	
            Approve Date */
}

export const summaryColumns = [
    {
        name: "BRANCH",
        selector: (row) => row.STORE_NAME,
        sortable: true,
    },
    {
        name: "LESSE",
        selector: (row) => row.SUPPLIER_NAME,
        sortable: true,
    },
    {
        name: "CONTRACT TYPE",
        selector: (row) => row.CONTRACT_TYPE,
        sortable: true,
    },
    {
        name: "SIZE",
        selector: (row) => row.SLOT_SIZE,
        sortable: true,
    },
    {
        name: "APPROVAL STATUS",
        selector: (row) => row.ATTRIBUTE1,
        sortable: true,
    },
    {
        name: "Interface Status",
        selector: (row) => row.PROCESS_FLAG,
        sortable: true,
    },
    {
        name: "Start Date",
        selector: (row) => row.CONTRACT_START_DATE,
        sortable: true,
    },
    {
        name: "End Date",
        selector: (row) => row.CONTRACT_END_DATE,
        sortable: true,
    },
    {
        name: "Date Installed",
        selector: (row) => row.DATE_INSTALLED,
        sortable: true,
    },
    {
        name: "Contract Price",
        selector: (row) => row.CONTRACT_PRICE,
        sortable: true,
    },
    {
        name: "Mode of Payment",
        selector: (row) => row.MODE_OF_PAYMENT,
        sortable: true,
    },
    {
        name: "Monthly",
        selector: (row) => row.MONTHLY_RENTAL,
        sortable: true,
    },
    {
        name: "Brand",
        selector: (row) => row.BRAND,
        sortable: true,
    },
    {
        name: "Material",
        selector: (row) => row.MATERIAL,
        sortable: true,
    },
    {
        name: "Remarks",
        selector: (row) => row.REMARKS,
        sortable: true,
    },
    {
        name: "Transaction Date",
        selector: (row) => row.CREATION_DATE,
        sortable: true,
    },
    {
        name: "Approve Date",
        selector: (row) => row.LAST_UPDATE_DATE,
        sortable: true,
    },
];

export const contractColumns = [
    {
        name: "CONTRACT NUMBER",
        selector: (row) => row.contract_number,
        sortable: true,
    },
    {
        name: "NEW/RENEW",
        selector: (row) => row.isNew,
        sortable: true,
    },
    {
        name: "CONTRACT TYPE",
        selector: (row) => row.contract_type,
        sortable: true,
    },
    {
        name: "BRANCH",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        name: "TYPE",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        name: "SIZE",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        name: "LESSEE",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
    {
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
];

export const contractToRenewList = [
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
    },
    {
        id: "New/Renew",
        content: "New/Renew",
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
    },
    {
        id: "Contract Type",
        content: "Contract Type",
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        id: "Lessee",
        content: "Lessee",
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        id: "Mode Of Payment",
        content: "Mode Of Payment",
        name: "Mode Of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
    },
    {
        id: "Date Installed",
        content: "Date Installed",
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
    },
    {
        id: "Number of Months",
        content: "Number of Months",
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
    },
    {
        id: "Monthly Rental",
        content: "Monthly Rental",
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
    },
    {
        id: "Contract Price",
        content: "Contract Price",
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
    },
    {
        id: "Material",
        content: "Material",
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
    },
    {
        id: "Terms Of Contract",
        content: "Terms Of Contract",
        name: "Terms Of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
    },
    {
        id: "Remarks",
        content: "Remarks",
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
    },
    {
        id: "Contract Status",
        content: "Contract Status",
        name: "Contract Status",
        selector: (row) => row.contract_status,
        sortable: true,
    },
];

export const forRenewalColumns = [
    {
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
    },
    {
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
    },
    {
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
    },
    {
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
    {
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        name: "Mode Of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
    },
    {
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
    },
    {
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
    },
    {
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
    },
    {
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
    },
    {
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
    },
    {
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
    },
    {
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
    },
    {
        name: "Terms of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
    },
    {
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
    },
];

export const contractModifyColumns = [
    {
        name: "CONTRACT NUMBER",
        selector: (row) => row.contract_number,
        sortable: true,
    },
    {
        name: "NEW/RENEW",
        selector: (row) => row.isNew,
        sortable: true,
    },
    {
        name: "CONTRACT TYPE",
        selector: (row) => row.contract_type,
        sortable: true,
    },
    {
        name: "BRANCH",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        name: "TYPE",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        name: "SIZE",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        name: "LESSEE",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
    {
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => {
            let url =
                row.contract_type_id == 3
                    ? "/modification/inhouse/"
                    : "/modification/lease/";
            return <EditBTN editURL={url + row.id} />;
        },
    },
];

// for numbers
// right:true
export const createSlotColumns = [
    {
        id: "Id",
        content: "Id",
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        omit: true,
    },
    {
        id: "Contract Id",
        content: "Contract Id",
        name: "Contract Id",
        selector: (row) => row.contract_id,
        sortable: true,
        omit: true,
    },
    {
        id: "Slot Number",
        content: "Slot Number",
        name: "Slot Number",
        selector: (row) => row.slot_number,
        sortable: true,
        width: "120px",
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "120px",
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.contract_brand,
        sortable: true,
        width: "120px",
    },
    {
        id: "Slot Status",
        content: "Slot Status",
        name: "Slot Status",
        selector: (row) => row.status_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "120px",
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "120px",
    },
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
        width: "150px",
    },
];

export const slotColumns = [
    {
        id: "ID",
        content: "ID",
        name: "ID",
        selector: (row) => row.slot_id,
        sortable: true,
        omit: true,
    },

    {
        id: "SLOT NUMBER",
        content: "SLOT NUMBER",
        name: "SLOT NUMBER",
        selector: (row) => row.slot_number,
        sortable: true,
    },
    {
        id: "BRANCH",
        content: "BRANCH",
        name: "BRANCH",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        id: "TYPE",
        content: "TYPE",
        name: "TYPE",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        id: "SIZE",
        content: "SIZE",
        name: "SIZE",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        id: "BRAND",
        content: "BRAND",
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        id: "SLOT STATUS",
        content: "SLOT STATUS",
        name: "SLOT STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
];

export const slotHistoryColumns = [
    {
        name: "SLOT NUMBER",
        selector: (row) => row.slot_number,
        sortable: true,
    },
    {
        name: "BRANCH",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        name: "TYPE",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        name: "SIZE",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        name: "Removal Remarks",
        selector: (row) => row.remarks,
        sortable: true,
    },
    {
        name: "Deleted By",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "Delete Date Time",
        selector: (row) => row.updated_at,
        sortable: true,
    },
];

export const roleColumns = [
    {
        name: "ROLE NAME",
        selector: (row) => row.fullname,
        sortable: true,
    },
    {
        name: "DESCRIPTION",
        selector: (row) => row.username,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"account/role/edit/"}
                editData={JSON.stringify([{}])}
            />
        ),
    },
];
// https://react-data-table-component.netlify.app/?path=/docs/columns-omit-dynamically--omit-dynamically

export const dashboardColumns = [
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        width: "120px",
        reorder: true,
    },
    {
        id: "New/Renew",
        content: "New/Renew",
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
        width: "120px",
        reorder: true,
    },
    {
        id: "Contract Type",
        content: "Contract Type",
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
        width: "120px",
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "120px",
    },
    {
        id: "Lesse",
        content: "Lesse",
        name: "Lesse",
        selector: (row) => row.vendor_name,
        sortable: true,
        width: "300px",
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Mode of Payment",
        content: "Mode of Payment",
        name: "Mode of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Installed",
        content: "Date Installed",
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
        width: "120px",
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "120px",
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "120px",
    },
    {
        id: "Number of Months",
        content: "Number of Months",
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
        width: "150px",
    },
    {
        id: "Monthly Rental",
        content: "Monthly Rental",
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Contract Price",
        content: "Contract Price",
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
        width: "120px",
    },
    {
        id: "Material",
        content: "Material",
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
        width: "120px",
    },
    {
        id: "Terms Of Contract",
        content: "Terms Of Contract",
        name: "Terms Of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
        width: "140px",
    },
    {
        id: "Remarks",
        content: "Remarks",
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
        width: "150px",
    },
    {
        id: "Created By",
        content: "Created By",
        name: "Created By",
        selector: (row) => row.created_by,
        sortable: true,
        width: "200px",
    },
    {
        id: "Date Created",
        content: "Date Created",
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "200px",
    },
    {
        id: "Approval Status",
        content: "Approval Status",
        name: "Approval Status",
        selector: (row) => row.approval_status,
        sortable: true,
        width: "200px",
    },
    {
        id: "Approved/Returned By",
        content: "Approved/Returned By",
        name: "Approved/Returned By",
        selector: (row) => row.updated_by,
        sortable: true,
        width: "200px",
    },
    {
        id: "Date Approved/Returned",
        content: "Date Approved/Returned",
        name: "Date Approved/Returned",
        selector: (row) => row.updated_at,
        sortable: true,
        width: "200px",
    },
    {
        id: "Contract Status",
        content: "Contract Status",
        name: "Contract Status",
        selector: (row) => row.contract_status,
        sortable: true,
        width: "200px",
    },
    {
        id: "Printed By",
        content: "Printed By",
        name: "Printed By",
        selector: (row) => row.printed_by,
        sortable: true,
        width: "200px",
    },
    {
        id: "Date Printed",
        content: "Date Printed",
        name: "Date Printed",
        selector: (row) => row.printed_at,
        sortable: true,
        width: "200px",
    },
    {
        id: "Parent Contract Number",
        content: "Parent Contract Number",
        name: "Parent Contract Number",
        selector: (row) => row.parent_number,
        sortable: true,
        width: "200px",
    },
];

export const approvedColumns = [
    {
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
        width: "150px",
    },
    {
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
        width: "120px",
    },
    {
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
        width: "150px",
    },
    {
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "150px",
    },
    {
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Mode Of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
        width: "150px",
    },
    {
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
        width: "150px",
    },
    {
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "150px",
    },
    {
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "150px",
    },
    {
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
        width: "150px",
    },
    {
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
        width: "150px",
    },
    {
        name: "Terms of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
        width: "150px",
    },
    {
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
        width: "150px",
    },
    {
        name: "Created By",
        selector: (row) => row.created_by,
        sortable: true,
        width: "150px",
    },
    {
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "150px",
    },
    {
        name: "Approved By",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "Approved Date",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "Contract Status",
        selector: (row) => row.contract_status,
        sortable: true,
    },
    {
        name: "Printed By",
        selector: (row) => row.printed_by,
        sortable: true,
        width: "150px",
    },
    {
        name: "Date Printed",
        selector: (row) => row.printed_at,
        sortable: true,
        width: "150px",
    },
    {
        name: "Parent Contract Number",
        selector: (row) => row.parent_number,
        sortable: true,
        width: "150px",
    },
    {
        name: "ACTIONS",
        cell: (row) => {
            return <PrintBTN onClick={printContract} />;
        },
    },
];

export const forModificationColumns = [
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
        width: "150px",
    },
    {
        id: "New/Renew",
        content: "New/Renew",
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
        width: "120px",
    },
    {
        id: "Contract Type",
        content: "Contract Type",
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
        width: "120px",
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "120px",
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "120px",
    },
    {
        id: "Lessee",
        content: "Lessee",
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
        width: "200px",
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Mode of Payment",
        content: "Mode of Payment",
        name: "Mode of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Installed",
        content: "Date Installed",
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Number of Months",
        content: "Number of Months",
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
        width: "150px",
    },
    {
        id: "Monthly Rental",
        content: "Monthly Rental",
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Contract Price",
        content: "Contract Price",
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Material",
        content: "Material",
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
    },
    {
        id: "Terms of Contract",
        content: "Terms of Contract",
        name: "Terms of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
        width: "150px",
    },
    {
        id: "Remarks",
        content: "Remarks",
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
        width: "150px",
    },
    {
        id: "Created By",
        content: "Created By",
        name: "Created By",
        selector: (row) => row.created_by,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Created",
        content: "Date Created",
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "150px",
    },
    {
        id: "Returned By",
        content: "Returned By",
        name: "Returned By",
        selector: (row) => row.updated_by,
        sortable: true,
        width: "150px",
    },
    {
        id: "Returned Date",
        content: "Returned Date",
        name: "Returned Date",
        selector: (row) => row.updated_at,
        sortable: true,
        width: "150px",
    },
    {
        id: "Return Remarks",
        content: "Return Remarks",
        name: "Return Remarks",
        selector: (row) => row.return_remarks,
        sortable: true,
        width: "150px",
    },
    {
        id: "Actions",
        content: "Actions",
        name: "Actions",
        cell: (row) => {
            let url =
                row.contract_type_id == 3
                    ? "/modification/inhouse/"
                    : "/modification/lease/";
            return <EditBTN editURL={url + row.id} />;
        },
    },
];

export const submittedApproverColumns = [
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
        width: "150px",
    },
    {
        id: "New/Renew",
        content: "New/Renew",
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
        width: "150px",
    },
    {
        id: "Contract Type",
        content: "Contract Type",
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
        width: "150px",
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "150px",
    },
    {
        id: "Lessee",
        content: "Lessee",
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
        width: "200px",
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Mode Of Payment",
        content: "Mode Of Payment",
        name: "Mode Of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
    },
    {
        id: "Date Installed",
        content: "Date Installed",
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Number of Months",
        content: "Number of Months",
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
        width: "150px",
    },
    {
        id: "Monthly Rental",
        content: "Monthly Rental",
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Contract Price",
        content: "Contract Price",
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Material",
        content: "Material",
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
        width: "150px",
    },
    {
        id: "Terms of Contract",
        content: "Terms of Contract",
        name: "Terms of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
        width: "150px",
    },
    {
        id: "Remarks",
        content: "Remarks",
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
        width: "150px",
    },
    {
        id: "Created By",
        content: "Created By",
        name: "Created By",
        selector: (row) => row.created_by,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Created",
        content: "Date Created",
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "150px",
    },
    {
        id: "Contract Status",
        content: "Contract Status",
        name: "Contract Status",
        selector: (row) => row.contract_status,
        sortable: true,
        width: "150px",
    },
];

export const submittedCreatorColumns = [
    {
        id: "Contract Number",
        content: "Contract Number",
        name: "Contract Number",
        selector: (row) => row.contract_number,
        sortable: true,
        width: "150px",
    },
    {
        id: "New/Renew",
        content: "New/Renew",
        name: "New/Renew",
        selector: (row) => row.isNew,
        sortable: true,
        width: "150px",
    },
    {
        id: "Contract Type",
        content: "Contract Type",
        name: "Contract Type",
        selector: (row) => row.contract_type,
        sortable: true,
        width: "150px",
    },
    {
        id: "Branch",
        content: "Branch",
        name: "Branch",
        selector: (row) => row.branch_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Type",
        content: "Type",
        name: "Type",
        selector: (row) => row.type_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Size",
        content: "Size",
        name: "Size",
        selector: (row) => row.size,
        sortable: true,
        width: "150px",
    },
    {
        id: "Lessee",
        content: "Lessee",
        name: "Lessee",
        selector: (row) => row.vendor_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Brand",
        content: "Brand",
        name: "Brand",
        selector: (row) => row.brand_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Mode Of Payment",
        content: "Mode Of Payment",
        name: "Mode Of Payment",
        selector: (row) => row.payment_name,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Installed",
        content: "Date Installed",
        name: "Date Installed",
        selector: (row) => row.installation_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Start Date",
        content: "Start Date",
        name: "Start Date",
        selector: (row) => row.start_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "End Date",
        content: "End Date",
        name: "End Date",
        selector: (row) => row.end_date,
        sortable: true,
        width: "150px",
    },
    {
        id: "Number of Months",
        content: "Number of Months",
        name: "Number of Months",
        selector: (row) => row.number_of_months,
        sortable: true,
        width: "150px",
    },
    {
        id: "Monthly Rental",
        content: "Monthly Rental",
        name: "Monthly Rental",
        selector: (row) => Helper.toCurrency(row.monthly_rental),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Contract Price",
        content: "Contract Price",
        name: "Contract Price",
        selector: (row) => Helper.toCurrency(row.contract_price),
        sortable: true,
        right: true,
        width: "150px",
    },
    {
        id: "Material",
        content: "Material",
        name: "Material",
        selector: (row) => row.material,
        sortable: true,
        width: "150px",
    },
    {
        id: "Terms Of Contract",
        content: "Terms Of Contract",
        name: "Terms Of Contract",
        selector: (row) => row.terms_of_contract,
        sortable: true,
        width: "150px",
    },
    {
        id: "Remarks",
        content: "Remarks",
        name: "Remarks",
        selector: (row) => row.remarks,
        sortable: true,
        width: "150px",
    },
    {
        id: "Created By",
        content: "Created By",
        name: "Created By",
        selector: (row) => row.created_by,
        sortable: true,
        width: "150px",
    },
    {
        id: "Date Created",
        content: "Date Created",
        name: "Date Created",
        selector: (row) => row.created_at,
        sortable: true,
        width: "150px",
    },
    {
        id: "Contract Status",
        content: "Contract Status",
        name: "Contract Status",
        selector: (row) => row.contract_status,
        sortable: true,
        width: "150px",
    },
    {
        id: "Actions",
        content: "Actions",
        name: "Actions",
        cell: (row) => {
            let url =
                row.contract_type_id == 3
                    ? "/modification/inhouse/"
                    : "/modification/lease/";
            return <EditBTN editURL={url + row.id} />;
        },
    },
];

// mode_of_payment
// remarks
// contract_price
// monthly_rental
// contract price
// material
// terms_of_contract
// remarks
// created_by
// created_at
// approval_status
// updated_by
// updated_at
// contract_status
// printed_by
// printed_at
// parent_number

// contract create columns
// slot number
// branch
// type
// size
// brand
// slot status
// start date
// end date
// contract number
