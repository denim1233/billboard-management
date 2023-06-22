import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import { SEARCHDATA, INPUT, CLINK, CBTN, LOV } from "../../a_custom/Custom";
import { getLeaseParameters } from "../../a_custom/Load";
import { getData } from "../../a_custom/Load";

// =================================================================

const submitBTN = async (leaseData, navigate) => {
    // && leaseData.installation_date != ""
    if (
        leaseData.brand_id != "" &&
        leaseData.start_date != "" &&
        leaseData.end_date != "" &&
        leaseData.rental_id != "" &&
        leaseData.lesse != "" &&
        leaseData.payment_id != ""
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
                await axios({
                    url: API.manage_contract_url,
                    method: "post",
                    data: [leaseData],
                }).then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Lease Contract Modified Successfully!",
                    });
                    navigate("/modification");
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

const clearBTN = (leaseData, setLeaseData) => {
    setLeaseData({
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
        modify: 1,
    });
};

// =================================================================

const ModifyLease = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [selectedSlot, setSelectedSlot] = useState({
        width: "",
        length: "",
        uom_name: "",
        type_name: "",
    });

    const [leaseData, setLeaseData] = useState({
        slot_id: "",
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
        is_new: 8,
        contract_type: 5,
        status_id: 1,
        remarks: "",
        approval_status: 10,
        modify: 1,
    });

    const [parameters, setParameters] = useState({
        lesseeList: [],
        brandList: [],
        paymentList: [],
        rentalList: [],
    });
    const [brandLOV, setBrandLOV] = useState([]);

    useEffect(() => {
        getLeaseParameters(parameters, setParameters);
        getData(API.get_brand_url, setBrandLOV);
        const param = {
            params: { id: id },
        };

        axios.get(API.get_contract_url, param).then(({ data }) => {
            setLeaseData({
                ...leaseData,
                id: data[0].id,
                brand_id: data[0].brand_id,
                start_date: data[0].start_date,
                brand_name: data[0].brand_name,
                vendor_name: data[0].vendor_name,
                slot_id: data[0].slot_id,
                payment_id: data[0].mode_of_payment,
                terms_of_contract: data[0].terms_of_contract,
                number_of_months: data[0].number_of_months,
                installation_date: data[0].installation_date,
                end_date: data[0].end_date,
                rental_id: data[0].rental_id,
                material: data[0].material,
                remarks: data[0].remarks,
                lesse: data[0].vendor_id,
                contract_price: data[0].contract_price,
            });
        });
    }, []);

    useEffect(() => {
        if (leaseData.payment_id != "") {
            let a = parameters.paymentList.filter((d) =>
                d.id == leaseData.payment_id ? d : ""
            );
            if (a && a[0]) {
                setLeaseData({
                    ...leaseData,
                    no_of_months: a[0].no_of_months,
                    terms_of_contract: a[0].terms_of_contract,
                });
            }
        }
    }, [leaseData.payment_id]);

    useEffect(() => {
        const param = {
            params: { id: id },
        };
        axios.get(API.get_slot_url, param).then((res) => {
            let data = res.data.filter((c) => c.slot_id == id);
            setSelectedSlot({
                ...selectedSlot,
                width: data[0].width,
                length: data[0].length,
                uom_name: data[0].uom_name,
                type_name: data[0].type_name,
                branch_name: data[0].branch_name,
                slot_number: data[0].slot_number,
            });
        });
    }, []);

    useEffect(() => {
        // if this in comment cant get the contract price
        // if (leaseData.rental_id != "" && leaseData.no_of_months != "") {
        //     let a = parameters.rentalList.filter(
        //         (d) => d.id == leaseData.rental_id
        //     );
        //     if (a && a[0]) {
        //         let contract_price =
        //             leaseData.no_of_months * Number(a[0].monthly_rental);
        //         setLeaseData({ ...leaseData, contract_price: contract_price });
        //     }
        // }
    }, [leaseData.rental_id, leaseData.no_of_months]);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        <b>
                                            Contract: Lease:{" "}
                                            {selectedSlot.width +
                                                " x " +
                                                selectedSlot.length +
                                                " " +
                                                selectedSlot.uom_name}
                                            ., {selectedSlot.type_name},{" "}
                                            {selectedSlot.slot_number} @{" "}
                                            {selectedSlot.branch_name}
                                        </b>
                                    </p>
                                    <hr />
                                </div>
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text={"Lessee"}
                                        name={"lesse"}
                                        value={leaseData.lesse}
                                        resultList={parameters.lesseeList}
                                        state={leaseData}
                                        setState={setLeaseData}
                                        searchKey={"vendor_name"}
                                        getVal={"id"}
                                        displayText={leaseData.vendor_name}
                                    />

                                    <LOV
                                        text={"Mode of Payment"}
                                        name={"payment_id"}
                                        value={leaseData.payment_id}
                                        options={parameters.paymentList}
                                        opLabel={"mode_of_payment"}
                                        opValue={"id"}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                payment_id: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type={"date"}
                                        text={"Start Date"}
                                        name={"start_date"}
                                        value={leaseData.start_date}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                start_date: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type={"text"}
                                        text={"Number of Months"}
                                        value={leaseData.no_of_months}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                no_of_months: e.target.value,
                                            });
                                        }}
                                        isRO={true}
                                    />
                                    <INPUT
                                        type={"text"}
                                        text={"Contract Price"}
                                        value={leaseData.contract_price}
                                        onChange={() => {}}
                                        isRO={true}
                                    />
                                    <INPUT
                                        type={"text"}
                                        text={"Terms of Contracts"}
                                        value={leaseData.terms_of_contract}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                terms_of_contract:
                                                    e.target.value,
                                            });
                                        }}
                                        isRO={true}
                                    />
                                </div>
                                <div className="col-5">
                                    <SEARCHDATA
                                        text={"Brand"}
                                        name={"brand_id"}
                                        value={leaseData.brand_id}
                                        resultList={parameters.brandList}
                                        state={leaseData}
                                        setState={setLeaseData}
                                        searchKey={"brand_name"}
                                        getVal={"id"}
                                        displayText={leaseData.brand_name}
                                    />

                                    <INPUT
                                        type={"date"}
                                        text={"Installation Date"}
                                        name={"installation_date"}
                                        value={leaseData.installation_date}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                installation_date:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type={"date"}
                                        text={"End Date"}
                                        name={"end_date"}
                                        value={leaseData.end_date}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                end_date: e.target.value,
                                            });
                                        }}
                                    />
                                    <LOV
                                        text={"Monthly Rental"}
                                        name={"rental_id"}
                                        value={leaseData.rental_id}
                                        options={parameters.rentalList}
                                        opLabel={"monthly_rental"}
                                        opValue={"id"}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                rental_id: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type={"text"}
                                        text={"Material"}
                                        value={leaseData.material}
                                        onChange={() => {}}
                                        isRO={true}
                                    />
                                    <INPUT
                                        type={"text"}
                                        text={"Remarks"}
                                        name={"remarks"}
                                        value={leaseData.remarks}
                                        onChange={(e) => {
                                            setLeaseData({
                                                ...leaseData,
                                                remarks: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="py-3">
                                    <CBTN
                                        text={"Submit"}
                                        onClick={() => {
                                            submitBTN(leaseData, navigate);
                                        }}
                                    />
                                    <CBTN
                                        text={"Clear"}
                                        custom="mx-5"
                                        onClick={() => {
                                            clearBTN(leaseData, setLeaseData);
                                        }}
                                    />
                                    <CLINK text={"Back"} to={"/modification"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModifyLease;
