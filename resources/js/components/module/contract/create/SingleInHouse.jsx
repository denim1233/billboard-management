import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../a_custom/ApiServices";

import { SEARCHDATA, INPUT, CLINK, CBTN } from "../../a_custom/Custom";

import { getData } from "../../a_custom/Load";

// ==================================================================

const saveBTN = (inhouseData, navigate) => {
    if (inhouseData.brand_id != "" && inhouseData.start_date != "") {
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
                    data: [inhouseData],
                }).then((res) => {
                    toast.fire({
                        icon: "success",
                        title: "Inhouse Contract Created Successfully!",
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

const clearBTN = (inhouseData, setInhouseData) => {
    setInhouseData({
        ...inhouseData,
        brand_id: "",
        start_date: "",
    });
};

// ==================================================================

const SingleInhouse = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [selectedSlot, setSelectedSlot] = useState({
        width: "",
        length: "",
        uom_name: "",
        type_name: "",
    });
    const [brandLOV, setBrandLOV] = useState([]);

    const [inhouseData, setInhouseData] = useState({
        brand_id: "",
        start_date: "",
        slot_id: "",
        is_new: 8,
        contract_type: 3,
        status_id: 1,
        approval_status: 6,
    });

    useEffect(() => {
        getData(API.get_brand_url, setBrandLOV);
        const param = {
            params: { id: id },
        };
        axios.get(API.get_slot_url, param).then(({ data }) => {
            let result = data.filter((c) => c.slot_id == id);
            setSelectedSlot({
                ...selectedSlot,
                width: result[0].width,
                length: result[0].length,
                uom_name: result[0].uom_name,
                type_name: result[0].type_name,
                branch_name: result[0].branch_name,
                slot_number: result[0].slot_number,
            });
            setInhouseData({ ...inhouseData, slot_id: result[0].slot_id });
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
                                        <b>
                                            Contract: In-House:{" "}
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
                                <div className="col-5">
                                    <SEARCHDATA
                                        text={"Brand"}
                                        name={"brand_id"}
                                        value={inhouseData.brand_id}
                                        resultList={brandLOV}
                                        state={inhouseData}
                                        setState={setInhouseData}
                                        searchKey={"brand_name"}
                                        getVal={"id"}
                                    />
                                    <INPUT
                                        type={"date"}
                                        text={"Start Date"}
                                        name={"start_date"}
                                        value={inhouseData.start_date}
                                        onChange={(e) => {
                                            setInhouseData({
                                                ...inhouseData,
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
                                        saveBTN(inhouseData, navigate);
                                    }}
                                />
                                <CBTN
                                    text={"Clear"}
                                    custom="mx-5"
                                    onClick={() => {
                                        clearBTN(inhouseData, setInhouseData);
                                    }}
                                />
                                <CLINK text={"Back"} to={"/create-contract"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleInhouse;
