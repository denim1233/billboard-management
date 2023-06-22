import { te } from "date-fns/locale";
import { useState, useEffect } from "react";
import { API } from "../a_custom/ApiServices";
import { contractToRenewList, forRenewalColumns } from "../a_custom/ColumnList";
import {
    LoadDataTable,
    SEARCHDATA,
    CardHeader,
    BoxIcon,
    INPUT,
    CBTN,
    LOV,
} from "../a_custom/Custom";
import { getData, getDataTable, getRenewParameters } from "../a_custom/Load";
import Helper from "../../.././utils/Helper.js";
import BModal from "../../BModal.jsx";
import DraggableList from "../../DraggableList.jsx";
// ===================================== END IMPORT

const searchBTN = (searchData, contractList = null, setFilteredList) => {
    // if(searchData.start_date == "" && searchData.end_date != "" && searchData.lesse != ""){
    if (searchData.date_from === "") {
        searchData.date_from = "1900-01-01";
    }

    if (searchData.date_to == "" || searchData.lesse == "") {
        toast.fire({
            icon: "error",
            title: "Please input missing fields",
        });
        return;
    }

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
        contract_type: "5",
        contract_status: "",
        branch_id: "",
        type_id: "",
        brand_id: "",
        lesse: "",
        date_from: "",
        date_to: "",
        installation_from: "",
        installation_to: "",
        is_new: "8,9",
        approval_status: "6",
        no_of_months: 0,
        terms_of_contract: "",
    });
};

const submitData = (data, saveType, reload) => {
    // console.log(data);
    // return;

    if (data.brand_id === "") {
        data = { ...data, brand_id: data.parent_brand_id };
    }

    if (data.id == "") {
        toast.fire({
            icon: "error",
            title: "Please select a contract",
        });
        return;
    }

    if (saveType == "for renewal") {
        if (data.start_date != "" && data.end_date != "") {
        } else {
            toast.fire({
                icon: "error",
                title: "Please fill up missing fields",
            });
            return;
        }
    }

    //separate the data container of renew and change status of data

    // if rejected
    // approval_status = 11 - For Modification is_new = 8  new

    // if approved
    // approval_status = 6  renew  is_new = 9

    // if save for renewal

    // approval status = 11 - For Modification is_new = 8

    // Approval Status
    // 6 = Approved
    // 10 = Submitted
    // 11 = For Modification

    // is new
    // 8 = New
    // 9 = Renew

    let tempStatus = 0;
    let tempisNew = 0;

    if (saveType === "renew") {
        // review the status
        tempStatus = 10;
        tempisNew = 9;
    } else if (saveType === "for renewal") {
        tempStatus = 13;
        tempisNew = 15;
        // tempisNew = 8;
    } else if (saveType === "delete") {
        tempStatus = 14;
        tempisNew = 8;
    }

    let temp = { ...data, approval_status: tempStatus, is_new: tempisNew };
    temp = saveType === "for renewal" ? { ...temp, id: 0 } : temp;

    let tempUrl =
        saveType === "renew"
            ? API.changeStatus_contract_url
            : API.manage_contract_url;

    if (saveType === "delete") {
        tempUrl = API.changeStatus_contract_url;
    }

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
                url: tempUrl,
                method: "post",
                data: [temp],
            }).then(async (res) => {
                toast.fire({
                    icon: "success",
                    title: "Contract/s submitted!",
                });
                // for review
                reload();
                // await axios.get(API.get_contract_url).then(({data})=>{
                //     setFilteredList(data)
                // })
            });
        }
    });
};

const clearSaveBTN = (setSaveData) => {
    setSaveData({
        brand_id: "",
        end_date: "",
        start_date: "",
        installation_date: "",
        contract_number: "",
        status_id: 1,
        is_new: 13,
    });
};

const handleselectedContractData = (
    e,
    setCountSelectedCD,
    saveData,
    setSaveData
) => {
    let selected = e.selectedRows;
    setCountSelectedCD(e.selectedCount);
    let c_id = [];
    let c_type = [];
    let c_rental_id = [];
    let c_mode_of_payment = [];
    let c_contract_price = [];
    let c_slot_id = [];
    let c_lesse = [];
    let c_terms_of_contract = [];
    let c_no_of_months = [];
    let c_parent_brand_id = [];
    let c_param_brand_id = [];

    selected.filter((d) => {
        c_id.push(d.id);
        c_type.push(parseInt(d.contract_type_id));
        c_rental_id.push(parseInt(d.rental_id ? d.rental_id : 0));
        c_slot_id.push(parseInt(d.slot_id ? d.slot_id : 0));
        c_mode_of_payment.push(d.mode_of_payment ? d.mode_of_payment : 0);
        c_contract_price.push(d.contract_price ? d.contract_price : 0.0);
        c_lesse.push(parseInt(d.lesse ? d.lesse : 0));
        c_no_of_months.push(
            parseInt(d.number_of_months ? d.number_of_months : 0)
        );
        c_terms_of_contract.push(
            d.terms_of_contract ? d.terms_of_contract : " "
        );
        c_parent_brand_id.push(d.brand_id ? d.brand_id : " ");
        c_param_brand_id.push(0);
    });
    setSaveData({
        ...saveData,
        id: c_id.toString(),
        contract_type: c_type.toString(),
        contract_id: c_id.toString(),
        rental_id: c_rental_id.toString(),
        payment_id: c_mode_of_payment.toString(),
        contract_price: c_contract_price.toString(),
        slot_id: c_slot_id.toString(),
        lesse: c_lesse.toString(),
        no_of_months: c_no_of_months.toString(),
        terms_of_contract: c_terms_of_contract.toString(),
        parent_brand_id: c_parent_brand_id.toString(),
        param_brand_id: 0,
    });

    console.log(saveData);
};

// number_of_months
// terms_of_contract

const handleselectedRenewalData = (
    e,
    setCountSelectedCD,
    saveData,
    setSaveData,
    renewalList
) => {
    let selected = e.selectedRows;
    setCountSelectedCD(e.selectedCount);
    let c_id = [];
    let c_type = [];
    let c_rental_id = [];
    let c_mode_of_payment = [];
    let c_contract_price = [];
    let c_slot_id = [];
    let c_lesse = [];

    let temp = renewalList;

    selected.filter((d) => {
        temp.filter((ex) => {
            if (d.id == ex.id) {
                c_id.push(d.id);
                c_type.push(parseInt(d.contract_type_id));
                c_rental_id.push(parseInt(d.rental_id ? d.rental_id : 0));
                c_slot_id.push(parseInt(d.slot_id ? d.slot_id : 0));
                c_mode_of_payment.push(
                    d.mode_of_payment ? d.mode_of_payment : 0
                );
                c_contract_price.push(
                    d.contract_price ? d.contract_price : 0.0
                );
                c_lesse.push(parseInt(d.lesse ? d.lesse : 0));
            }
        });
    });

    // temp.filter((ex) => {
    //     if (d.id == ex.id) {
    //         c_id.push(d.id);
    //         c_type.push(parseInt(d.contract_type_id));
    //         c_is_new.push(parseInt(d.is_new_id ? d.is_new_id : 0));
    //     }
    // });

    setSaveData({
        ...saveData,
        id: c_id.toString(),
        contract_type: c_type.toString(),
        contract_id: c_id.toString(),
        rental_id: c_rental_id.toString(),
        payment_id: c_mode_of_payment.toString(),
        contract_price: c_contract_price.toString(),
        slot_id: c_slot_id.toString(),
        lesse: c_lesse.toString(),
    });
};

// ===================================== FUNCTIONS

const Renew = (credentials) => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [searchData, setSearchData] = useState({
        contract_type: "5",
        approval_status: "6",
        is_new: "8,9",
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

    const [countSelectedCD, setCountSelectedCD] = useState(0);
    const [renewalCount, setRenewalCount] = useState(0);
    const [saveData, setSaveData] = useState({
        id: "",
        brand_id: "",
        end_date: "",
        start_date: "",
        installation_date: "",
        contract_id: "",
        contract_type: "",
        is_new: 13,
        approval_status: 0,
    });

    const [saveRenewalData, setSaveRenewalData] = useState({
        id: "",
        brand_id: "",
        end_date: "",
        start_date: "",
        installation_date: "",
        contract_id: "",
        contract_type: "",
        is_new: 13,
        approval_status: 0,
        no_of_months: 0,
        terms_of_contract: "",
    });

    const [parameters, setParameters] = useState({
        lesseeList: [],
        branchList: [],
        brandList: [],
    });

    const [contractList, setContractList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [renewalList, setRenewalList] = useState([]);

    const loadData = () => {
        const param1 = {
            params: {
                is_new: 15,
                approval_status: 13,
            },
        };

        axios
            .get(API.get_contract_url, param1, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setRenewalList(response.data);
            });

        // searchBTN(searchData, null, setFilteredList);

        // const param2 = {
        //     params: {
        //         is_new:'8,9',
        //         approval_status:'6'
        //     },
        //   };

        //   axios
        //     .get(API.get_contract_url, param2, {
        //       headers: { "Content-Type": "application/json" },
        //     })
        //     .then((response) => {
        //         setFilteredList(response.data);
        //     });
    };

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("renewColumns");
        if (active === null) {
            active = contractToRenewList;
            Helper.addItemCache("renewColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(contractToRenewList, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            contractToRenewList,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        loadData();
        getRenewParameters(setParameters);
    }, []);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("renewColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const renewalSubmitButton = () => {
        if (credentials.credentials.credentials.role_id == 1) {
            return (
                <>
                    <CBTN
                        text="Submit"
                        custom="mr-5"
                        onClick={() => {
                            submitData(saveRenewalData, "renew", loadData);
                        }}
                    />
                    <CBTN
                        text="Delete"
                        custom="mr-5"
                        onClick={() => {
                            submitData(saveRenewalData, "delete", loadData);
                        }}
                    />
                </>
            );
        }
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text="Lessee *"
                                        name={"lesse"}
                                        value={searchData.lesse}
                                        resultList={parameters.lesseeList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"vendor_name"}
                                        getVal={"id"}
                                    />
                                    <INPUT
                                        type="date"
                                        text="Start Date"
                                        name={"date_from"}
                                        value={searchData.date_from}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                date_from: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-5">
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
                                    <INPUT
                                        type="date"
                                        text="End Date *"
                                        name={"date_to"}
                                        value={searchData.date_to}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                date_to: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2 mb-3">
                                <div className="col-6 d-flex justify-content-start flex-wrap">
                                    <CBTN
                                        text="Search"
                                        custom="mr-5"
                                        onClick={() => {
                                            searchBTN(
                                                searchData,
                                                null,
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
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <div
                                    className="renew-header"
                                    style={{ background: "#E80000" }}
                                >
                                    <h3>contracts</h3>
                                    <div className="contract-display">
                                        <div className="d-flex">
                                            <p className="contract-filtered">
                                                Contract Filtered:
                                            </p>
                                            <span style={{ color: "#fff" }}>
                                                {filteredList.length}
                                            </span>
                                        </div>
                                        <div className="d-flex">
                                            <p className="selected-contract">
                                                Selected Contract:
                                            </p>
                                            <span style={{ color: "#fff" }}>
                                                {countSelectedCD}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <LoadDataTable
                                        data={filteredList}
                                        columns={tableColumn}
                                        selectableRowsSingle={false}
                                        onSelectedRowsChange={(e) => {
                                            handleselectedContractData(
                                                e,
                                                setCountSelectedCD,
                                                saveData,
                                                setSaveData
                                            );
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        name={"brand_id"}
                                        text="Brand"
                                        value={saveData.brand_id}
                                        resultList={parameters.brandList}
                                        state={saveData}
                                        setState={setSaveData}
                                        searchKey={"brand_name"}
                                        getVal={"id"}
                                    />

                                    <INPUT
                                        type="date"
                                        text="Start Date *"
                                        name={"start_date"}
                                        value={saveData.start_date}
                                        onChange={(e) => {
                                            setSaveData({
                                                ...saveData,
                                                start_date: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="date"
                                        text="Installation Date"
                                        name={"installation_date"}
                                        value={saveData.installation_date}
                                        onChange={(e) => {
                                            setSaveData({
                                                ...saveData,
                                                installation_date:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type="date"
                                        text="End Date *"
                                        name={"end_date"}
                                        value={saveData.end_date}
                                        onChange={(e) => {
                                            setSaveData({
                                                ...saveData,
                                                end_date: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2 mb-2">
                                <div className="col-6 d-flex flex-wrap">
                                    <CBTN
                                        text="Save"
                                        custom="mr-5"
                                        onClick={() => {
                                            submitData(
                                                saveData,
                                                "for renewal",
                                                loadData
                                            );
                                        }}
                                    />
                                    <CBTN
                                        text="Clear"
                                        onClick={() => {
                                            clearSaveBTN(setSaveData);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="card">
                                <div
                                    className="renew-header"
                                    style={{ background: "#E80000" }}
                                >
                                    <h3>contracts for renewal</h3>
                                    <div className="contract-display">
                                        <div className="d-flex">
                                            <p className="contract-filtered">
                                                Contract Filtered:
                                            </p>
                                            <span style={{ color: "#fff" }}>
                                                {renewalList.length}
                                            </span>
                                        </div>
                                        <div className="d-flex">
                                            <p className="selected-contract">
                                                Selected Contract:
                                            </p>
                                            <span style={{ color: "#fff" }}>
                                                {saveRenewalData.id.split(
                                                    ","
                                                ) == ""
                                                    ? 0
                                                    : saveRenewalData.id.split(
                                                          ","
                                                      ).length}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <LoadDataTable
                                        data={renewalList}
                                        columns={forRenewalColumns}
                                        selectableRowsSingle={false}
                                        onSelectedRowsChange={(e) => {
                                            handleselectedRenewalData(
                                                e,
                                                setRenewalCount,
                                                saveRenewalData,
                                                setSaveRenewalData,
                                                renewalList
                                            );
                                        }}
                                    />
                                </div>

                                <div className="py-3">
                                    {renewalSubmitButton()}
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

export default Renew;
