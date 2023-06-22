import axios from "axios";
import { intervalToDuration } from "date-fns";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import { slotColumns } from "../../a_custom/ColumnList";
import {
    LoadDataTable,
    SEARCHDATA,
    INPUT,
    CLINK,
    CBTN,
    LOV,
    MULTILOV,
} from "../../a_custom/Custom";

// ===================================================================================

const searchBTN = async (searchData, setSlotList) => {
    if (searchData.type_id != "" && searchData.branch_id != "") {
        const param = {
            params: searchData,
        };

        axios
            .get(API.get_slot_url, param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setSlotList(response.data);
            });
    } else {
        toast.fire({
            icon: "error",
            title: "Please fill up missing fields",
        });
    }
};

const clearSearchBTN = (setSearchData) => {
    setSearchData({
        branch_id: "",
        type_id: "",
        status_id: 4,
    });
};

const onSelectedRow = (e, multiInhouseData, setMultiInhouseData) => {
    let selected = e.selectedRows;
    let slotID = [];
    selected.map((d) => slotID.push(d.slot_id));
    setMultiInhouseData({
        ...multiInhouseData,
        slot_id: slotID.toString(),
    });
};

const submitBTN = (multiInhouseData, navigate) => {
    if (
        multiInhouseData.slot_id != "" &&
        multiInhouseData.brand_id != "" &&
        multiInhouseData.start_date != ""
    ) {
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
                axios({
                    url: API.manage_contract_url,
                    method: "post",
                    data: [multiInhouseData],
                }).then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Multi Inhouse Created Successfully!",
                    });
                    navigate("/create-contract");
                });
            }
        });
    } else {
        toast.fire({
            icon: "error",
            title: "Please select missing fields to save!",
        });
    }
};

const clearSubmitBTN = (multiInhouseData, setMultiInhouseData) => {
    setMultiInhouseData({
        ...multiInhouseData,
        brand_id: "",
        start_date: "",
        // slot_id: "",
    });
};

// ===================================================================================

const MultiInhouse = () => {
    const navigate = useNavigate();

    const [slotList, setSlotList] = useState([]);

    const [searchData, setSearchData] = useState({
        branch_id: "",
        type_id: "",
        status_id: 4,
    });

    const [parameters, setParameters] = useState({
        branchList: [],
        brandList: [],
        typeList: [],
    });

    const [multiInhouseData, setMultiInhouseData] = useState({
        brand_id: "",
        start_date: "",
        slot_id: "",
        is_new: 8,
        contract_type: 3,
        status_id: 1,
        approval_status: 6,
    });

    useEffect(() => {
        axios.get(API.get_contract_parameters).then(({ data }) => {
            let result = data.branch.map((res) => {
                return {
                    label: res["branch_name"],
                    value: res["branch_name"],
                };
            });
            setParameters({
                branchList: data.branch,
                brandList: data.brand,
                typeList: data.type,
            });
        });
    }, []);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        <b>Contract: Inhouse</b>
                                    </p>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <LOV
                                        text="Branch"
                                        name={"branch_id"}
                                        value={searchData.branch_id}
                                        options={parameters.branchList}
                                        opValue={"id"}
                                        opLabel={"branch_name"}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                branch_id: e.target.value,
                                            });
                                        }}
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
                                </div>
                            </div>
                            <div className="py-3">
                                <CBTN
                                    text={"Search"}
                                    onClick={() => {
                                        searchBTN(searchData, setSlotList);
                                    }}
                                />
                                <CBTN
                                    text={"Clear"}
                                    custom="mx-5"
                                    onClick={() => {
                                        clearSearchBTN(setSearchData);
                                    }}
                                />
                            </div>
                            <div>
                                <LoadDataTable
                                    data={slotList}
                                    columns={slotColumns}
                                    selectableRows={true}
                                    selectableRowsSingle={false}
                                    onSelectedRowsChange={(e) => {
                                        onSelectedRow(
                                            e,
                                            multiInhouseData,
                                            setMultiInhouseData
                                        );
                                    }}
                                />
                            </div>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-6">
                                        <SEARCHDATA
                                            text="Brand"
                                            name={"brand_id"}
                                            value={multiInhouseData.brand_id}
                                            resultList={parameters.brandList}
                                            state={multiInhouseData}
                                            setState={setMultiInhouseData}
                                            searchKey={"brand_name"}
                                            getVal={"id"}
                                        />
                                        <INPUT
                                            type={"date"}
                                            text={"Start Date"}
                                            name={"start_date"}
                                            value={multiInhouseData.start_date}
                                            onChange={(e) => {
                                                setMultiInhouseData({
                                                    ...multiInhouseData,
                                                    start_date: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="py-3">
                                    <CBTN
                                        text={"Submit"}
                                        onClick={() => {
                                            submitBTN(
                                                multiInhouseData,
                                                navigate
                                            );
                                        }}
                                    />
                                    <CBTN
                                        text={"Clear"}
                                        custom="mx-5"
                                        onClick={() => {
                                            clearSubmitBTN(
                                                multiInhouseData,
                                                setMultiInhouseData
                                            );
                                        }}
                                    />
                                    <CLINK
                                        text={"Back"}
                                        to={"/create-contract"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <LoadDataTable
                            data={slotList}
                            columns={slotColumns}
                            selectableRows={true}
                            selectableRowsSingle={false}
                            onSelectedRowsChange={(e) => {
                                onSelectedRow(
                                    e,
                                    multiInhouseData,
                                    setMultiInhouseData
                                );
                            }}
                        />
                    </div>
                </div>
            </div> */}

            {/* <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        <b>
                                            Contract: In-House: 8.66 x 8.66 ft.,
                                            Store Billboard, 1 @Matina
                                        </b>
                                    </p>
                                    <hr />
                                </div>
                                <div className="col-6">
                                    <SEARCHDATA
                                        text="Brand"
                                        name={"brand_id"}
                                        value={multiInhouseData.brand_id}
                                        resultList={parameters.brandList}
                                        state={multiInhouseData}
                                        setState={setMultiInhouseData}
                                        searchKey={"brand_name"}
                                        getVal={"id"}
                                    />
                                    <INPUT
                                        type={"date"}
                                        text={"Start Date"}
                                        name={"start_date"}
                                        value={multiInhouseData.start_date}
                                        onChange={(e) => {
                                            setMultiInhouseData({
                                                ...multiInhouseData,
                                                start_date: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="py-3">
                                <CBTN
                                    text={"Submit"}
                                    onClick={() => {
                                        submitBTN(multiInhouseData, navigate);
                                    }}
                                />
                                <CBTN
                                    text={"Clear"}
                                    custom="mx-5"
                                    onClick={() => {
                                        clearSubmitBTN(
                                            multiInhouseData,
                                            setMultiInhouseData
                                        );
                                    }}
                                />
                                <CLINK text={"Back"} to={"/create-contract"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default MultiInhouse;
