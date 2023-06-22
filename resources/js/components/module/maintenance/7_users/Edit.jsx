import { useState, useEffect } from "react";
import { INPUT, CBTN, CLINK, CardHeader } from "../../a_customs/Customs";
import { LOV, LABEL, RADIOBUTTON } from "../../a_custom/Custom";
import { API } from "../../a_custom/ApiServices";
import { setSingleObjState, submitData } from "../../a_customs/Functions";
import { useNavigate, useParams } from "react-router-dom";
import _ from "lodash";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [userData, setUser] = useState({
        keycloak_id: id,
        status_id: 0,
        role_id: "",
        active: 1,
        inactive: 2,
    });

    const [roleData, setRole] = useState([{ id: "1", role_name: "NO ACCESS" }]);
    useEffect(() => {
        axios.get(API.get_role_url).then(({ data }) => {
            setRole(data);
        });

        axios.get(API.get_user_url + "/" + id).then(({ data }) => {
            console.log(data);
            setUser({
                ...userData,
                keycloak_id: data[0].keycloak_id,
                status_id: data[0].status_id,
                role_id: data[0].role_id,
                username: data[0].username,
                first_name: data[0].first_name,
                middle_name: data[0].middle_name,
                last_name: data[0].last_name,
                email: data[0].email,
                password: "ambot sa imo",
                job_description: data[0].job_description,
                full_name: data[0].first_name + " " + data[0].last_name,
            });
        });
    }, []);

    const saveData = () => {
        axios({
            url: "/api/manageUser",
            method: "post",
            data: userData,
        }).then((res) => {
            toast.fire({
                icon: "success",
                title: "Users Data Successfully Updated!",
            });
            navigate("/user");
        });
    };

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={"add user"} />
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <INPUT
                                        type="text"
                                        text="First Name"
                                        name={"firstname"}
                                        value={userData.first_name}
                                        disabled
                                    />
                                    <INPUT
                                        type="text"
                                        text="Last Name"
                                        name={"lastname"}
                                        value={userData.last_name}
                                    />
                                    <INPUT
                                        type="text"
                                        text="Middle Name"
                                        name={"middlename"}
                                        value={userData.middle_name}
                                    />
                                    <INPUT
                                        type={"position"}
                                        text={"Position"}
                                        name={"position"}
                                        value={userData.job_description}
                                    />

                                    <LOV
                                        text="Access"
                                        name={"role_id"}
                                        value={userData.role_id}
                                        options={roleData}
                                        opValue={"id"}
                                        opLabel={"role_name"}
                                        onChange={(e) => {
                                            setUser({
                                                ...userData,
                                                role_id: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="text"
                                        text="Username"
                                        name={"username"}
                                        value={userData.username}
                                    />
                                    <INPUT
                                        type="password"
                                        text="Password"
                                        name={"password"}
                                        value={userData.password}
                                    />
                                    <INPUT
                                        type="password"
                                        text="Re password"
                                        name={"re_password"}
                                        value={userData.password}
                                    />
                                    <INPUT
                                        type="email"
                                        text="Email"
                                        name={"email"}
                                        value={userData.email}
                                    />
                                    <div
                                        className={
                                            "form-group d-flex align-items-center "
                                        }
                                    >
                                        <div
                                            className="form-group d-flex"
                                            style={{ width: "35%" }}
                                        >
                                            <LABEL text="Status" />
                                        </div>
                                        <div
                                            className="form-group d-flex"
                                            style={{ width: "65%" }}
                                        >
                                            <RADIOBUTTON
                                                name="status_id"
                                                value={userData.status_id}
                                                display="Active"
                                                checkedValue={
                                                    userData?.status_id == 1
                                                        ? 1
                                                        : 0
                                                }
                                                onChange={(e) => {
                                                    setUser({
                                                        ...userData,
                                                        status_id: 1,
                                                    });
                                                }}
                                            />

                                            <RADIOBUTTON
                                                name="status_id"
                                                value={userData.status_id}
                                                display="Inactive"
                                                checkedValue={
                                                    userData?.status_id == 2
                                                        ? 1
                                                        : 0
                                                }
                                                onChange={(e) => {
                                                    setUser({
                                                        ...userData,
                                                        status_id: 2,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row py-2 ml-1">
                                <CBTN
                                    text="Save"
                                    onClick={(e) => {
                                        saveData(userData);
                                    }}
                                />
                                <CBTN text="Clear" custom="mx-5" />
                                <CLINK text="Back" to="/user" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
