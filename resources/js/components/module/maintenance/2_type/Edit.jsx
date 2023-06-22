import axios from "axios";
import { type } from "jquery";
import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const saveBTN = (sizeList, navigate, typeData) => {
    if (sizeList[0].type != "") {
        const formData = {
            id: typeData.id,
            size_id: sizeList.map((r) => r.id).toString(),
            type_name: typeData.type_name,
            material: typeData.material,
            length: sizeList.map((r) => r.length).toString(),
            width: sizeList.map((r) => r.width).toString(),
            uom_id: sizeList.map((r) => r.uom_id).toString(),
            size_status_id: sizeList.map((r) => r.size_status_id).toString(),
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
    setSizeList({
        type_name: "",
        material: "",
        length: "",
        width: "",
        uom_id: "1",
    });
};

const Edit = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [uomList, setUomList] = useState([]);

    const [sizeData, setSizeData] = useState([
        {
            size_id: "",
            type_name: "",
            material: "",
            length: "",
            width: "",
            uom_id: "1",
            status_id: "",
        },
    ]);

    const [sizeList, setSizeList] = useState([
        {
            size_id: "",
            type_name: "",
            material: "",
            length: "",
            width: "",
            uom_id: "1",
            status_id: "",
        },
    ]);

    const [typeData, setType] = useState([
        { id: "", type_name: "", material: "" },
    ]);

    const updateSizeData = (e, i) => {
        const { name, value } = e.target;
        let list = [...sizeData];
        list[i][name] = value;
        setSizeData(list);
    };

    const handleChange = useCallback(
        (event) => {
            setType({
                ...typeData,
                [event.target.name]: event.target.value,
            });
        },
        [typeData]
    );

    const addSizeList = () => {
        let obj = [{ length: "", width: "", uom_id: "1" }];
        setSizeList([...sizeData, ...obj]);
        setSizeData([...sizeData, ...obj]);
    };

    const deleteSizeList = (id, i) => {
        let list = [...sizeList];
        let param = [...sizeData];
        param.splice(i, 1);
        setSizeList(list);
        setSizeData(param);
        //update the original list of data
        for (var x in list) {
            if (list[x].id == id) {
                list[x].size_status_id = 2;
                break;
            }
        }
        // console.log(list);
        setSizeList(list);
    };

    useEffect(() => {
        axios.get(API.get_type_url + "/" + id).then(({ data }) => {
            let result = data.filter((c) => c.id == id);
            setType({
                id: result[0].id,
                type_name: result[0].type_name,
                material: result[0].material,
            });
        });

        axios.get(API.get_uom_url).then((res) => {
            setUomList(res.data);
        });

        axios.get(API.get_size_url + id).then((res) => {
            setSizeData(res.data);
            setSizeList(res.data);
        });
    }, []);

    const textStyle = {
        width: "10rem",
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={"edit type"} />

                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <INPUT
                                        type="text"
                                        text="Type*"
                                        name={"type_name"}
                                        value={typeData.type_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="text"
                                        text="Material"
                                        name={"material"}
                                        value={typeData.material}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12 py-2">
                                    <hr />
                                </div>

                                {sizeData?.map((d, i) => {
                                    return (
                                        <div
                                            className="col-lg-12 d-flex gap-4 flex-wrap"
                                            key={i}
                                        >
                                            <div className="form-group mr-4">
                                                <label>Length</label>
                                                <input
                                                    type="text"
                                                    name="length"
                                                    className="form-control"
                                                    value={d.length}
                                                    style={textStyle}
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group mr-4">
                                                <label>Width</label>
                                                <input
                                                    type="text"
                                                    name="width"
                                                    className="form-control"
                                                    value={d.width}
                                                    style={textStyle}
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group mr-5">
                                                <label>Uom</label>
                                                <select
                                                    name="uom_id"
                                                    value={d.uom_id}
                                                    style={textStyle}
                                                    onChange={(e) => {
                                                        updateSizeData(e, i);
                                                    }}
                                                    className="form-control"
                                                >
                                                    {uomList?.map((r) => {
                                                        return (
                                                            <option
                                                                key={r.id}
                                                                value={r.id}
                                                            >
                                                                {r.uom_name}
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
                                                        deleteSizeList(d.id, i);
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
                                        saveBTN(sizeList, navigate, typeData);
                                    }}
                                />
                                <CLINK text="Back" custom="mx-5" to="/type" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
