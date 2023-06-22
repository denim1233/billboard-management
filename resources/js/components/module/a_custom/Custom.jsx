import Select from "react-select";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// data table component
export const LoadDataTable = ({
    data,
    columns,
    selectableRows = true,
    onSelectedRowsChange,
    selectableRowsSingle = true,
    toggleCleared = false,
}) => {
    return (
        <DataTable
            fixedHeaderScrollHeight="450px"
            selectableRowsRadio="radio"
            selectableRowsHighlight
            highlightOnHover
            pointerOnHover
            pagination
            striped
            dense
            data={data}
            columns={columns}
            selectableRows={selectableRows}
            selectableRowsSingle={selectableRowsSingle}
            selectableRowsNoSelectAll={selectableRowsSingle}
            onSelectedRowsChange={onSelectedRowsChange}
            clearSelectedRows={toggleCleared}
            // initialState={{ columnVisibility: { id: false,slot_number: false } }}
        />
    );
};

// action button component for datatable
export const ActionBTN = ({
    deactivateURL,
    deactivateDATA,
    editURL = null,
}) => {
    return (
        <div className="p-0 m-0">
            <Link className="me-2 edit-icon" to={editURL}>
                <i className="fa fa-pen"></i>
            </Link>
            <button
                className="action-btn"
                onClick={() => {
                    deactivateData(deactivateURL, deactivateDATA);
                }}
            >
                <i className="fa fa-file-excel"></i>
            </button>
        </div>
    );
};

export const EditBTN = ({ deactivateURL, deactivateDATA, editURL = null }) => {
    return (
        <div className="p-0 m-0">
            <Link className="me-2 edit-icon" to={editURL}>
                <i className="fa fa-pen"></i>
            </Link>
        </div>
    );
};

export const PrintBTN = ({ onClick }) => {
    return (
        <div className="p-0 m-0">
            <button className="me-2 print-icon" onClick={onClick}>
                <i className="fa fa-print"></i>
            </button>
        </div>
    );
};

// box icon for dashboard display
export const BoxIcon = ({ title, icon, value }) => {
    return (
        <div className="col-lg-2 col-md-4">
            <div className="small-box bg-defualt shadow">
                <div className="inner">
                    <h3>{value}</h3>
                    <p>{title}</p>
                </div>
                <div className="icon">{icon}</div>
            </div>
        </div>
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

export const DeleteSlot = ({
    isDelete,
    setIsDelete,
    deleteData,
    setDeleteData,
    deleteFunction,
    searchFunction,
    searchData,
    searchFilter,
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
                        value={deleteData.remarks}
                        onChange={(e) => {
                            setDeleteData({
                                ...deleteData,
                                remarks: e.target.value,
                            });
                        }}
                    ></textarea>
                    <div className="buttons d-flex justify-content-between pt-4">
                        <button
                            className="custom-btn"
                            onClick={() => {
                                if (deleteData.remarks != "") {
                                    deleteFunction(
                                        deleteData,
                                        searchFunction,
                                        searchData,
                                        searchFilter
                                    );
                                    setIsDelete(false);
                                    setDeleteData({
                                        ...deleteData,
                                        remarks: "",
                                    });
                                    // setDeleteData()
                                }
                            }}
                        >
                            Submit
                        </button>
                        <button
                            className="custom-btn"
                            onClick={() => {
                                setIsDelete(false);
                                setDeleteData({ ...deleteData, remarks: "" });
                            }}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const REMARKSBOX = ({
    isDelete,
    setAction,
    saveData,
    setSaveData,
    TitleText,
    submitData,
}) => {
    return (
        <>
            <div
                className="delete-slot"
                style={{ display: isDelete ? "flex" : "none" }}
            >
                <div className="delete-box">
                    <p>{TitleText} </p>

                    <textarea
                        name="remarks"
                        onChange={(e) => {
                            setSaveData({
                                ...saveData,
                                return_remarks: e.target.value,
                            });
                        }}
                    ></textarea>
                    <div className="buttons d-flex justify-content-between pt-4">
                        <button
                            className="custom-btn"
                            onClick={() => {
                                if (saveData.return_remarks != "") {
                                    submitData(saveData, "modify", setSaveData);
                                    setAction(false);
                                } else {
                                    alert("Please Enter Remarks");
                                }
                            }}
                        >
                            Submit
                        </button>
                        <button
                            className="custom-btn"
                            onClick={() => setAction(false)}
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const SearchInput = ({
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
                    className="form-control"
                    placeholder="Search..."
                    onChange={(e) => {
                        setValue((c) => (c = e.target.value));
                    }}
                />
            </div>
        </div>
    );
};

export const RADIO = ({ name, text, onChange }) => {
    return (
        <div className="form-group d-flex" style={{ width: "100%" }}>
            <div style={{ width: "35%" }}>
                <label>{text}</label>
            </div>

            <div className="form-check ">
                <input
                    className="form-check-input"
                    type="radio"
                    onChange={onChange}
                    value="quantity"
                    name={name}
                    id="rd-quantity"
                />
                <label htmlFor="radio2">Quantity</label>
            </div>
            <div className="form-check px-5">
                <input
                    className="form-check-input"
                    type="radio"
                    onChange={onChange}
                    value="number"
                    name={name}
                    id="rd-number"
                />
                <label htmlFor="radio1">Number</label>
            </div>
        </div>
    );
};

export const RADIOBUTTON = ({
    name,
    display,
    onChange,
    value,
    checkedValue,
}) => {
    return (
        <div className="form-check px-4">
            {/* <input  className="form-check-input"  type="radio" onChange={onChange}   checked={true} name={name}  id="radio1"   /> */}
            <input
                className="form-check-input"
                type="radio"
                onChange={onChange}
                // value={value }
                // checked={this.selectedOption === 1}
                checked={checkedValue === 1 ? true : false}
                name={name}
                id={name}
            />
            <label htmlFor={name}>{display}</label>
        </div>
    );
};

export const LABEL = ({ text }) => {
    return (
        <div className="form-group d-flex" style={{ width: "50%" }}>
            <div style={{ width: "35%" }}>
                <label>{text}</label>
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

export const CLINK = ({ text, to, custom = "align-middle" }) => {
    return (
        <Link className={"custom-btn " + custom} to={to}>
            {text}
        </Link>
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
                <label>{text}</label>
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

export const MULTILOV = ({
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
                    options={options}
                    isClearable={true}
                    onChange={onChange}
                    isMulti
                />
            </div>
        </div>
    );
};

export const LOV = ({
    name,
    text,
    value,
    options,
    opValue,
    opLabel,
    onChange,
    Lwidth = "35%",
    Iwidth = "65%",
}) => {
    return (
        <div className="form-group d-flex align-items-center">
            <div style={{ width: Lwidth }}>
                <label>{text}</label>
            </div>
            <div style={{ width: Iwidth }}>
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control"
                >
                    <option value=""></option>
                    {options?.map((res) => {
                        return (
                            <option key={res[opValue]} value={res[opValue]}>
                                {res[opLabel]}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export const SEARCHDATA = ({
    isEdit = false,
    text,
    name,
    state,
    value,
    getVal,
    setState,
    resultList,
    searchKey,
    Lwidth = "35%",
    Iwidth = "65%",
    displayText = "",
}) => {
    const [filtered, setFiltered] = useState([]);
    const [skey, setSkey] = useState("");

    const handleSearch = (e) => {
        const { value } = e.target;

        if (value.length > 1) {
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
        // displayText = e.target.innerText;
        setSkey(e.target.innerText);
        setState({
            ...state,
            [name]: e.target.classList.value,
            [searchKey]: e.target.innerText,
        });
        setFiltered([]);
    };

    const clearAll = () => {
        setSkey("");
        setFiltered([]);
        setState({ ...state, [name]: "" });
    };

    useEffect(() => {
        if (value !== "" && value != "") {
            if (displayText != "") {
                setSkey(displayText);
            }

            let a = [];
            resultList?.filter((d) => {
                if (d.id == value) {
                    a.push(d[searchKey]);
                }
            });
            if (isEdit) {
                setSkey(a);
            }
        }

        if (value == "") {
            setSkey("");
        }
    }, [value]);

    return (
        <div className={"form-group d-flex align-items-center "}>
            <div style={{ width: Lwidth }}>
                <label>{text}</label>
            </div>
            <div style={{ width: Iwidth }} className="div-search-input">
                <input
                    type="text"
                    className="form-control"
                    value={skey}
                    onChange={handleSearch}
                />
                {filtered.length > 0 || skey != "" ? (
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
                    {filtered?.map((d, i) => {
                        return (
                            <li
                                key={i}
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

export const SEARCHDATANUMBER = ({
    isEdit = false,
    text,
    name,
    state,
    value,
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

        if (value.length > 0) {
            let result = resultList.filter((d) => d[searchKey] == value);
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

    useEffect(() => {
        if (value !== "" && value != "") {
            let a = [];
            resultList?.filter((d) => {
                if (d.id == value) {
                    a.push(d[searchKey]);
                }
            });
            if (isEdit) {
                setSkey(a);
                console.log("test");
            }
        }

        if (value == "" || value === "") {
            setSkey("");
        }
    }, [value]);

    return (
        <div className={"form-group d-flex align-items-center "}>
            <div style={{ width: Lwidth }}>
                <label className="text-uppercase">{text}</label>
            </div>
            <div style={{ width: Iwidth }} className="div-search-input">
                <input
                    type="text"
                    className="form-control text-uppercase"
                    value={skey}
                    onChange={handleSearch}
                />
                {filtered.length > 0 || skey != "" ? (
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

export const CHECKBOX = ({ name, value, onChange, id, isChecked }) => {
    return (
        <input
            name={name}
            className="form-check-input"
            type="checkbox"
            value={value}
            id={id}
            style={{ marginLeft: "0.75rem" }}
            onChange={onChange}
            checked={isChecked}
        />
    );
};
