import { useState, useEffect } from "react";
import { API } from "../../a_custom/ApiServices";
import {
    contractColumns,
    submittedCreatorColumns,
} from "../../a_custom/ColumnList";
import {
    LoadDataTable,
    SEARCHDATA,
    CardHeader,
    BoxIcon,
    INPUT,
    CBTN,
    LOV,
} from "../../a_custom/Custom";
import { getContractParameters, getDataTable } from "../../a_custom/Load";
import Helper from "../../.././../utils/Helper.js";
import BModal from "../../../BModal.jsx";
import DraggableList from "../../../DraggableList.jsx";
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
        approval_status: 10,
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
    });
};

// ============================================== END FUNCTIONS

const Requestor = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const [searchData, setSearchData] = useState({
        contract_number: "",
        parent_number: "",
        contract_type: "",
        approval_status: 10,
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

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns

        let active = Helper.getItemCache("submittedColumn");
        if (active === null || active.length === 0) {
            active = submittedCreatorColumns;
            Helper.addItemCache("submittedColumn", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(submittedCreatorColumns, result);
        setColumn(temp2);

        let inActiveColumn = Helper.getArrOfObjectDifference(
            submittedCreatorColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        getContractParameters(setParameters);
        const param = {
            params: {
                approval_status: 10,
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
        // when there is no stored cache it needs to get the current column

        Helper.addItemCache("submittedColumn", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    return (
        <>
            <div className="col-12">
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
                                        type="date"
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
                                            // setSearchData({...searchData, approval_status:e.target.value})
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
                                </div>
                            </div>
                            <div className="card">
                                <CardHeader title="submitted contracts" />

                                <div className="card-body">
                                    <LoadDataTable
                                        data={filteredList}
                                        columns={tableColumn}
                                        selectableRows={false}
                                    />
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
        </>
    );
};

export default Requestor;
