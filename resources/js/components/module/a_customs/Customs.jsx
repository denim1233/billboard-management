import Select from "react-select";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { deactivateData } from "./Functions";
import { useState } from "react";

export const SearchData = ({
    text,
    value,
    setValue,
    custom,
    hasLabel = true,
}) => {
    return (
        <div className={"form-group d-flex align-items-center mb-0 " + custom}>
            <div style={{ width: "35%", display: hasLabel ? "block" : "none" }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width: "65%" }}>
                <input
                    type="search"
                    value={value}
                    onChange={(e) => {
                        setValue((c) => (c = e.target.value));
                    }}
                    placeholder="Search..."
                    className="form-control"
                />
            </div>
        </div>
    );
};

export const RADIO = ({ name, text, onChange }) => {
    return (
        <div className="form-group d-flex" style={{ width: "50%" }}>
            <div style={{ width: "35%" }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div className="form-check px-5">
                <input
                    className="form-check-input"
                    type="radio"
                    onChange={onChange}
                    value="quantity"
                    name={name}
                    id="radio1"
                />
                <label htmlFor="radio1">Number</label>
            </div>
            <div className="form-check ml-auto px-5">
                <input
                    className="form-check-input"
                    type="radio"
                    onChange={onChange}
                    value="number"
                    name={name}
                    id="radio2"
                />
                <label htmlFor="radio2">Quantity</label>
            </div>
        </div>
    );
};

export const SEARCHINPUT = ({
    id,
    text,
    name,
    state,
    getVal,
    setState,
    resultList,
    searchKey,
    Lwidth = "35%",
    Iwidth = "65%",
}) => {
    const [filtered, setFiltered] = useState([]);
    const [skey, setSkey] = useState("");

    const handleSearch = (e) => {
        const { value } = e.target;

        if (value.length > 2) {
            let result = resultList.filter((d) =>
                d[searchKey].toLowerCase().includes(value.toLowerCase())
            );
            setFiltered(result);
        } else {
            setFiltered([]);
            setState({ ...state, [name]: "" });
        }
        setSkey((c) => (c = value));
    };

    const handleSetValue = (e) => {
        setSkey(e.target.innerText);
        setState({ ...state, [name]: e.target.classList.value });
        setFiltered([]);
    };

    const clearAll = () => {
        setSkey("");
        setFiltered([]);
        setState({ ...state, [name]: "" });
    };

    return (
        <div className={"form-group d-flex align-items-center "}>
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width: Iwidth }} className="div-search-input">
                <input
                    id={id}
                    type="text"
                    className="form-control text-uppercase"
                    value={skey}
                    onChange={handleSearch}
                />
                {filtered.length > 0 ? (
                    <i
                        className="fas fa-times search-input-icon"
                        onClick={clearAll}
                    ></i>
                ) : (
                    <i className="fas fa-search search-input-icon"></i>
                )}

                <ul
                    className="search-ul-result"
                    style={{
                        border: filtered.length > 0 ? "1px solid #ccc" : "none",
                    }}
                >
                    {filtered?.map((d) => {
                        return (
                            <li
                                key={d.id}
                                className={d[getVal]}
                                onClick={handleSetValue}
                            >
                                {d[searchKey]}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export const INPUT = ({
    type,
    name,
    text,
    value,
    custom = "",
    onChange,
    Lwidth = "35%",
    Iwidth = "65%",
    isRO = false,
}) => {
    return (
        <div className={"form-group d-flex align-items-center " + custom}>
            <div style={{ width: Lwidth }}>
                <label className="text">{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className="form-control"
                    onChange={onChange}
                    readOnly={isRO}
                />
            </div>
        </div>
    );
};

export const TEXTAREA = ({
    type,
    name,
    text,
    value,
    custom = "",
    onChange,
    Lwidth = "35%",
    Iwidth = "65%",
    isRO = false,
}) => {
    return (
        <div className={"form-group d-flex align-items-start " + custom}>
            <div style={{ width: Lwidth }}>
                <label>{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                {/* <input type={type} name={name} value={value} className="form-control text-uppercase" onChange={onChange} readOnly={isRO}/> */}
                <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={value}
                    onChange={onChange}
                ></textarea>
            </div>
        </div>
    );
};

export const LOV = ({
    name,
    text,
    options,
    onChange,
    Lwidth = "35%",
    Iwidth = "65%",
}) => {
    return (
        <div className="form-group d-flex align-items-center">
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                <Select
                    // defaultValue={{ label: "Select Dept", value: 0 }}
                    name={name}
                    options={options}
                    placeholder="Search and Select"
                    isClearable={true}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export const CBTN = ({ text, onClick, custom = "" }) => {
    return (
        <button
            type="button"
            className={"custom-btn " + custom}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export const CLINK = ({ text, to, custom = "" }) => {
    return (
        <Link className={"custom-btn " + custom} to={to}>
            {text}
        </Link>
    );
};

export const LoadDataTable = ({
    columns,
    data,
    isSelectable = true,
    onSelectedRow,
    isSingle = true,
}) => {
    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
            selectableRows={isSelectable}
            fixedHeaderScrollHeight="450px"
            highlightOnHover
            striped
            onSelectedRowsChange={onSelectedRow}
            selectableRowsNoSelectAll={isSingle}
            selectableRowsRadio="radio"
            selectableRowsSingle={isSingle}
        />
    );
};

export const CardHeader = ({ title }) => {
    return (
        <div
            className="card-header text-light"
            style={{ background: "#E80000" }}
        >
            <h3 className="card-title mb-0 text-uppercase">{title}</h3>
        </div>
    );
};

export const ActionBtns = ({ editURL, deleteURL, editData, deleteData }) => {
    const checkURL = () => {
        if (editURL == "/brand/edit/") {
            return "";
        }
        if (editURL == "/branch/edit/") {
            return "";
        } else {
            return (
                <Link className="me-2 edit-icon" to={editURL}>
                    <i className="fa fa-pen"></i>
                </Link>
            );
        }
    };

    return (
        <div className="p-0 m-0">
            {checkURL()}
            {/* <button className="action-btn" onClick={()=>{ deactivateData(deleteURL,deleteData) }}>
                <i className="fa fa-file-excel"></i>
            </button> */}
        </div>
    );
};

export const BoxIcon = ({ title, icon }) => {
    return (
        <div className="col-lg-2 col-md-4">
            <div className="small-box bg-defualt shadow">
                <div className="inner">
                    <h3>150</h3>
                    <p className="text-uppercase">{title}</p>
                </div>
                <div className="icon">{icon}</div>
            </div>
        </div>
    );
};

export const DeleteSlot = ({
    isDelete,
    setIsDelete,
    setRemarks,
    submitData,
}) => {
    return (
        <>
            <div
                className="delete-slot"
                style={{ display: isDelete ? "flex" : "none" }}
            >
                <div className="delete-box">
                    <p>Removal Remarks (Required)</p>
                    <textarea
                        name="remarks"
                        onChange={(e) => {
                            setRemarks((c) => (c = e.target.value));
                        }}
                    ></textarea>

                    <div className="buttons d-flex justify-content-between pt-4">
                        <button className="custom-btn" onClick={submitData}>
                            Submit
                        </button>
                        <button
                            className="custom-btn"
                            onClick={() => setIsDelete(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
