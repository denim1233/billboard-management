import { useState, useEffect } from "react";
import { API } from "../a_custom/ApiServices";
import {
    LoadDataTable,
    SEARCHDATA,
    CardHeader,
    INPUT,
    CBTN,
    LOV,
    PrintBTN,
} from "../a_custom/Custom";
import { getContractParameters, getDataTable } from "../a_custom/Load";
import Helper from "../../.././utils/Helper.js";
import BModal from "../../BModal.jsx";
import DraggableList from "../../DraggableList.jsx";

// ============================================== END IMPORTS

const searchBTN = (searchData, contractList = null, setFilteredList) => {
    const param = {
        params: searchData,
    };

    axios
        .get(API.get_contract_url, param, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            setFilteredList(response.data);
        });
};

const clearBTN = (setSearchData) => {
    setSearchData({
        contract_number: "",
        parent_number: "",
        contract_type: "",
        approval_status: 6,
        is_new: "",
        contract_status: "",
        branch_id: "",
        type_id: "",
        brand_id: "",
        lesse: "",
        date_from: "",
        date_to: "",
        installation_from: "",
        installation_to: "",
        order_column: "contract_number",
        order_by: "desc",
    });
};

// ============================================== END FUNCTIONS

const Approved = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [printData, setPrintData] = useState([{}]);
    const [terms, setTerms] = useState("");

    const [searchData, setSearchData] = useState({
        contract_number: "",
        parent_number: "",
        contract_type: "",
        approval_status: 6,
        is_new: "",
        contract_status: "",
        branch_id: "",
        type_id: "",
        brand_id: "",
        lesse: "",
        date_from: "",
        date_to: "",
        installation_from: "",
        installation_to: "",
        order_column: "contract_type",
        order_by: "desc",
    });

    const [parameters, setParameters] = useState({
        contractNumberList: [],
        parentNumberList: [],
        lesseeList: [],
        typeList: [],
        brandList: [],
        branchList: [],
        approvalStatusList: [],
        contractStatusList: [],
        contractTypeList: [],
        newRenewList: [],
    });

    var approvedColumns = [
        {
            name: "Contract Number",
            id: "Contract Number",
            content: "Contract Number",
            selector: (row) => row.contract_number,
            sortable: true,
            width: "150px",
        },
        {
            name: "New/Renew",
            id: "New/Renew",
            content: "New/Renew",
            selector: (row) => row.isNew,
            sortable: true,
            width: "150px",
        },
        {
            name: "Contract Type",
            id: "Contract Type",
            content: "Contract Type",
            selector: (row) => row.contract_type,
            sortable: true,
            width: "150px",
        },
        {
            name: "Branch",
            id: "Branch",
            content: "Branch",
            selector: (row) => row.branch_name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Type",
            id: "Type",
            content: "Type",
            selector: (row) => row.type_name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Size",
            id: "Size",
            content: "Size",
            selector: (row) => row.size,
            sortable: true,
            width: "150px",
        },
        {
            name: "Lessee",
            id: "Lessee",
            content: "Lessee",
            selector: (row) => row.vendor_name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Brand",
            id: "Brand",
            content: "Brand",
            selector: (row) => row.brand_name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Mode Of Payment",
            id: "Mode Of Payment",
            content: "Mode Of Payment",
            selector: (row) => row.payment_name,
            sortable: true,
            width: "150px",
        },
        {
            name: "Date Installed",
            id: "Date Installed",
            content: "Date Installed",
            selector: (row) => row.installation_date,
            sortable: true,
            width: "150px",
        },
        {
            name: "Start Date",
            id: "Start Date",
            content: "Start Date",
            selector: (row) => row.start_date,
            sortable: true,
            width: "150px",
        },
        {
            name: "End Date",
            id: "End Date",
            content: "End Date",
            selector: (row) => row.end_date,
            sortable: true,
            width: "150px",
        },
        {
            name: "Number of Months",
            id: "Number of Months",
            content: "Number of Months",
            selector: (row) => row.number_of_months,
            sortable: true,
            width: "150px",
        },
        {
            name: "Monthly Rental",
            id: "Monthly Rental",
            content: "Monthly Rental",
            selector: (row) => Helper.toCurrency(row.monthly_rental),
            sortable: true,
            width: "150px",
        },
        {
            name: "Contract Price",
            id: "Contract Price",
            content: "Contract Price",
            selector: (row) => Helper.toCurrency(row.contract_price),
            sortable: true,
            width: "150px",
        },
        {
            name: "Material",
            id: "Material",
            content: "Material",
            selector: (row) => row.material,
            sortable: true,
            width: "150px",
        },
        {
            name: "Terms of Contract",
            id: "Terms of Contract",
            content: "Terms of Contract",
            selector: (row) => row.terms_of_contract,
            sortable: true,
            width: "150px",
        },
        {
            name: "Remarks",
            id: "Remarks",
            content: "Remarks",
            selector: (row) => row.remarks,
            sortable: true,
            width: "150px",
        },
        {
            name: "Created By",
            id: "Created By",
            content: "Created By",
            selector: (row) => row.created_by,
            sortable: true,
            width: "150px",
        },
        {
            name: "Date Created",
            id: "Date Created",
            content: "Date Created",
            selector: (row) => row.created_at,
            sortable: true,
            width: "150px",
        },
        {
            name: "Approved By",
            id: "Approved By",
            content: "Approved By",
            selector: (row) => row.updated_by,
            sortable: true,
            width: "150px",
        },
        {
            name: "Approved Date",
            id: "Approved Date",
            content: "Approved Date",
            selector: (row) => row.updated_at,
            sortable: true,
            width: "150px",
        },
        {
            name: "Contract Status",
            id: "Contract Status",
            content: "Contract Status",
            selector: (row) => row.contract_status,
            sortable: true,
            width: "150px",
        },
        {
            name: "Parent Contract Number",
            id: "Parent Contract Number",
            content: "Parent Contract Number",
            selector: (row) => row.parent_number,
            sortable: true,
            width: "150px",
        },
        {
            name: "Printed By",
            id: "Printed By",
            content: "Printed By",
            selector: (row) => row.printed_by,
            sortable: true,
            width: "150px",
        },
        {
            name: "Date Printed",
            id: "Date Printed",
            content: "Date Printed",
            selector: (row) => row.printed_at,
            sortable: true,
            width: "150px",
        },
        {
            name: "Actions",
            id: "Actions",
            content: "Actions",
            cell: (row) => {
                return (
                    <PrintBTN
                        onClick={() => {
                            printContract(row.id);
                        }}
                    />
                );
            },
        },
    ];

    const printContract = async (contractId) => {
        //

        const param = {
            params: { contract_id: contractId },
        };
        //fix this code
        const printData2 = await axios
            .get("/api/printContract/", param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setPrintData(response.data);
                return response.data;
            });

        setTimeout(function () {
            window.print();
        }, 2000);
    };

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    const getDisplayDate = (date1) => {
        if (date1) {
            var strDate = date1.split(" ");
            var clean = new Date(strDate[0]);
            var temp = clean.toDateString().split(" ");
            return getfullMonth(temp[1]) + " " + temp[2] + ", " + temp[3];
        }
    };

    const getfullMonth = (month) => {
        if (month === "Jan") {
            return "January";
        } else if (month === "Feb") {
            return "February";
        } else if (month === "Mar") {
            return "March";
        } else if (month === "Apr") {
            return "April";
        } else if (month === "May") {
            return "May";
        } else if (month === "Jun") {
            return "June";
        } else if (month === "Jul") {
            return "July";
        } else if (month === "Aug") {
            return "August";
        } else if (month === "Sep") {
            return "September";
        } else if (month === "Oct") {
            return "October";
        } else if (month === "Nov") {
            return "November";
        } else if (month === "Dec") {
            return "December";
        }
    };
    useEffect(() => {
        let active = Helper.getItemCache("approveColumn");
        if (active === null || active.length === 0) {
            active = approvedColumns;
            Helper.addItemCache("approveColumn", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(approvedColumns, result);
        setColumn(temp2);

        let inActiveColumn = Helper.getArrOfObjectDifference(
            approvedColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);

        //dynamic columns

        loadTerms();
        getContractParameters(setParameters);
        const param = {
            params: {
                approval_status: 6,
                order_column: "contract_number",
                order_by: "desc",
            },
        };
        axios
            .get(API.get_contract_url, param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
            });
    }, []);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("approveColumn", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const loadTerms = async () => {
        await axios.get("/api/get-terms").then((res) => {
            setTerms(res.data[0].description);
            // console.log(res.data)
        });
    };

    return (
        <>
            <div className="col-12 parent-contract-div">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text="Contract Number"
                                        name={"contract_number"}
                                        value={searchData.contract_number}
                                        resultList={parameters.contractNumber}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"contract_number"}
                                        getVal={"contract_number"}
                                    />
                                    <SEARCHDATA
                                        text="Lessee"
                                        name={"lesse"}
                                        value={searchData.lesse}
                                        resultList={parameters.lesseeList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"vendor_name"}
                                        getVal={"id"}
                                    />
                                    <LOV
                                        text="Type"
                                        name={"type_id"}
                                        value={searchData.type_id}
                                        options={parameters.typeList}
                                        opValue={"id"}
                                        opLabel={"type_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                type_id: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type="Date"
                                        text="Start Date"
                                        name={"installation_from"}
                                        value={searchData.installation_from}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                installation_from:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type="date"
                                        text="From Date"
                                        name={"date_from"}
                                        value={searchData.date_from}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                date_from: e.target.value,
                                            });
                                        }}
                                    />
                                    <LOV
                                        text="Approval Status"
                                        name={"approval_status"}
                                        value={searchData.approval_status}
                                        options={parameters.approvalStatusList}
                                        opValue={"id"}
                                        opLabel={"status_name"}
                                        onChange={(e) => {
                                            //     setSearchData({...searchData, approval_status:e.target.value})
                                        }}
                                    />
                                    <LOV
                                        text="Contract Status"
                                        name={"contract_status"}
                                        value={searchData.contract_status}
                                        options={parameters.contractStatusList}
                                        opValue={"id"}
                                        opLabel={"status_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                contract_status: e.target.value,
                                            });
                                        }}
                                    />
                                </div>

                                <div className="col-5">
                                    <SEARCHDATA
                                        text="Parent Contract Number"
                                        name={"parent_number"}
                                        value={searchData.parent_number}
                                        resultList={parameters.parentNumber}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"parent_number"}
                                        getVal={"parent_number"}
                                    />
                                    <SEARCHDATA
                                        text="Brand"
                                        name={"brand_id"}
                                        value={searchData.brand_id}
                                        resultList={parameters.brandList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"brand_name"}
                                        getVal={"id"}
                                    />
                                    <SEARCHDATA
                                        text="Branch"
                                        name={"branch_id"}
                                        value={searchData.branch_id}
                                        resultList={parameters.branchList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"branch_name"}
                                        getVal={"id"}
                                    />
                                    <INPUT
                                        type="date"
                                        text="End Date"
                                        name={"end_date"}
                                        value={searchData.installation_to}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                installation_to: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type="date"
                                        text="To Date"
                                        name={"to_date"}
                                        value={searchData.date_to}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                date_to: e.target.value,
                                            });
                                        }}
                                    />
                                    <LOV
                                        text="Contract Type"
                                        name={"contract_type"}
                                        value={searchData.contract_type}
                                        options={parameters.contractTypeList}
                                        opValue={"id"}
                                        opLabel={"status_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                contract_type: e.target.value,
                                            });
                                        }}
                                    />
                                    <LOV
                                        text="New / Renew"
                                        name={"new_renew"}
                                        value={searchData.is_new}
                                        options={parameters.newRenewList}
                                        opValue={"id"}
                                        opLabel={"status_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                is_new: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2 mb-4">
                                <div className="col-6 d-flex flex-wrap">
                                    <CBTN
                                        text="Search"
                                        custom="mr-5"
                                        onClick={() => {
                                            searchBTN(
                                                searchData,
                                                contractList,
                                                setFilteredList
                                            );
                                        }}
                                    />

                                    <CBTN
                                        text="Clear"
                                        onClick={() => {
                                            clearBTN(setSearchData);
                                        }}
                                    />

                                    <button
                                        type="button"
                                        className="custom-btn ml-5"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                    >
                                        Set Column
                                    </button>

                                    {/* setColumn(testColumn); */}
                                </div>
                            </div>
                            <div className="card">
                                <CardHeader title="approved contracts" />

                                <div className="card-body">
                                    {tableColumn != null ? (
                                        <LoadDataTable
                                            data={filteredList}
                                            columns={tableColumn}
                                            selectableRows={false}
                                        />
                                    ) : (
                                        <>test</>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {tableColumn.length != 0 ? (
                    <BModal
                        title="Set Column"
                        content={
                            <DraggableList
                                columns={tableColumn}
                                setColumn={setColumn}
                                inActive={inActiveColumns}
                            />
                        }
                    />
                ) : (
                    <>No Data</>
                )}
            </div>
            <div
                id="contract-template"
                className="col-lg-14 bg-white contract-template"
            >
                <div className="container-fluid">
                    <div className="row pb-3" style={{ borderBottom: "solid" }}>
                        <div className="col-lg-12 print-title d-flex justify-content-between align-items-center">
                            <div className="text-center px-5">
                                <h3>
                                    <b>
                                        <p style={{ lineHeight: "1rem" }}>
                                            LEASE CONTRACT
                                        </p>
                                        <p style={{ lineHeight: "1rem" }}>
                                            AD SPACE
                                        </p>
                                    </b>
                                </h3>
                            </div>
                            <ul className="print-ul">
                                <li>
                                    <img
                                        src="/img/deco.png"
                                        width="200"
                                        height="50"
                                        alt=""
                                    />
                                </li>
                                <li>
                                    <p className="print-label">
                                        Quimpo Boulevard Matina
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Davao City 8000 Philippines
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Tel Nos (63-82) 296-1821 to 23
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Fax No (63-82) 298-0233; (63-82)
                                        297-2023
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-8 print-lessee">
                            <div className="print-field mt-3">
                                <p className="legend">
                                    <b>Lessee:</b>
                                </p>
                                <p className="print-label">
                                    <b>Name:</b>{" "}
                                    {printData[0].owner
                                        ? printData[0].owner
                                        : " "}{" "}
                                </p>

                                <p className="print-label">
                                    <b>Company:</b>{" "}
                                    {printData[0].vendor_name
                                        ? printData[0].vendor_name
                                        : " "}{" "}
                                </p>
                                <p className="print-label">
                                    <b>Contact Nos.:</b>{" "}
                                    {printData[0].phone
                                        ? printData[0].phone
                                        : " "}
                                </p>
                                <p className="print-label">
                                    <b>Fax Nos.:</b>{" "}
                                    {printData[0].fax ? printData[0].fax : " "}{" "}
                                </p>
                            </div>
                        </div>
                        <div className="col-4 mt-4">
                            <div
                                className="col-12"
                                style={{
                                    textAlign: "right",
                                    border: "1px solid black",
                                    color: "red",
                                }}
                            >
                                <b>Contract No.</b>{" "}
                                {printData[0].parent_number
                                    ? printData[0].parent_number
                                    : " "}
                            </div>

                            <div
                                className="col-12 mt-1"
                                style={{ border: "1px solid" }}
                            >
                                <b>Date:</b>{" "}
                                {getDisplayDate(printData[0].created_at)}
                            </div>
                        </div>
                        {/* new Date(
                                          printData[0].created_at.toString()
                                      ).toLocaleDateString("en-us", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      }) */}
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <table
                                className="print-table"
                                style={{ border: "1px solid" }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            width="100"
                                            style={{ textAlign: "center" }}
                                        >
                                            #
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Brand
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Branch
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Ad Space
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Ad Size
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            # of Pcs
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Material
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Monthly Rental
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printData?.map((res, i) => {
                                        return (
                                            <tr key={i + 1}>
                                                <td align="center">{i + 1}</td>
                                                <td align="center">
                                                    {res.brand_name}
                                                </td>
                                                <td align="center">
                                                    {res.branch_name}
                                                </td>
                                                <td align="center">
                                                    {res.ad_space}
                                                </td>
                                                <td align="center">
                                                    {res.size}
                                                </td>
                                                <td align="center">1 pc</td>
                                                <td align="center">
                                                    {res.material}
                                                </td>
                                                <td align="center">
                                                    <label
                                                        style={{ color: "red" }}
                                                    >
                                                        Php
                                                    </label>
                                                    {"  "}
                                                    {Helper.toCurrency(
                                                        res.monthly_rental
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <table border="1" width="100%">
                                <tr>
                                    <th colSpan="8">
                                        <b>Term of Contract:</b>
                                        <p className="print-label">
                                            {printData[0].terms_of_contract
                                                ? printData[0].terms_of_contract
                                                : " "}
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Period Covered:</b>
                                        <p className="print-label">
                                            {getDisplayDate(
                                                printData[0].start_date
                                            )}{" "}
                                            {"  -  "}
                                            {getDisplayDate(
                                                printData[0].end_date
                                            )}
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Mode of Payment:</b>
                                        <p className="mb-0 print-label">
                                            {printData[0].mode_of_payment
                                                ? printData[0].mode_of_payment
                                                : " "}
                                        </p>
                                        <p className="print-label">
                                            Total Number of contracts:{" "}
                                            {printData.length} (Nothing Follows)
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Remarks:</b>
                                        <p className="print-label">
                                            {printData[0].remarks
                                                ? printData[0].remarks
                                                : " "}
                                        </p>
                                    </th>
                                </tr>
                            </table>
                            <div className="print-terms">
                                <div
                                    className="col-lg-12 "
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "<center><b>TERMS AND CONDITIONS:</b></center>" +
                                            terms,
                                    }}
                                    style={{ fontSize: 12 }}
                                ></div>
                            </div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-between mt-5">
                            <div className="print-signature mt-5">
                                <p className="print-label">
                                    <b>MS. JINIELLE TAN</b>
                                </p>

                                <p className="print-label">
                                    Corporate Marketing
                                </p>
                                <p className="print-label">DECOARTS</p>
                            </div>
                            <div className="print-signature mt-5">
                                <p>
                                    {printData[0].owner
                                        ? printData[0].owner
                                        : " "}
                                </p>
                                <p>
                                    <b>LESSEE</b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Approved;
