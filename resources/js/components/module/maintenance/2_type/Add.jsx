import axios from "axios";
import { size } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import {
    LOV,
    INPUT,
    CBTN,
    CLINK,
    RADIO,
    LoadDataTable,
    CardHeader,
} from "../../a_custom/Custom";

import { submitData } from "../../a_custom/Function";

// ==============================================================================================================

const saveBTN = (sizeList, navigate) => {
    if (sizeList[0].type != "") {
        const formData = {
            id: 0,
            size_id: "0,0",
            type_name: sizeList
                .map((r) => r.type)
                .toString()
                .replace(/,/g, ""),
            material: sizeList
                .map((r) => r.material)
                .toString()
                .replace(/,/g, ""),
            length: sizeList.map((r) => r.length).toString(),
            width: sizeList.map((r) => r.width).toString(),
            uom_id: sizeList.map((r) => r.uom_id).toString(),
        };
        submitData(
            API.manage_type_url,
            JSON.stringify([formData]),
            navigate,
            "/type"
        );
    } else {
        toast.fire({
            icon: "error",
            title: "Please fill up missing fields",
        });
    }
};

const clearBTN = (sizeList, setSizeList) => {
    setSizeList([
        { type: "", material: "", length: "", width: "", uom_id: "1" },
    ]);

    console.log(sizeList);
};

// ==============================================================================================================
const Add = () => {
    const navigate = useNavigate();

    const [uomList, setUomList] = useState([]);

    const [sizeList, setSizeList] = useState([
        { type: "", material: "", length: "", width: "", uom_id: "1" },
    ]);

    const addSizeList = () => {
        let obj = [{ length: "", width: "", uom_id: "1" }];
        setSizeList([...sizeList, ...obj]);
    };

    const handleState = (e) => {
        console.log(sizeList);
        const { name, value } = e.target;
        let list = [...sizeList];
        list[0][name] = value;
        setSizeList(list);
    };

    const updateSizeData = (e, i) => {
        const { name, value } = e.target;
        let list = [...sizeList];
        list[i][name] = value;
        setSizeList(list);
    };

    const deleteSizeList = (i) => {
        let list = [...sizeList];
        list.splice(i, 1);
        setSizeList(list);
    };

    useEffect(() => {
        axios.get(API.get_uom_url).then((res) => {
            setUomList(res.data);
        });
    }, []);

    const textStyle = {
        width: "10rem",
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={"add type"} />
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <INPUT
                                        type="text"
                                        name={"type"}
                                        onChange={handleState}
                                        text="Type*"
                                        value={sizeList[0].type}
                                    />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="text"
                                        name={"material"}
                                        onChange={handleState}
                                        text="Material"
                                        value={sizeList[0].material}
                                    />
                                </div>

                                <div className="col-12 py-2">
                                    <hr />
                                </div>
                                {sizeList?.map((d, i) => {
                                    return (
                                        <div
                                            className="col-lg-12 d-flex gap-4 flex-wrap"
                                            key={i}
                                        >
                                            <div className="mr-4 ">
                                                <label>Length</label>
                                                <input
                                                    type="text"
                                                    name="length"
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                    style={textStyle}
                                                    className="form-control "
                                                />
                                            </div>
                                            <div className="form-group mr-4 ">
                                                <label>Width</label>
                                                <input
                                                    type="text"
                                                    name="width"
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                    style={textStyle}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group mr-5">
                                                <label>Uom</label>
                                                <select
                                                    name="uom_id"
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                    style={textStyle}
                                                    className="form-control"
                                                >
                                                    {uomList?.map((d) => {
                                                        return (
                                                            // <option key={d.id} value={d.id}>{d.uom_name +' ('+d.uom_description+')'}</option>
                                                            <option
                                                                key={d.id}
                                                                value={d.id}
                                                            >
                                                                {d.uom_name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    display:
                                                        i == 0 ? "" : "none",
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className="custom-btn"
                                                    style={{
                                                        marginTop: "40px",
                                                    }}
                                                    onClick={() => {
                                                        addSizeList();
                                                    }}
                                                >
                                                    Add Size
                                                </button>
                                            </div>
                                            <div
                                                className="form-group"
                                                style={{
                                                    display:
                                                        i != 0 ? "" : "none",
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    style={{
                                                        marginTop: "34px",
                                                    }}
                                                    className="action-btn"
                                                    onClick={() => {
                                                        deleteSizeList(i);
                                                    }}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="row py-2 col-lg-12">
                                <CBTN
                                    text="Save"
                                    onClick={() => {
                                        saveBTN(sizeList, navigate);
                                    }}
                                />
                                <CBTN
                                    text="Clear"
                                    custom="mx-5"
                                    onClick={() => {
                                        clearBTN(sizeList, setSizeList);
                                    }}
                                />
                                <CLINK text="Back" to="/type" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
