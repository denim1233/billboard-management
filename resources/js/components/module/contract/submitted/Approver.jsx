import { useState, useEffect } from "react";
import { API } from "../../a_custom/ApiServices";
import {
    contractColumns,
    submittedApproverColumns,
} from "../../a_custom/ColumnList";
import {
    LoadDataTable,
    SEARCHDATA,
    CardHeader,
    BoxIcon,
    INPUT,
    CBTN,
    LOV,
    REMARKSBOX,
} from "../../a_custom/Custom";
import { getContractParameters, getDataTable } from "../../a_custom/Load";
import Helper from "../../.././../utils/Helper.js";
import BModal from "../../../BModal.jsx";
import DraggableList from "../../../DraggableList.jsx";
// ============================================== END IMPORTS

const openRemarkBox = (deleteData, setIsDelete) => {
    if (deleteData.id != "") {
        setIsDelete(true);
    }
};

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
        approval_status: 10,
        contract_type: 5,
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

const Approver = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectable, setSelectTable] = useState(true);
    const [isModify, setIsModify] = useState(false);

    const [saveData, setSaveData] = useState({
        id: "",
        is_new: "",
        approval_status: "",
        contract_type: "",
        return_remarks: "",
    });

    const [searchData, setSearchData] = useState({
        contract_number: "",
        parent_number: "",
        approval_status: 10,
        contract_type: 5,
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
        let active = Helper.getItemCache("approverColumn");

        if (active === null || active.length === 0) {
            active = submittedApproverColumns;
            Helper.addItemCache("approverColumn", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(submittedApproverColumns, result);
        setColumn(temp2);

        let inActiveColumn = Helper.getArrOfObjectDifference(
            submittedApproverColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        const param = {
            params: {
                approval_status: 10,
                contract_type: 5,
            },
        };

        getContractParameters(setParameters);
        // get submitted contracts only

        axios
            .get(API.get_for_renewal_url, param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
            });
    }, []);

    //dynamic columns
    useEffect(() => {
        // when there is no stored cache it needs to get the current column

        Helper.addItemCache("approverColumn", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const handleselectedContractData = (e, saveData, setSaveData) => {
        let selected = e.selectedRows;
        let c_id = [];
        let c_is_new = [];
        let c_type = [];

        // separate the data container of renew and change status of data
        let temp = filteredList;

        selected.filter((d) => {
            // filter selected rows as subbmitted only
            temp.filter((ex) => {
                if (d.id == ex.id) {
                    c_id.push(d.id);
                    c_type.push(parseInt(d.contract_type_id));
                    c_is_new.push(parseInt(d.is_new_id ? d.is_new_id : 0));
                }
            });
        });

        setSaveData({
            ...saveData,
            id: c_id.toString(),
            contract_type: c_type.toString(),
            is_new: c_is_new.toString(),
        });
    };

    const loadTable = () => {
        return (
            <>
                <LoadDataTable
                    data={filteredList}
                    columns={tableColumn}
                    selectableRows={selectable}
                    selectableRowsSingle={false}
                    onSelectedRowsChange={(e) => {
                        handleselectedContractData(e, saveData, setSaveData);
                    }}
                />
            </>
        );
    };

    const submitData = async (data, saveType, setData, table) => {
        // separate the data container of renew and change status of data
        let approvalStatus = saveType === "approve" ? 6 : 11;
        let arr1 = data.id.split(",");
        var arr2 = [];
        for (var i = 0; i < arr1.length; i++) {
            arr2.push(approvalStatus);
        }

        let temp = { ...data, approval_status: arr2.toString() };

        //clear save data after saving it stil uses the data after saved

        Swal.fire({
            title: "Do you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            iconColor: "#e80000",
            confirmButtonColor: "#e80000",
            cancelButtonColor: "#e80000",
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    url: API.changeStatus_contract_url,
                    method: "post",
                    data: [temp],
                }).then(async (res) => {
                    toast.fire({
                        icon: "success",
                        title: "Contract/s Updated Successfully!",
                    });

                    setData({
                        id: "",
                        is_new: "",
                        approval_status: "",
                        contract_type: "",
                        return_remarks: "",
                    });

                    // setSelectTable(false)
                    // setSelectTable(true)

                    const param = {
                        params: {
                            approval_status: 10,
                            contract_type: 5,
                        },
                    };

                    await axios.get(API.get_contract_url, param).then((res) => {
                        setFilteredList(res.data);
                    });
                    // loadTable();
                });
            }
        });
    };

    return (
        <>
            <REMARKSBOX
                isDelete={isModify}
                setAction={setIsModify}
                saveData={saveData}
                setSaveData={setSaveData}
                TitleText={"Modification Remarks*:"}
                submitData={submitData}
            />
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
                                    {/* <SEARCHDATA 
                                        text='parent contract number' 
                                        name={'parent_contract_number'}
                                    /> */}
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
                            <div className="row py-2">
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
                            <div className=" d-flex align-items-center justify-content-end gap-4 mb-3">
                                <CBTN
                                    text="Approve"
                                    custom="mr-5"
                                    onClick={() => {
                                        submitData(
                                            saveData,
                                            "approve",
                                            setSaveData
                                        );
                                    }}
                                />

                                {/* you need to check what the user pressed */}

                                <CBTN
                                    text="Modify"
                                    onClick={() => {
                                        openRemarkBox(saveData, setIsModify);
                                        {
                                            /* submitData(saveData,'modify') ; */
                                        }
                                    }}
                                />
                            </div>
                            <div className="card">
                                <CardHeader title="submitted contracts" />
                                <div className="card-body">{loadTable()}</div>
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

export default Approver;
