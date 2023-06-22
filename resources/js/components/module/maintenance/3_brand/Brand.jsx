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
                url: API.manage_brand_url,
                method: "post",
                data: parseData,
            }).then(async (res) => {
                toast.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                });
                await axios.get(API.get_brand_url).then(({ data }) => {
                    setFilteredList(data);
                });
            });
        }
    });
};

const Brand = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [brandList, setBrandList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("brandColumns");
        if (active === null) {
            active = brandColumns;
            Helper.addItemCache("brandColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(brandColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            brandColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns
        getDataTable(API.get_brand_url, setBrandList, setFilteredList);
    }, []);

    useEffect(() => {
        setFilteredList(
            (c) => (c = filteredData(brandList, "brand_name", searchKey))
        );
    }, [searchKey]);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("brandColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const brandColumns = [
        {
            id: "BRAND",
            content: "BRAND",
            name: "BRAND",
            selector: (row) => row.brand_name,
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
            id: "UPDATED DATA & TIME",
            content: "UPDATED DATA & TIME",
            name: "UPDATED DATA & TIME",
            selector: (row) => row.updated_at,
            sortable: true,
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

                        <button
                            type="button"
                            className="custom-btn ml-auto"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                        >
                            Set Column
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="brand maintenance" />

                    <div className="card-body">
                        <LoadDataTable
                            columns={tableColumn}
                            data={filteredList}
                            selectableRows={false}
                        />
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

export default Brand;
