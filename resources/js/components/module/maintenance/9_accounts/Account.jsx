import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../a_custom/ApiServices";
import { LoadDataTable, CardHeader } from "../../a_custom/Custom";
import { ActionBTN, CBTN, CHECKBOX } from "../../a_custom/Custom";

const Account = () => {
    const navigate = useNavigate();
    const [filteredList, setFilteredList] = useState([]);
    const [accessData, setAccessData] = useState({
        id: "",
        allow_view: "",
        allow_edit: 1,
    });

    const copyArray = (tempData) => {
        return [...tempData];
    };

    const saveData = (data) => {
        axios({
            url: API.manage_user_access_url,
            method: "post",
            data: data,
        }).then((res) => {
            console.log(res);
        });
    };

    const userAccessColumns = [
        {
            name: "Modules",
            selector: (row) => row.module_name,
            sortable: true,
        },
        {
            name: "CREATOR",
            cell: (row) => {
                return (
                    <CHECKBOX
                        name="creator"
                        value={row.creator}
                        id={"cr" + row.module_id}
                        isChecked={row.creator}
                        onChange={async (e) => {
                            let tempVal = row.creator == 1 ? 0 : 1;
                            let replicate = copyArray(filteredList);
                            replicate[row.module_id - 1].creator = tempVal;
                            setFilteredList(replicate);
                            saveData({
                                module_id: row.module_id,
                                role_id: 2,
                                allow_view: tempVal,
                                allow_edit: 1,
                            });
                        }}
                    />
                );
            },
            sortable: false,
        },
        {
            name: "APPROVER",
            cell: (row) => {
                return (
                    <CHECKBOX
                        name="approver"
                        value={row.approver}
                        id={"ap" + row.module_id}
                        isChecked={row.approver}
                        onChange={(e) => {
                            console.log(row);
                            let tempVal = row.approver == 1 ? 0 : 1;
                            let replicate = copyArray(filteredList);
                            replicate[row.module_id - 1].approver = tempVal;
                            setFilteredList(replicate);
                            saveData({
                                module_id: row.module_id,
                                role_id: 1,
                                allow_view: tempVal,
                                allow_edit: 1,
                            });
                        }}
                    />
                );
            },
            sortable: false,
        },
        {
            name: "ADMIN",
            cell: (row) => {
                return (
                    <CHECKBOX
                        name="admin"
                        value={row.admin}
                        id={"ad" + row.module_id}
                        isChecked={row.admin}
                        onChange={(e) => {
                            let tempVal = row.admin == 1 ? 0 : 1;
                            let replicate = copyArray(filteredList);
                            replicate[row.module_id - 1].admin = tempVal;
                            setFilteredList(replicate);
                            saveData({
                                module_id: row.module_id,
                                role_id: 3,
                                allow_view: tempVal,
                                allow_edit: 1,
                            });
                        }}
                    />
                );
            },
            sortable: false,
        },
    ];

    useEffect(() => {
        const param = {
            params: { status_id: 4 },
        };

        axios
            .get(API.get_user_access_url, param, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setFilteredList(response.data);
            });
    }, []);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title="User Access" />

                    <div className="card-body">
                        <LoadDataTable
                            data={filteredList}
                            columns={userAccessColumns}
                            selectableRows={false}
                            onSelectedRowsChange={(e) => {
                                console.log("test");
                            }}
                        />
                        <div className="text-right">
                            <CBTN
                                text="View Roles"
                                onClick={() => {
                                    // addBTN(slotData,navigate)
                                    navigate("role");
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
