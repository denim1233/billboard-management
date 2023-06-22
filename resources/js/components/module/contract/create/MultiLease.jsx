import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import { slotColumns } from "../../a_custom/ColumnList";
import {
    LoadDataTable,
    SEARCHDATA,
    MULTILOV,
    INPUT,
    CLINK,
    CBTN,
    LOV,
} from "../../a_custom/Custom";
import { getLeaseParameters } from "../../a_custom/Load";
import Helper from "../../../../utils/Helper.js";
import CurrencyField from "../../../CurrencyField.jsx";
// ==========================================================================================

const searchBTN = async (
    searchData,
    setSlotList,
    multiLeaseData,
    setMultiLeaseData
) => {
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
            title: "Please fill up misisng fields",
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

const onSelectedRow = (e, multiLeaseData, setMultiLeaseData) => {
    let selected = e.selectedRows;
    let slotID = [];
    selected.map((d) => slotID.push(d.slot_id));
    setMultiLeaseData({
        ...multiLeaseData,
        slot_id: slotID.toString(),
    });
};

const submitBTN = (multiLeaseData, navigate) => {
    console.log(multiLeaseData);
    // return

    // && multiLeaseData.installation_date != ""

    if (
        multiLeaseData.slot_id != "" &&
        multiLeaseData.brand_id != "" &&
        multiLeaseData.start_date != "" &&
        multiLeaseData.end_date != "" &&
        multiLeaseData.rental_id != "" &&
        multiLeaseData.lesse != "" &&
        multiLeaseData.payment_id != ""
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
                    data: [multiLeaseData],
                }).then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Lease Contract Created Successfully!",
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

const clearSubmitBTN = (multiLeaseData, setMultiLeaseData, setSlotList) => {
    setMultiLeaseData({
        ...multiLeaseData,
        lesse: "",
        payment_id: "",
        start_date: "",
        no_of_months: "",
        contract_price: "",
        terms_of_contract: "",
        brand_id: "",
        installation_date: "",
        end_date: "",
        rental_id: "",
        material: "",
        remarks: "",
    });
    // setSlotList([]);
};

// ==========================================================================================

const MultiLease = () => {
    const navigate = useNavigate();

    const [slotList, setSlotList] = useState([]);

    const [searchData, setSearchData] = useState({
        branch_id: "",
        type_id: "",
        status_id: 4,
    });

    const [multiLeaseData, setMultiLeaseData] = useState({
        lesse: "",
        payment_id: "",
        start_date: "",
        no_of_months: "",
        contract_price: "",
        terms_of_contract: "",
        brand_id: "",
        installation_date: "",
        end_date: "",
        rental_id: "",
        material: "",
        remarks: "",
        is_new: 8,
        status_id: 1,
        contract_type: 5,
        approval_status: 10,
        slot_id: "",
    });

    const [parameters, setParameters] = useState({
        lesseeList: [],
        branchList: [],
        brandList: [],
        paymentList: [],
        rentalList: [],
    });

    useEffect(() => {
        axios.get(API.get_lease_parameters).then(({ data }) => {
            let result = data.branch.map((res) => {
                return {
                    label: res["branch_name"],
                    value: res["branch_name"],
                };
            });
            setParameters({
                lesseeList: data.lesse,
                branchList: data.branch,
                brandList: data.brand,
                paymentList: data.modeofpayment,
                rentalList: data.rental,
                typeList: data.type,
            });
        });
    }, []);

    useEffect(() => {
        if (multiLeaseData.payment_id != "") {
            let a = parameters.paymentList.filter((d) =>
                d.id == multiLeaseData.payment_id ? d : ""
            );
            setMultiLeaseData({
                ...multiLeaseData,
                no_of_months: a[0].no_of_months,
                terms_of_contract: a[0].terms_of_contract,
            });
        }
    }, [multiLeaseData.payment_id]);

    useEffect(() => {
        if (
            multiLeaseData.rental_id != "" &&
            multiLeaseData.no_of_months != ""
        ) {
            let a = parameters.rentalList.filter(
                (d) => d.id == multiLeaseData.rental_id
            );
            let contract_price =
                Helper.toNumber(multiLeaseData.no_of_months) *
                Helper.toNumber(a[0].monthly_rental);
            setMultiLeaseData({
                ...multiLeaseData,
                contract_price: contract_price,
            });
        }
    }, [multiLeaseData.rental_id, multiLeaseData.no_of_months]);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        <b>Contract: Lease</b>
                                    </p>
                                    <hr />
                                </div>
                                <div className="col-5">
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

                                            var index =
                                                e.nativeEvent.target
                                                    .selectedIndex;
                                            setMultiLeaseData({
                                                ...multiLeaseData,
                                                material:
                                                    e.nativeEvent.target[index]
                                                        .text,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="py-3">
                                <CBTN
                                    text={"Search"}
                                    onClick={() => {
                                        searchBTN(
                                            searchData,
                                            setSlotList,
                                            multiLeaseData,
                                            setMultiLeaseData
                                        );
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
                        </div>
                    </div>
                    <div className="col-12">
                        <LoadDataTable
                            columns={slotColumns}
                            data={slotList}
                            selectableRowsSingle={false}
                            onSelectedRowsChange={(e) => {
                                onSelectedRow(
                                    e,
                                    multiLeaseData,
                                    setMultiLeaseData
                                );
                            }}
                        />
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body d-flex align-items-center gap-4">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-5 mr-auto">
                                            <SEARCHDATA
                                                text={"Lessee"}
                                                name={"lesse"}
                                                value={multiLeaseData.lesse}
                                                resultList={
                                                    parameters.lesseeList
                                                }
                                                state={multiLeaseData}
                                                setState={setMultiLeaseData}
                                                searchKey={"vendor_name"}
                                                getVal={"id"}
                                            />
                                            <LOV
                                                text={"Mode of Payment"}
                                                name={"payment_id"}
                                                value={
                                                    multiLeaseData.payment_id
                                                }
                                                options={parameters.paymentList}
                                                opLabel={"mode_of_payment"}
                                                opValue={"id"}
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        payment_id:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <INPUT
                                                type={"date"}
                                                text={"Start Date"}
                                                name={"start_date"}
                                                value={
                                                    multiLeaseData.start_date
                                                }
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        start_date:
                                                            e.target.value,
                                                    });
                                                }}
                                            />

                                            <CurrencyField
                                                type={"text"}
                                                text={"Number of Months"}
                                                value={
                                                    multiLeaseData.no_of_months
                                                }
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        no_of_months: e,
                                                    });
                                                }}
                                                disabled={false}
                                            />

                                            <CurrencyField
                                                id={"txtContractPrice"}
                                                name={"txtContractPrice"}
                                                type={"text"}
                                                text={"Contract Price"}
                                                value={
                                                    multiLeaseData.contract_price
                                                }
                                                disabled={true}
                                                onChange={(e) => {
                                                    setLeaseData({
                                                        ...multiLeaseData,
                                                        contract_price: e,
                                                    });
                                                }}
                                            />
                                            <INPUT
                                                type={"text"}
                                                text={"Terms of Contracts"}
                                                value={
                                                    multiLeaseData.terms_of_contract
                                                }
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        terms_of_contract:
                                                            e.target.value,
                                                    });
                                                }}
                                                isRO={false}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <SEARCHDATA
                                                text={"Brand"}
                                                name={"brand_id"}
                                                value={multiLeaseData.brand_id}
                                                resultList={
                                                    parameters.brandList
                                                }
                                                state={multiLeaseData}
                                                setState={setMultiLeaseData}
                                                searchKey={"brand_name"}
                                                getVal={"id"}
                                            />
                                            <INPUT
                                                type={"date"}
                                                text={"Installation Date"}
                                                name={"installation_date"}
                                                value={
                                                    multiLeaseData.installation_date
                                                }
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        installation_date:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <INPUT
                                                type={"date"}
                                                text={"End Date"}
                                                name={"end_date"}
                                                value={multiLeaseData.end_date}
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        end_date:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <LOV
                                                text={"Monthly Rental"}
                                                name={"rental_id"}
                                                value={multiLeaseData.rental_id}
                                                options={parameters.rentalList}
                                                opLabel={"monthly_rental"}
                                                opValue={"id"}
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        rental_id:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                            <INPUT
                                                type={"text"}
                                                text={"Material"}
                                                value={multiLeaseData.material}
                                                onChange={() => {}}
                                                isRO={true}
                                            />
                                            <INPUT
                                                type={"text"}
                                                text={"Remarks"}
                                                name={"remarks"}
                                                value={multiLeaseData.remarks}
                                                onChange={(e) => {
                                                    setMultiLeaseData({
                                                        ...multiLeaseData,
                                                        remarks: e.target.value,
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
                                                    multiLeaseData,
                                                    navigate
                                                );
                                            }}
                                        />
                                        <CBTN
                                            text={"Clear"}
                                            custom={"mx-5"}
                                            onClick={() => {
                                                clearSubmitBTN(
                                                    multiLeaseData,
                                                    setMultiLeaseData,
                                                    setSlotList
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
            </div>
        </>
    );
};

export default MultiLease;
