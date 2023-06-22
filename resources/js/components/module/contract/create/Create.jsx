import { useState, useEffect } from "react";
import { API } from "../../a_custom/ApiServices";
import { createSlotColumns } from "../../a_custom/ColumnList";
import { useNavigate, useParams } from "react-router-dom";
import {
    SEARCHDATANUMBER,
    LoadDataTable,
    SEARCHDATA,
    CardHeader,
    BoxIcon,
    INPUT,
    CLINK,
    CBTN,
    LOV,
    SearchInput,
} from "../../a_custom/Custom";
import {
    getCreateParameters,
    getDataTable,
    getSize,
} from "../../a_custom/Load";
import Helper from "../../../.././utils/Helper.js";
import BModal from "../../../BModal.jsx";
import DraggableList from "../../../DraggableList.jsx";
// ============================================================================= END IMPORT

const handleselectedContractData = (
    e,
    setSelectedSlotID,
    setSelectedCount,
    setRow
) => {
    setSelectedCount(e.selectedCount);
    let selected = e.selectedRows;
    setRow(e.selectedRows);
    selected.filter((d) => setSelectedSlotID(d.slot_id));
};

const searchBTN = (searchData, contractList = null, setFilteredList) => {
    const param = {
        params: searchData,
    };

    axios
        .get(API.get_createSlot_url, param, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            setFilteredList(response.data);
        });
};

const clearBTN = (setSearchData, slotList, setFiltered) => {
    setSearchData({
        branch_id: "",
        brand_id: "",
        type_id: "",
        slot_number: "",
        size_id: "",
        status_id: "",
    });
};

// ============================================================================= FUNCTIONS
const Create = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    // const [slotList, setSlotList] = useState([])
    const [filteredList, setFilteredList] = useState([]);
    const [selectedSlotID, setSelectedSlotID] = useState("");
    const [selectedContractID, setSelectedContractID] = useState("");
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectedRow, setRow] = useState({});
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        branch_id: "",
        brand_id: "",
        type_id: "",
        slot_number: "",
        size_id: "",
        status_id: "",
    });

    const [parameters, setParameters] = useState({
        branchList: [],
        brandList: [],
        typeList: [],
        sizeList: [],
    });

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns

        let active = Helper.getItemCache("createContactColumn");
        if (active === null) {
            active = createSlotColumns;
            Helper.addItemCache("createContactColumn", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(createSlotColumns, result);
        setColumn(temp2);

        let inActiveColumn = Helper.getArrOfObjectDifference(
            createSlotColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        // getDataTable(API.get_slot_url,setSlotList,setFilteredList)

        const param = {
            params: { order_column: "cms_contract.id", order_by: "desc" },
        };

        axios
            .get(API.get_createSlot_url, param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
            });

        getCreateParameters(setParameters);
    }, []);

    useEffect(() => {
        if (searchData.type_id != "") {
            getSize(searchData.type_id, parameters, setParameters);
        }
    }, [searchData.type_id]);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <SEARCHDATA
                                        text="Branch"
                                        name={"branch_id"}
                                        value={searchData.branch_id}
                                        resultList={parameters.branchList}
                                        state={searchData}
                                        setState={setSearchData}
                                        searchKey={"branch_name"}
                                        getVal={"id"}
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
                                        }}
                                    />
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
                                </div>
                                {/* = ({text, value, setValue, custom, hasLabel=true}) */}

                                <div className="col-5">
                                    <div
                                        className={
                                            "form-group d-flex align-items-center "
                                        }
                                    >
                                        <div style={{ width: "35%" }}>
                                            <label>Slot Number</label>
                                        </div>
                                        <div style={{ width: "65%" }}>
                                            <input
                                                type="search"
                                                value={searchData.slot_number}
                                                className="form-control"
                                                placeholder=""
                                                onChange={(e) => {
                                                    setSearchData({
                                                        ...searchData,
                                                        slot_number:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center">
                                        <div style={{ width: "35%" }}>
                                            <label>Size</label>
                                        </div>
                                        <div style={{ width: "65%" }}>
                                            <select
                                                name="size"
                                                value={searchData.size_id}
                                                onChange={(e) => {
                                                    setSearchData({
                                                        ...searchData,
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
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-6 d-flex justify-content-start flex-wrap">
                                    <CBTN
                                        text="Search"
                                        custom="mr-5"
                                        onClick={() => {
                                            searchBTN(
                                                searchData,
                                                filteredList,
                                                setFilteredList
                                            );
                                        }}
                                    />
                                    <CBTN
                                        text="Clear"
                                        onClick={() => {
                                            clearBTN(
                                                setSearchData,
                                                filteredList,
                                                setFilteredList
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
                            {selectedCount > 0 ? (
                                <div className="col-12 d-flex justify-content-end flex-wrap mb-4">
                                    <CBTN
                                        text="Edit"
                                        onClick={() => {
                                            if (
                                                selectedRow[0].status_id === 3
                                            ) {
                                                navigate(
                                                    "/modification/inhouse/" +
                                                        selectedRow[0]
                                                            .contract_id
                                                );
                                            } else {
                                                toast.fire({
                                                    icon: "success",
                                                    title: "Inhouse Contract can only be edited",
                                                });
                                            }
                                        }}
                                    />

                                    <CBTN
                                        text="In-House"
                                        custom="mx-5"
                                        onClick={() => {
                                            if (selectedRow[0].status_id == 4) {
                                                navigate(
                                                    "/create-contract/single-inhouse/" +
                                                        selectedSlotID
                                                );
                                            } else {
                                                toast.fire({
                                                    icon: "success",
                                                    title: "The Slot is already occupied by a contract!",
                                                });
                                            }
                                        }}
                                    />

                                    <CBTN
                                        text="Lease"
                                        onClick={() => {
                                            if (selectedRow[0].status_id == 4) {
                                                navigate(
                                                    "/create-contract/single-lease/" +
                                                        selectedSlotID
                                                );
                                            } else {
                                                toast.fire({
                                                    icon: "success",
                                                    title: "The Slot is already occupied by a contract!",
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="col-12 d-flex justify-content-end flex-wrap mb-4">
                                    <CLINK
                                        text="In-House"
                                        custom="mx-5"
                                        to={"/create-contract/multi-inhouse"}
                                    />

                                    <CLINK
                                        text="Lease"
                                        to={"/create-contract/multi-lease"}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            <div className="card">
                                <CardHeader title="contracts" />

                                <div className="card-body">
                                    <LoadDataTable
                                        data={filteredList}
                                        columns={tableColumn}
                                        selectableRows={true}
                                        onSelectedRowsChange={(e) => {
                                            handleselectedContractData(
                                                e,
                                                setSelectedSlotID,
                                                setSelectedCount,
                                                setRow
                                            );
                                        }}
                                    />
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
            </div>
        </>
    );
};

export default Create;
