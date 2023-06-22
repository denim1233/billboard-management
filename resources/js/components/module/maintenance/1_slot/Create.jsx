import { useState, useEffect } from "react";
import { API } from "../../a_custom/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import {
    SEARCHDATA,
    CardHeader,
    RADIO,
    INPUT,
    CLINK,
    CBTN,
    LABEL,
    RADIOBUTTON,
} from "../../a_custom/Custom";

import { slotParameters, getSize } from "../../a_custom/Load";

const addBTN = (slotData, navigate) => {
    if (
        slotData.branch_id != "" &&
        slotData.type_id != "" &&
        slotData.size_id != "" &&
        slotData.slot_number != ""
    ) {
        axios({
            url: API.manage_slot_url,
            method: "post",
            data: slotData,
        }).then((res) => {
            if (res.data.status_id === 0) {
                toast.fire({
                    icon: "success",
                    title: "Slot is not available!",
                });
            } else {
                toast.fire({
                    icon: "success",
                    title: "Slot Created Successfully!",
                });

                navigate("/slot");
            }
        });
    } else {
        toast.fire({
            icon: "error",
            title: "Please fill up missing fields",
        });
    }
};

const clearBTN = (slotData, setSlotData) => {
    setSlotData({
        ...slotData,
        slot_number: "",
        branch_id: "",
        type_id: "",
        add_by: "number",
        size: "",
        size_id: "",
    });
};

const Create = () => {
    const [slotList, setSlotList] = useState([]);
    const navigate = useNavigate();
    const [slotData, setSlotData] = useState({
        slot_number: "",
        branch_id: "",
        status_id: 4,
        type_id: "",
        add_by: "number",
        size_id: "",
    });

    const [parameters, setParameters] = useState({
        branchList: [],
        statusList: [],
        typeList: [],
        sizeList: [],
    });

    useEffect(() => {
        slotParameters(parameters, setParameters);
        document.querySelector("#rd-number").checked = true;
    }, []);

    useEffect(() => {
        if (slotData.type_id != "") {
            getSize(slotData.type_id, parameters, setParameters);
        }
    }, [slotData.type_id]);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto ">
                                    <RADIO
                                        name="add_by"
                                        text="Add by"
                                        onChange={(e) => {
                                            setSlotData({
                                                ...slotData,
                                                add_by: e.target.value,
                                            });
                                            console.log(slotData);
                                        }}
                                    />
                                </div>

                                <div className="col-5 mr-auto "></div>

                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text={"Branch*"}
                                        name={"branch_id"}
                                        value={slotData.branch_id}
                                        resultList={parameters.branchList}
                                        state={slotData}
                                        setState={setSlotData}
                                        searchKey={"branch_name"}
                                        getVal={"id"}
                                    />
                                    <SEARCHDATA
                                        text={"Type*"}
                                        name={"type_id"}
                                        value={slotData.type_id}
                                        resultList={parameters.typeList}
                                        state={slotData}
                                        setState={setSlotData}
                                        searchKey={"type_name"}
                                        getVal={"id"}
                                    />
                                </div>
                                <div className="col-5">
                                    <div className="form-group d-flex align-items-center">
                                        <div style={{ width: "35%" }}>
                                            <label>Size*</label>
                                        </div>
                                        <div style={{ width: "65%" }}>
                                            <select
                                                name="size_id"
                                                value={slotData.size_id}
                                                onChange={(e) => {
                                                    setSlotData({
                                                        ...slotData,
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
                                                                {res.width +
                                                                    "x" +
                                                                    res.length +
                                                                    " " +
                                                                    res.uom_name}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <INPUT
                                        type={"number"}
                                        text={"Slot Number/Quantity"}
                                        value={slotData.slot_number}
                                        onChange={(e) => {
                                            setSlotData({
                                                ...slotData,
                                                slot_number: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <CBTN
                                    text="Add"
                                    onClick={() => {
                                        addBTN(slotData, navigate);
                                    }}
                                />
                                <CBTN
                                    text="Clear"
                                    custom="mx-5"
                                    onClick={() => {
                                        clearBTN(slotData, setSlotData);
                                    }}
                                />
                                <CLINK text="Back" to="/slot" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="current slots" />
                    <div className="card-body"></div>
                </div>
            </div>
        </>
    );
};

export default Create;
