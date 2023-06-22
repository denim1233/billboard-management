import { useState, useEffect, useCallback } from "react";
import { API } from "../../a_custom/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import { INPUT, CLINK, CBTN, LOV } from "../../a_custom/Custom";
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
                    title: "Slot Updated Successfully!",
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

const Create = () => {
    const navigate = useNavigate();
    const [slotData, setSlotData] = useState({
        slot_number: "",
        branch_id: "",
        status_id: 4,
        type_id: "",
        add_by: "",
        size_id: "",
    });
    const { id } = useParams();

    const [parameters, setParameters] = useState({
        branchList: [],
        statusList: [],
        brandList: [],
        typeList: [],
        sizeList: [],
    });

    useEffect(() => {
        slotParameters(parameters, setParameters);
    }, []);

    useEffect(() => {
        if (slotData.type_id != "") {
            getSize(slotData.type_id, parameters, setParameters);
        }
    }, [slotData.type_id]);

    const handleChange = useCallback(
        (event) => {
            setSlotData({
                ...slotData,
                [event.target.name]: event.target.value,
            });
        },
        [slotData]
    );

    useEffect(() => {
        const param = {
            params: { id: id },
        };
        setTimeout(function () {
            axios.get(API.get_slot_url, param).then(({ data }) => {
                let result = data.filter((c) => c.slot_id == id);
                setSlotData({
                    id: result[0].slot_id,
                    brand_id: result[0].brand_id,
                    branch_id: result[0].branch_id,
                    size_id: result[0].size_id,
                    type_id: result[0].type_id,
                    slot_number: result[0].slot_number,
                    add_by: result[0].add_by,
                    status_id: result[0].status_id,
                });
            });
        }, 1000);
    }, []);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <LOV
                                        text={"Branch*"}
                                        value={slotData.branch_id}
                                        options={parameters.branchList}
                                        opValue={"id"}
                                        opLabel={"branch_name"}
                                        onChange={(e) => {}}
                                    />

                                    <LOV
                                        text={"Type*"}
                                        value={slotData.type_id}
                                        options={parameters.typeList}
                                        opValue={"id"}
                                        opLabel={"type_name"}
                                        onChange={(e) => {}}
                                    />

                                    <LOV
                                        text={"Brand"}
                                        value={slotData.brand_id}
                                        options={parameters.brandList}
                                        opValue={"id"}
                                        opLabel={"brand_name"}
                                        onChange={(e) => {
                                            setSlotData({
                                                ...slotData,
                                                brand_id: e.target.value,
                                            });
                                        }}
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
                                    text="Save"
                                    onClick={() => {
                                        addBTN(slotData, navigate);
                                    }}
                                />
                                <CLINK text="Back" custom="mx-4" to="/slot" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
