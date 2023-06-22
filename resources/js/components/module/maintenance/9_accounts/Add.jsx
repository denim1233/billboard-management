import { useState, useEffect, useCallback, setState } from "react";
import { API } from "../../a_custom/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import {
    CBTN,
    CLINK,
    INPUT,
    TEXTAREA,
    CardHeader,
} from "../../a_customs/Customs";

import { submitData, setSingleState } from "../../a_customs/Functions";

const Edit = () => {
    const [roleData, setRole] = useState({
        id: "",
        role_name: "",
        role_description: "",
        status_id: 1,
    });
    const { id } = useParams();

    useEffect(() => {
        const param = {
            params: { id: id },
        };

        axios.get(API.get_role_url, param).then(({ data }) => {
            let result = data.filter((c) => c.id == id);

            setRole({
                id: result[0].id,
                role_name: result[0].role_name,
                role_description: result[0].role_description,
                status_id: 1,
            });
        });
    }, []);

    const saveData = () => {
        axios({
            url: API.manage_role_url,
            method: "post",
            data: roleData,
        }).then((res) => {
            toast.fire({
                icon: "success",
                title: "Role Updated Successfully!",
            });
        });
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={"edit role"} />
                    <div className="card-body d-flex align-items-center gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <INPUT
                                        type={"text"}
                                        text={"Role Name"}
                                        onChange={(e) => {
                                            setRole({
                                                ...roleData,
                                                role_name: e.target.value,
                                            });
                                        }}
                                        value={roleData.role_name}
                                    />
                                </div>
                                <div className="col-5"></div>

                                <div className="col-5">
                                    <TEXTAREA
                                        type={"text"}
                                        text={"Role Desciption"}
                                        onChange={(e) => {
                                            setRole({
                                                ...roleData,
                                                role_description:
                                                    e.target.value,
                                            });
                                        }}
                                        value={roleData.role_description}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <CBTN
                                    text={"Save"}
                                    onClick={() => {
                                        saveData();
                                    }}
                                />
                                <CLINK
                                    text={"Back"}
                                    custom={"mx-5"}
                                    to={"/account/role"}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="row py-2">
                                <div className="col-3 d-flex justify-content-between flex-wrap"> */}
                </div>
            </div>
        </>
    );
};

export default Edit;
