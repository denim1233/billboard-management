import { SearchData, LoadDataTable, CardHeader } from "../../a_customs/Customs";
import { filteredData } from "../../a_customs/Functions";
import { useEffect, useState } from "react";
import { API } from "../../a_custom/ApiServices";
import { Link } from "react-router-dom";
import Helper from "../../.././../utils/Helper.js";
import BModal from "../../../BModal.jsx";
import DraggableList from "../../../DraggableList.jsx";

const User = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [userList, setUserList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };

    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("userColumns");
        if (active === null) {
            active = userColumns;
            Helper.addItemCache("userColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(userColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            userColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        axios
            .get("/api/getUser", {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
                setUserList(response.data);
            });
    }, []);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("userColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    // useEffect(() => {
    //     setFilteredList();
    //     (c) => (c = filteredData(userList, "full_name", searchKey));
    // }, [searchKey]);

    useEffect(() => {
        // console.log(filteredList);
        // return;
        setFilteredList(
            (c) => (c = filteredData(userList, "full_name", searchKey))
        );
    }, [searchKey]);

    const userColumns = [
        {
            id: "ID",
            content: "ID",
            name: "ID",
            selector: (row) => row.keycloak_id,
            sortable: true,
        },
        {
            id: "FULLNAME",
            content: "FULLNAME",
            name: "FULLNAME",
            selector: (row) => row.full_name,
            sortable: true,
        },
        {
            id: "USERNAME",
            content: "USERNAME",
            name: "USERNAME",
            selector: (row) => row.username,
            sortable: true,
        },
        {
            id: "EMAIL",
            content: "EMAIL",
            name: "EMAIL",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            id: "ROLE",
            content: "ROLE",
            name: "ROLE",
            selector: (row) => row.role_name,
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
                        to={"/user/edit/" + row.keycloak_id}
                    >
                        <i className="fa fa-pen"></i>
                    </Link>
                    <button
                        className="action-btn"
                        onClick={() => {
                            deactivateData(
                                {
                                    keycloak_id: row.keycloak_id,
                                    status_id: row.status_id,
                                    role_id: row.role_id,
                                    username: row.username,
                                    full_name: row.full_name,
                                },
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
                let temp = { ...data, status_id: data.status_id == 1 ? 2 : 1 };

                // let parseData = JSON.parse(data).map((res)=>{
                //     return { ...res, status_id: (res.status_id==1)? 2:1}
                // })
                await axios({
                    url: API.manage_user_url,
                    method: "post",
                    data: temp,
                }).then(async (res) => {
                    toast.fire({
                        icon: "success",
                        title: "Updated Successfully!",
                    });
                    await axios.get(API.get_user_url).then(({ data }) => {
                        setFilteredList(data);
                    });
                });
            }
        });
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <div className="card-body d-flex align-items-center gap-4">
                        <SearchData
                            custom={"w-50"}
                            value={searchKey}
                            setValue={setSearchKey}
                            hasLabel={false}
                        />
                        <button
                            type="button"
                            className="custom-btn ml-auto "
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                        >
                            Set Column
                        </button>
                        {/* <CLINK text='add user' to='/user/add' custom='ml-auto' /> */}
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="user maintenance" />

                    <div className="card-body">
                        <LoadDataTable
                            columns={tableColumn}
                            data={filteredList}
                            isSelectable={false}
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

export default User;
