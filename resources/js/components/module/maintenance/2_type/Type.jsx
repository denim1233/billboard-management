import { Link } from "react-router-dom";
import {
    CLINK,
    SearchInput,
    LoadDataTable,
    CardHeader,
} from "../../a_custom/Custom";
import { useState } from "react";
import { useEffect } from "react";
import { getDataTable, filteredData } from "../../a_custom/Load";
import { API } from "../../a_custom/ApiServices";
import Helper from "../../.././../utils/Helper.js";
import BModal from "../../../BModal.jsx";
import DraggableList from "../../../DraggableList.jsx";
const deactivateData = (data, setFilteredList) => {
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
            let parseData = JSON.parse(data).map((res) => {
                return { ...res, status_id: res.status_id == 1 ? 2 : 1 };
            });
            await axios({
                url: API.manage_type_url,
                method: "post",
                data: parseData,
            }).then(async (res) => {
                toast.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                });
                await axios.get(API.get_type_url).then(({ data }) => {
                    setFilteredList(data);
                });
            });
        }
    });
};

const Type = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [typeList, setTypeList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("typeColumns");
        if (active === null) {
            active = typeColumns;
            Helper.addItemCache("typeColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(typeColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            typeColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns
        getDataTable(API.get_type_url, setTypeList, setFilteredList);
    }, []);

    useEffect(() => {
        setFilteredList(
            (c) => (c = filteredData(typeList, "type_name", searchKey))
        );
    }, [searchKey]);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("typeColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const typeColumns = [
        {
            id: "TYPE",
            content: "TYPE",
            name: "TYPE",
            selector: (row) => row.type_name,
            sortable: true,
        },
        {
            id: "MATERIAL",
            content: "MATERIAL",
            name: "MATERIAL",
            selector: (row) => row.material,
            sortable: true,
        },
        {
            id: "UOM",
            content: "UOM",
            name: "UOM",
            selector: (row) => row.uom_name,
            sortable: true,
        },
        {
            id: "SIZE",
            content: "SIZE",
            name: "SIZE",
            selector: (row) => row.size,
            sortable: true,
        },
        {
            id: "STATUS",
            content: "STATUS",
            name: "STATUS",
            selector: (row) => row.status_name,
            sortable: true,
        },
        {
            id: "CREATED BY",
            content: "CREATED BY",
            name: "CREATED BY",
            selector: (row) => row.created_by,
            sortable: true,
        },
        {
            id: "DATE CREATED",
            content: "DATE CREATED",
            name: "DATE CREATED",
            selector: (row) => row.created_at,
            sortable: true,
        },
        {
            id: "UPDATED BY",
            content: "UPDATED BY",
            name: "UPDATED BY",
            selector: (row) => row.updated_by,
            sortable: true,
        },
        {
            id: "UPDATED AT",
            content: "UPDATED AT",
            name: "UPDATED AT",
            selector: (row) => row.updated_at,
            sortable: true,
        },
        {
            id: "ACTIONS",
            content: "ACTIONS",
            name: "ACTIONS",
            cell: (row) => (
                <div className="p-0 m-0">
                    <Link
                        className="me-2 edit-icon"
                        to={"/type/edit/" + row.id}
                    >
                        <i className="fa fa-pen"></i>
                    </Link>
                    <button
                        className="action-btn"
                        onClick={() => {
                            deactivateData(
                                JSON.stringify([
                                    {
                                        id: row.id,
                                        type_name: row.type_name,
                                        material: row.material,
                                        status_id: row.status_id,
                                    },
                                ]),
                                setFilteredList
                            );
                        }}
                    >
                        <i className="fa fa-file-excel"></i>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <SearchInput
                            custom={"w-50"}
                            hasLabel={false}
                            value={searchKey}
                            setValue={setSearchKey}
                        />

                        <div className="ml-auto">
                            <button
                                type="button"
                                className="custom-btn "
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                            >
                                Set Column
                            </button>

                            <CLINK
                                text="Add Type"
                                custom="ml-5"
                                to="/type/add"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="type maintenance" />

                    <div className="card-body">
                        <LoadDataTable
                            columns={tableColumn}
                            data={filteredList}
                            selectableRows={false}
                        />
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

export default Type;
