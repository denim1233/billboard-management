import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../a_custom/ApiServices";
import { summaryColumns } from "../a_custom/ColumnList";
import { CSVLink } from "react-csv";
import {
    LoadDataTable,
    SEARCHDATA,
    DeleteSlot,
    CardHeader,
    INPUT,
    CLINK,
    CBTN,
    LOV,
} from "../a_custom/Custom";
import {
    slotParameters,
    getDataTable,
    getSize,
    getContractParameters,
} from "../a_custom/Load";
import Helper from "../../.././utils/Helper.js";
import BModal from "../.././BModal.jsx";
import DraggableList from "../.././DraggableList.jsx";

//======================================================================================

const searchBTN = (searchData, setFilteredList) => {
    axios
        .post(API.get_ora_contracts, searchData, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            setFilteredList(response.data);
            // console.log(response.data);
        });
};

const clearBTN = (searchData, setSearchData) => {
    setSearchData({
        ...searchData,
        branch_id: "",
        status_id: "",
        type_id: "",
        size_id: "",
    });
};

const onSelectedRow = (e, deleteData, setDeleteData) => {
    let selected = e.selectedRows;
    let data = selected.map((d) => {
        return {
            slot_id: d.slot_id,
            status_id: d.status_id == 4 ? 2 : 4,
        };
    });
    setDeleteData({
        ...deleteData,
        slot_id: data.map((r) => r.slot_id).toString(),
        status_id: data.map((r) => r.status_id).toString(),
    });
};

const openRemarkBox = (deleteData, setIsDelete) => {
    if (deleteData.slot_id != "") {
        setIsDelete(true);
    }
};

const deleteRequest = (
    deleteData,
    searchFunction,
    searchData,
    searchFilter
) => {
    // Swal.fire({
    //     title: 'Do you want to proceed?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     iconColor: '#e80000',
    //     confirmButtonColor: '#e80000',
    //     cancelButtonColor: '#e80000',
    //     cancelButtonText: 'No',
    //     confirmButtonText: 'Yes'

    // }).then( async (result) => {
    //     if (result.isConfirmed) {
    axios
        .post(API.delete_slot_url, deleteData, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            toast.fire({
                icon: "success",
                title: "Slot Successfully Deleted",
            });
            searchFunction(searchData, searchFilter);
            // searchBTN(searchData,setFilteredList)
            // reload the table
        });
    //     }
    // })
};

//======================================================================================

const Summary = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const navigate = useNavigate();

    const [isDelete, setIsDelete] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [deleteData, setDeleteData] = useState({
        slot_id: "",
        remarks: "",
        status_id: "",
        deleted_at: "",
        deleted_by: "johnny bravo",
    });

    const [slotList, setSlotList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

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

    const [searchData, setSearchData] = useState({
        action: "rpt_contracts",
        processFlag: "",
        slotType: "",
        storeId: "",
        supplierId: "",
    });

    const headers2 = [
        {
            label: "CONTRACT NUMBER",
            key: "CONTRACT_NUMBER",
        },
        {
            label: "BRANCH",
            key: "STORE_NAME",
        },
        {
            label: "LESSE",
            key: "SUPPLIER_NAME",
        },
        {
            label: "CONTRACT TYPE",
            key: "CONTRACT_TYPE",
        },
        {
            label: "SIZE",
            key: "SLOT_SIZE",
        },
        {
            label: "APPROVAL STATUS",
            key: "ATTRIBUTE1",
        },
        {
            label: "Interface Status",
            key: "PROCESS_FLAG",
        },
        {
            label: "Start Date",
            key: "CONTRACT_START_DATE",
        },
        {
            label: "End Date",
            key: "CONTRACT_END_DATE",
        },
        {
            label: "Date Installed",
            key: "DATE_INSTALLED",
        },
        {
            label: "Contract Price",
            key: "CONTRACT_PRICE",
        },
        {
            label: "Mode of Payment",
            key: "MODE_OF_PAYMENT",
        },
        {
            label: "Monthly",
            key: "MONTHLY_RENTAL",
        },
        {
            label: "Brand",
            key: "BRAND",
        },
        {
            label: "Material",
            key: "MATERIAL",
        },
        {
            label: "Remarks",
            key: "REMARKS",
        },
        {
            label: "Transaction Date",
            key: "CREATION_DATE",
        },
        {
            label: "Approve Date",
            key: "LAST_UPDATE_DATE",
        },
    ];

    useEffect(() => {
        getContractParameters(setParameters);
    }, []);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text="Lesse"
                                        name={"supplier_id"}
                                        value={searchData.supplier_id}
                                        resultList={parameters.lesseeList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"vendor_name"}
                                        getVal={"id"}
                                    />

                                    <LOV
                                        text={"Type"}
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
                                </div>

                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text={"Branch"}
                                        name={"store_id"}
                                        value={searchData.store_id}
                                        resultList={parameters.branchList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"branch_name"}
                                        getVal={"id"}
                                    />
                                    <div className="form-group d-flex align-items-center">
                                        <div style={{ width: "35%" }}>
                                            <label>Interface Status</label>
                                        </div>
                                        <div style={{ width: "65%" }}>
                                            <select
                                                name="process_flag"
                                                value={searchData.process_flag}
                                                onChange={(e) => {
                                                    setSearchData({
                                                        ...searchData,
                                                        process_flag:
                                                            e.target.value,
                                                    });
                                                }}
                                                className="form-control"
                                            >
                                                <option value=" "></option>
                                                <option value="I">
                                                    Interfaced
                                                </option>
                                                <option value="S">
                                                    Invoice Successfully Created
                                                </option>
                                                <option value="E">
                                                    Interface Error
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-12 d-flex justify-content-end flex-wrap ">
                                    {/* <CBTN
                                        text="Export"
                                        custom="mr-5"
                                        onClick={() => {
                                            clearBTN(searchData, setSearchData);
                                        }}
                                    /> */}
                                    <CSVLink
                                        data={filteredList}
                                        onClick={() => {
                                            console.log(filteredList);
                                            console.log(headers2);
                                        }}
                                        headers={headers2}
                                        filename={"contract summary.csv"}
                                        className="custom-btn mr-5"
                                    >
                                        Export
                                    </CSVLink>
                                    <CBTN
                                        text="Generate"
                                        className="ml-5"
                                        onClick={() => {
                                            searchBTN(
                                                searchData,
                                                setFilteredList
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="Summary" />
                    <div className="card-body">
                        <LoadDataTable
                            data={filteredList}
                            columns={summaryColumns}
                            selectableRows={false}
                            onSelectedRowsChange={(e) => {
                                onSelectedRow(e, deleteData, setDeleteData);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Summary;

