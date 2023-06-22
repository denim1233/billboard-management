import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import { slotColumns } from "../../a_custom/ColumnList";
import {
    SEARCHDATANUMBER,
    LoadDataTable,
    SEARCHDATA,
    DeleteSlot,
    CardHeader,
    BoxIcon,
    INPUT,
    CLINK,
    CBTN,
    LOV,
} from "../../a_custom/Custom";
import {
    getCreateParameters,
    slotParameters,
    getDataTable,
    getSize,
} from "../../a_custom/Load";
import Helper from "../../../.././utils/Helper.js";
import BModal from "../../.././BModal.jsx";
import DraggableList from "../../.././DraggableList.jsx";

//======================================================================================

const searchBTN = (searchData, setFilteredList) => {
    const param = {
        params: searchData,
    };

    axios
        .get(API.get_slot_url, param, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            setFilteredList(response.data);
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

const Slot = () => {
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

    const [searchData, setSearchData] = useState({
        branch_id: "",
        status_id: "",
        type_id: "",
        size_id: "",
    });

    const [parameters, setParameters] = useState({
        branchList: [],
        statusList: [],
        typeList: [],
        sizeList: [],
    });
    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("slotColumns");
        if (active === null) {
            active = slotColumns;
            Helper.addItemCache("slotColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(slotColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            slotColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        getDataTable(API.get_slot_url, setSlotList, setFilteredList);
        slotParameters(parameters, setParameters);
    }, []);

    useEffect(() => {
        if (searchData.type_id != "") {
            getSize(searchData.type_id, parameters, setParameters);
        }
    }, [searchData.type_id]);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("slotColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    return (
        <>
            <DeleteSlot
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                deleteData={deleteData}
                setDeleteData={setDeleteData}
                deleteFunction={deleteRequest}
                searchFunction={searchBTN}
                searchData={searchData}
                searchFilter={setFilteredList}
            />

            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text={"Branch"}
                                        name={"branch_id"}
                                        value={searchData.branch_id}
                                        resultList={parameters.branchList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"branch_name"}
                                        getVal={"id"}
                                    />

                                    <LOV
                                        text={"Slot Status"}
                                        value={searchData.id}
                                        options={parameters.statusList}
                                        opValue={"id"}
                                        opLabel={"status_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                status_id: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-5">
                                    {/* <SEARCHDATA
                                        text={"Type"}
                                        name={"type_id"}
                                        value={searchData.type_id}
                                        resultList={parameters.typeList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"type_name"}
                                        getVal={"id"}
                                    /> */}

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

                                    <div className="form-group d-flex align-items-center">
                                        <div style={{ width: "35%" }}>
                                            <label>Size</label>
                                        </div>
                                        <div style={{ width: "65%" }}>
                                            <select
                                                name="size_id"
                                                value={searchData.size_id}
                                                onChange={(e) => {
                                                    setSearchData({
                                                        ...searchData,
                                                        size_id: e.target.value,
                                                    });
                                                }}
                                                className="form-control"
                                            >
                                                <option value=""></option>
                                                {parameters.sizeList?.map(
                                                    (res) => {
                                                        return (
                                                            <option
                                                                key={res.id}
                                                                value={res.id}
                                                            >
                                                                {res.length +
                                                                    "x" +
                                                                    res.width +
                                                                    " " +
                                                                    res.uom_name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-2">
                                <div className="col-4 d-flex justify-content-start flex-wrap ">
                                    <CBTN
                                        text="Search"
                                        custom="mr-5"
                                        onClick={() => {
                                            searchBTN(
                                                searchData,
                                                setFilteredList
                                            );
                                        }}
                                    />
                                    <CBTN
                                        text="Clear"
                                        onClick={() => {
                                            clearBTN(searchData, setSearchData);
                                        }}
                                    />
                                </div>
                                <div className="col-8 d-flex justify-content-between flex-wrap ml-auto">
                                    <button
                                        type="button"
                                        className="custom-btn ml-5"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                    >
                                        Set Column
                                    </button>

                                    <CLINK
                                        text="View History"
                                        to={"/slot/history"}
                                    />
                                    <CLINK
                                        text="Create Slot"
                                        to={"/slot/create"}
                                    />
                                    <CBTN
                                        text="Edit"
                                        onClick={() => {
                                            if (deleteData.slot_id) {
                                                navigate(
                                                    "/slot/edit/" +
                                                        deleteData.slot_id
                                                );
                                            }
                                        }}
                                    />
                                    <CBTN
                                        text="Delete"
                                        onClick={() => {
                                            openRemarkBox(
                                                deleteData,
                                                setIsDelete,
                                                confirm,
                                                setConfirm
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
                    <CardHeader title="slot maintenance" />

                    <div className="card-body">
                        <LoadDataTable
                            data={filteredList}
                            columns={tableColumn}
                            selectableRows={true}
                            selectableRowsSingle={true}
                            onSelectedRowsChange={(e) => {
                                onSelectedRow(e, deleteData, setDeleteData);
                            }}
                        />
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

export default Slot;
