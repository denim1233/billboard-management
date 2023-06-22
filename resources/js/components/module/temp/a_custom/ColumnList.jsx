
export const contractColumns = [
    {
        name:'CONTRACT NUMBER',
        selector: (row) => row.slot_number,
        sortable:true,
        
    },
    {
        name:'NEW/RENEW',
        selector: (row) => row.isNew,
        sortable:true,
    },
    {
        name:'CONTRACT TYPE',
        selector: (row) => row.contract_type,
        sortable:true,
    },
    {
        name:'BRANCH',
        selector: (row) => row.branch_name,
        sortable:true
    },
    {
        name:'TYPE',
        selector: (row) => row.type_name,
        sortable:true,
    },
    {
        name:'SIZE',
        selector: (row) => row.size,
        sortable:true,
    },
    {
        name:'LESSEE',
        selector: (row) => row.vendor_name,
        sortable:true,
    },
    {
        name:'BRAND',
        selector: (row) => row.brand_name,
        sortable:true,
    },
]



export const slotColumns = [

    {
        name:'SLOT NUMBER',
        selector: (row) => row.slot_number,
        sortable:true,
        
    },
    {
        name:'BRANCH',
        selector: (row) => row.branch_name,
        sortable:true,
    },
    {
        name:'TYPE',
        selector: (row) => row.type_name,
        sortable:true,
    },
    {
        name:'SIZE',
        selector: (row) => row.size,
        sortable:true
    },
    {
        name:'BRAND',
        selector: (row) => row.brand_name,
        sortable:true,
    },
    {
        name:'SLOT STATUS',
        selector: (row) => row.status_name,
        sortable:true,
    }
]
