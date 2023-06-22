import { ActionBtns } from "../a_customs/Customs";

import { API } from "./ApiServices";

export const testData = [
    { id: 1, name: "yamaha" },
    { id: 2, name: "honda" },
    { id: 3, name: "toyota" },
    { id: 4, name: "nissan" },
    { id: 5, name: "isuzu" },
    { id: 6, name: "ford" },
    { id: 7, name: "suzuki" },
    { id: 8, name: "kawasaki" },
    { id: 9, name: "motorola" },
    { id: 10, name: "motorstart" },
    { id: 11, name: "motorista" },
    { id: 12, name: "nike" },
    { id: 13, name: "addidas" },
    { id: 14, name: "motorshow" },
    { id: 15, name: "lion" },
    { id: 16, name: "tiger" },
    { id: 17, name: "shark" },
    { id: 18, name: "whale" },
    { id: 19, name: "eagle" },
    { id: 20, name: "motorado" },
    { id: 21, name: "snake" },
    { id: 22, name: "sand" },
    { id: 23, name: "water" },
    { id: 24, name: "coconut" },
    { id: 25, name: "banana" },
    { id: 26, name: "grapes" },
    { id: 27, name: "orange" },
    { id: 28, name: "pomelo" },
    { id: 29, name: "pineaplle" },
    { id: 30, name: "apple" },
];

export const contractColumns = [
    {
        id: "CONTRACT NUMBER",
        content: "CONTRACT NUMBER",
        name: "CONTRACT NUMBER",
        selector: (row) => row.contract_number,
        sortable: true,
    },
    {
        id: "NEW/RENEW",
        content: "NEW/RENEW",
        name: "NEW/RENEW",
        selector: (row) => row.isNew,
        sortable: true,
    },
    {
        id: "CONTRACT TYPE",
        content: "CONTRACT TYPE",
        name: "CONTRACT TYPE",
        selector: (row) => row.type_name,
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
        id: "LESSEE",
        content: "LESSEE",
        name: "LESSEE",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
    {
        id: "BRAND",
        content: "BRAND",
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
];

export const slotColumns = [
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
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        name: "SLOT STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
];

export const editSlotColumns = [
    {
        name: "EDIT SLOT NUMBER",
        cell: (row) => (
            <input
                type="number"
                name={row.id}
                onChange={() => {}}
                className="form-control text-center"
            />
        ),
    },
    {
        name: "CURRENT SLOT NUMBER",
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
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        name: "SLOT STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
];

export const typeColumns = [
    {
        name: "TYPE",
        selector: (row) => row.type_name,
        sortable: true,
    },
    {
        name: "MATERIAL",
        selector: (row) => row.material,
        sortable: true,
    },
    {
        name: "UOM",
        selector: (row) => row.uom_name,
        sortable: true,
    },
    {
        name: "SIZE",
        selector: (row) => row.size,
        sortable: true,
    },
    {
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        name: "DATE CREATED",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        name: "UPDATED BY",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "UPDATED AT",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/type/edit/"}
                deleteURL={API.manage_type_url}
                editData={JSON.stringify([
                    {
                        id: row.id,
                        type_name: row.type_name,
                        material: row.material,
                    },
                ])}
                deleteData={JSON.stringify([
                    {
                        id: row.id,
                        type_name: row.type_name,
                        material: row.material,
                        status_id: row.status_id,
                    },
                ])}
            />
        ),
    },
];

export const brandColumns = [
    {
        name: "BRAND",
        selector: (row) => row.brand_name,
        sortable: true,
    },
    {
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        name: "DATE CREATED",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        name: "UPDATED BY",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "UPDATED DATA & TIME",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/brand/edit/"}
                deleteURL={API.manage_brand_url}
                editData={JSON.stringify([
                    {
                        brand_name: row.brand_name,
                        status_id: row.status_id,
                        id: row.id,
                    },
                ])}
                deleteData={JSON.stringify([
                    {
                        id: row.id,
                        status_id: row.status_id,
                        brand_name: row.brand_name,
                    },
                ])}
            />
        ),
    },
];

export const branchColumns = [
    {
        name: "BRANCH",
        selector: (row) => row.branch_name,
        sortable: true,
    },
    {
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        name: "DATE CREATED",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        name: "UPDATED BY",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "UPDATED DATA & TIME",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/branch/edit/"}
                deleteURL={API.manage_branch_url}
                editData={JSON.stringify([
                    {
                        branch_name: row.branch_name,
                        status_id: row.status_id,
                        id: row.id,
                    },
                ])}
                deleteData={JSON.stringify([
                    {
                        id: row.id,
                        status_id: row.status_id,
                        branch_name: row.branch_name,
                    },
                ])}
            />
        ),
    },
];

export const paymentColumns = [
    {
        name: "MODE OF PAYMENT",
        selector: (row) => row.mode_of_payment,
        sortable: true,
    },
    {
        name: "TERMS OF CONTRACT",
        selector: (row) => row.terms_of_contract,
        sortable: true,
    },
    {
        name: "START DATE",
        selector: (row) => row.start_date,
        sortable: true,
    },
    {
        name: "END DATE",
        selector: (row) => row.end_date,
        sortable: true,
    },
    {
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        name: "UPDATED AT",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        name: "CREATED AT",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/payment/edit/"}
                deleteURL={API.manage_payment_url}
                editData={JSON.stringify([
                    {
                        mode_of_payment: row.mode_of_payment,
                        terms_of_contract: row.terms_of_contract,
                        no_of_months: row.no_of_months,
                        status_id: row.status_id,
                        id: row.id,
                    },
                ])}
                deleteData={JSON.stringify([
                    {
                        id: row.id,
                        status_id: row.status_id,
                        mode_of_payment: row.mode_of_payment,
                        no_of_months: row.no_of_months,
                        terms_of_contract: row.terms_of_contract,
                    },
                ])}
            />
        ),
    },
];

export const rentalColumns = [
    {
        name: "MONTHLY RENTAL",
        selector: (row) => row.monthly_rental,
        sortable: true,
    },
    {
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        name: "DATE CREATED",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        name: "UPDATED BY",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        name: "UPDATED DATA & TIME",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/rental/edit/"}
                deleteURL={API.manage_rental_url}
                editData={JSON.stringify([
                    {
                        monthly_rental: row.monthly_rental,
                        status_id: row.status_id,
                        id: row.id,
                    },
                ])}
                deleteData={JSON.stringify([
                    {
                        id: row.id,
                        status_id: row.status_id,
                        monthly_rental: row.monthly_rental,
                    },
                ])}
            />
        ),
    },
];

export const userColumns = [
    {
        id: "FULLNAME",
        content: "FULLNAME",
        name: "FULLNAME",
        selector: (row) => row.full_name,
        sortable: true,
    },
    {
        id: "USERNAME",
        content: "USERNAME",
        name: "USERNAME",
        selector: (row) => row.USERNAME,
        sortable: true,
    },
    {
        id: "EMAIL",
        content: "EMAIL",
        name: "EMAIL",
        selector: (row) => row.EMAIL,
        sortable: true,
    },
    {
        id: "ROLE",
        content: "ROLE",
        name: "ROLE",
        selector: (row) => row.role_name,
        sortable: true,
    },
    {
        id: "STATUS",
        content: "STATUS",
        name: "STATUS",
        selector: (row) => row.status_name,
        sortable: true,
    },
    {
        id: "CREATED BY",
        content: "CREATED BY",
        name: "CREATED BY",
        selector: (row) => row.created_by,
        sortable: true,
    },
    {
        id: "DATE CREATED",
        content: "DATE CREATED",
        name: "DATE CREATED",
        selector: (row) => row.created_at,
        sortable: true,
    },
    {
        id: "UPDATED BY",
        content: "UPDATED BY",
        name: "UPDATED BY",
        selector: (row) => row.updated_by,
        sortable: true,
    },
    {
        id: "UPDATED AT",
        content: "UPDATED AT",
        name: "UPDATED AT",
        selector: (row) => row.updated_at,
        sortable: true,
    },
    {
        id: "ACTIONS",
        content: "ACTIONS",
        name: "ACTIONS",
        cell: (row) => (
            <ActionBtns
                editURL={"/user/edit/"}
                deleteURL={API.manage_user_url}
                editData={JSON.stringify([{}])}
                deleteData={JSON.stringify([{}])}
            />
        ),
    },
];

export const roleColumns = [
    {
        id: "ROLE NAME",
        content: "ROLE NAME",
        name: "ROLE NAME",
        selector: (row) => row.role_name,
        sortable: true,
    },
    {
        id: "DESCRIPTION",
        content: "DESCRIPTION",
        name: "DESCRIPTION",
        selector: (row) => row.role_description,
        sortable: true,
    },
    {
        id: "ACTIONS",
        content: "ACTIONS",
        name: "ACTIONS",
        cell: (row) => <ActionBtns editURL={"edit/" + row.id} />,
    },
];

export const parentContractColumns = [
    {
        id: "PARENT CONTRACT NUMBER",
        content: "PARENT CONTRACT NUMBER",
        name: "PARENT CONTRACT NUMBER",
        selector: (row) => row.parent_number,
        sortable: true,
    },
    {
        id: "LESSE",
        content: "LESSE",
        name: "LESSE",
        selector: (row) => row.vendor_name,
        sortable: true,
    },
];
