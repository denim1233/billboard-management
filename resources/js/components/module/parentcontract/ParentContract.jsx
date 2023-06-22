import {
    INPUT,
    CBTN,
    LoadDataTable,
    CardHeader,
    SEARCHINPUT,
} from "../a_customs/Customs";
import { SEARCHDATA } from "../a_custom/Custom";
import {
    contractColumns,
    parentContractColumns,
} from "../a_customs/ColumnList";
import { getCreateParameters, loadData } from "../a_customs/Load";
import { useState, useEffect } from "react";
import Helper from "../../.././utils/Helper.js";
import BModal from "../../BModal.jsx";
import DraggableList from "../../DraggableList.jsx";

const handleselectedContractData = (
    e,
    contractData,
    setContractData,
    filteredList
) => {
    let selected = e.selectedRows;

    let c_id = [];
    let c_lesse = [];

    let temp = filteredList;

    selected.filter((d) => {
        // filter selected rows as subbmitted only
        temp.filter((ex) => {
            if (d.id == ex.id) {
                c_id.push(d.id);
                c_lesse.push(parseInt(d.lesse ? d.lesse : 0));
            }
        });
    });

    // selected.filter((d)=>{
    //     c_id.push(d.id)
    //     c_lesse.push(parseInt(d.lesse ? d.lesse: 0))
    // })

    setContractData({
        ...contractData,
        id: c_id.toString(),
        lesse: c_lesse.toString(),
    });
};

const handleselectedParentData = (e, saveData, setParentData) => {
    if (e.selectedRows.length != 0) {
        // setToggleCleared(!toggleCleared);

        let selected = e.selectedRows;
        setParentData({
            ...saveData,
            header_id: selected[0]["id"].toString(),
        });
    }
};

const ParentContract = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [parentContractList, setParentContractList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedContractID, setSelectedContractID] = useState("");
    const [selectedParenttID, setSelectedParentID] = useState("");
    const [selectedCount, setSelectedCount] = useState(0);
    const [parentData, setParentData] = useState([]);
    const [contractData, setContractData] = useState({ id: "" });
    const [printData, setPrintData] = useState([{}]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [terms, setTerms] = useState("");

    const loadTerms = async () => {
        await axios.get("/api/get-terms").then((res) => {
            setTerms(res.data[0].description);
        });
    };

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    const getDisplayDate = (date1) => {
        if (date1) {
            var strDate = date1.split(" ");
            var clean = new Date(strDate[0]);
            var temp = clean.toDateString().split(" ");
            return getfullMonth(temp[1]) + " " + temp[2] + ", " + temp[3];
        }
    };

    const getfullMonth = (month) => {
        if (month === "Jan") {
            return "January";
        } else if (month === "Feb") {
            return "February";
        } else if (month === "Mar") {
            return "March";
        } else if (month === "Apr") {
            return "April";
        } else if (month === "May") {
            return "May";
        } else if (month === "Jun") {
            return "June";
        } else if (month === "Jul") {
            return "July";
        } else if (month === "Aug") {
            return "August";
        } else if (month === "Sep") {
            return "September";
        } else if (month === "Oct") {
            return "October";
        } else if (month === "Nov") {
            return "November";
        } else if (month === "Dec") {
            return "December";
        }
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("parentColumns");
        if (active === null) {
            active = contractColumns;
            Helper.addItemCache("parentColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(contractColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            contractColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);

        loadTerms();
        // loadData('/api/getContract',setContractList, setFilteredList);
        getCreateParameters(setParameters);
    }, []);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("parentColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const [searchData, setSearchData] = useState({
        brand_id: "",
        lesse: "",
        start_date: "",
        end_date: "",
        header_id: 0,
    });

    const [parameters, setParameters] = useState({
        branchList: [],
        lesseList: [],
        brandList: [],
        typeList: [],
        sizeList: [],
    });

    const loadContractHeader = () => {
        const param = {
            params: { lesse: searchData.lesse },
        };

        axios
            .get("/api/getHeaderContract", param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setParentContractList(response.data);
            });
    };

    const loadContract = () => {
        const param = {
            params: searchData,
        };

        axios
            .get("/api/getContract", param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
            });
    };

    const searchBtn = () => {
        if (searchData.lesse != "") {
            loadContract();
            loadContractHeader();
        } else {
            toast.fire({
                icon: "error",
                title: "Please fill up missing fields",
            });
        }
    };

    const clearBtn = () => {
        setSearchData({
            brand_id: "",
            lesse: "",
            start_date: "",
            end_date: "",
            header_id: 0,
        });
    };

    const saveData = (loadContract, loadHeader) => {
        if (contractData.id != "") {
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
                        url: "/api/manageHeaderContract",
                        method: "post",
                        data: [contractData],
                    }).then((res) => {
                        //didnt work jsut clear the parameter of the contact id
                        setContractData({
                            ...contractData,
                            id: "",
                        });
                        toast.fire({
                            icon: "success",
                            title: "Parent Created Successfully!",
                        });
                        loadHeader();
                        loadContract();
                    });
                }
            });
        } else {
            toast.fire({
                icon: "error",
                title: "Please select contract to save!",
            });
        }
    };

    const printContract = async () => {
        if (parentData.length != 0) {
            const param = {
                params: parentData,
            };

            const printData2 = await axios
                .get("/api/printContract/", param, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((response) => {
                    setPrintData(response.data);
                    return response.data;
                });

            setTimeout(function () {
                window.print();
            }, 2000);
        } else {
            toast.fire({
                icon: "error",
                title: "Please select a parent to print!",
            });
        }
    };

    return (
        <>
            <div className="col-12 parent-contract-div">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text="Lessee"
                                        name={"lesse"}
                                        value={searchData.lesse}
                                        resultList={parameters.lesseList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"vendor_name"}
                                        getVal={"id"}
                                    />

                                    <INPUT
                                        type="date"
                                        text="Start Date*"
                                        name={"start_date"}
                                        setState={setSearchData}
                                        state={searchData}
                                        value={searchData.start_date}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                start_date: e.target.value,
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
                                        text="End Date*"
                                        name={"end_date"}
                                        setState={setSearchData}
                                        state={searchData}
                                        value={searchData.end_date}
                                        onChange={(e) => {
                                            setSearchData({
                                                ...searchData,
                                                end_date: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2 mb-4">
                                <div className="col-8 d-flex justify-content-start flex-wrap">
                                    <CBTN
                                        text="Search"
                                        custom="mr-5"
                                        onClick={searchBtn}
                                    />
                                    <CBTN
                                        text="Clear"
                                        custom="mr-5"
                                        onClick={clearBtn}
                                    />
                                    <CBTN
                                        text="Create Parent"
                                        onClick={() => {
                                            saveData(
                                                loadContract,
                                                loadContractHeader
                                            );
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
                            <div className="card">
                                <CardHeader title="contract results" />

                                <div className="card-body">
                                    <LoadDataTable
                                        columns={tableColumn}
                                        data={filteredList}
                                        isSingle={false}
                                        onSelectedRow={(e) => {
                                            handleselectedContractData(
                                                e,
                                                contractData,
                                                setContractData,
                                                filteredList
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="card col-6 parent-contract-div">
                                <CardHeader title="contract results" />

                                <div className="card-body">
                                    <LoadDataTable
                                        columns={parentContractColumns}
                                        data={parentContractList}
                                        isSingle={true}
                                        onSelectedRow={(e) => {
                                            handleselectedParentData(
                                                e,
                                                parentData,
                                                setParentData
                                            );
                                        }}
                                    />
                                </div>

                                <div className="card-footer d-flex justify-content-end">
                                    <CBTN
                                        text="Print Contract"
                                        // onClick={(e)=>{ window.print() }}
                                        onClick={(e) => {
                                            printContract();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="contract-template"
                className="col-lg-14 bg-white mt-0 contract-template"
            >
                <div className="container-fluid">
                    <div className="row pb-3" style={{ borderBottom: "solid" }}>
                        <div className="col-lg-12 print-title d-flex justify-content-between align-items-center">
                            <div className="text-center pl-5">
                                <h3>
                                    <b>
                                        <p style={{ lineHeight: "1rem" }}>
                                            LEASE CONTRACT
                                        </p>
                                        <p style={{ lineHeight: "1rem" }}>
                                            AD SPACE
                                        </p>
                                    </b>
                                </h3>
                            </div>
                            <ul className="print-ul">
                                <li>
                                    <img
                                        src="/img/deco.png"
                                        width="200"
                                        height="50"
                                        alt=""
                                    />
                                </li>
                                <li>
                                    <p className="print-label">
                                        Quimpo Boulevard Matina
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Davao City 8000 Philippines
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Tel Nos (63-82) 296-1821 to 23
                                    </p>
                                </li>
                                <li>
                                    <p className="print-label">
                                        Fax No (63-82) 298-0233; (63-82)
                                        297-2023
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row my-1">
                        <div className="col-8 print-lessee">
                            <div className="print-field mt-3">
                                <p className="legend">
                                    <b>Lessee:</b>
                                </p>
                                <p className="print-label">
                                    <b>Name:</b>{" "}
                                    {printData[0].owner
                                        ? printData[0].owner
                                        : " "}{" "}
                                </p>

                                <p className="print-label">
                                    <b>Company:</b>{" "}
                                    {printData[0].vendor_name
                                        ? printData[0].vendor_name
                                        : " "}{" "}
                                </p>
                                <p className="print-label">
                                    <b>Contact Nos.:</b>{" "}
                                    {printData[0].phone
                                        ? printData[0].phone
                                        : " "}
                                </p>
                                <p className="print-label">
                                    <b>Fax Nos.:</b>{" "}
                                    {printData[0].fax ? printData[0].fax : " "}{" "}
                                </p>
                            </div>
                        </div>
                        <div className="col-4 mt-4">
                            <div
                                className="col-12"
                                style={{
                                    textAlign: "right",
                                    border: "1px solid black",
                                    color: "red",
                                }}
                            >
                                <b>Contract No.</b>{" "}
                                {printData[0].parent_number
                                    ? printData[0].parent_number
                                    : " "}
                            </div>

                            <div
                                className="col-12 mt-1"
                                style={{ border: "1px solid" }}
                            >
                                <b>Date:</b>{" "}
                                {getDisplayDate(printData[0].created_at)}
                            </div>
                        </div>
                        {/* new Date(
                                          printData[0].created_at.toString()
                                      ).toLocaleDateString("en-us", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                      }) */}
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <table
                                className="print-table"
                                style={{ border: "1px solid" }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            width="100"
                                            style={{ textAlign: "center" }}
                                        >
                                            #
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Brand
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Branch
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Ad Space
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Ad Size
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            # of Pcs
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Material
                                        </th>
                                        <th style={{ textAlign: "center" }}>
                                            Monthly Rental
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {printData?.map((res, i) => {
                                        return (
                                            <tr key={i + 1}>
                                                <td align="center">{i + 1}</td>
                                                <td align="center">
                                                    {res.brand_name}
                                                </td>
                                                <td align="center">
                                                    {res.branch_name}
                                                </td>
                                                <td align="center">
                                                    {res.ad_space}
                                                </td>
                                                <td align="center">
                                                    {res.size}
                                                </td>
                                                <td align="center">1 pc</td>
                                                <td align="center">
                                                    {res.material}
                                                </td>
                                                <td align="center">
                                                    <label
                                                        style={{ color: "red" }}
                                                    >
                                                        Php
                                                    </label>
                                                    {"  "}
                                                    {Helper.toCurrency(
                                                        res.monthly_rental
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <table border="1" width="100%">
                                <tr>
                                    <th colSpan="8">
                                        <b>Term of Contract:</b>
                                        <p className="print-label">
                                            {printData[0].terms_of_contract
                                                ? printData[0].terms_of_contract
                                                : " "}
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Period Covered:</b>
                                        <p className="print-label">
                                            {getDisplayDate(
                                                printData[0].start_date
                                            )}{" "}
                                            {"  -  "}
                                            {getDisplayDate(
                                                printData[0].end_date
                                            )}
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Mode of Payment:</b>
                                        <p className="mb-0 print-label">
                                            {printData[0].mode_of_payment
                                                ? printData[0].mode_of_payment
                                                : " "}
                                        </p>
                                        <p className="print-label">
                                            Total Number of contracts:{" "}
                                            {printData.length} (Nothing Follows)
                                        </p>
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan="8">
                                        <b>Remarks:</b>
                                        <p className="print-label">
                                            {printData[0].remarks
                                                ? printData[0].remarks
                                                : " "}
                                        </p>
                                    </th>
                                </tr>
                            </table>
                            <div className="print-terms">
                                <div
                                    className="col-lg-12 "
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "<center><b>TERMS AND CONDITIONS:</b></center>" +
                                            terms,
                                    }}
                                    style={{ fontSize: 12 }}
                                ></div>
                            </div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-between mt-5">
                            <div className="print-signature mt-5">
                                <p className="print-label">
                                    <b>MS. JINIELLE TAN</b>
                                </p>

                                <p className="print-label">
                                    Corporate Marketing
                                </p>
                                <p className="print-label">DECOARTS</p>
                            </div>
                            <div className="print-signature mt-5">
                                <p>
                                    {printData[0].owner
                                        ? printData[0].owner
                                        : " "}
                                </p>
                                <p>
                                    <b>LESSEE</b>
                                </p>
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
        </>
    );
};

export default ParentContract;
