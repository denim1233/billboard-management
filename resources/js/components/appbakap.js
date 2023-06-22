import Loader from "./includes/Loader";
import Header from "./includes/Header";
import SideBar from "./includes/SideBar";
import Router from "../router/router";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const App = () => {
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const { keycloak, initialized } = useKeycloak();
    const [username, setUsername] = useState("");
    const [userCredentials, setCredential] = useState({ role_id: 0 });
    useEffect(() => {
        init().then((data) => {
            let temp = data;
            if (temp) {
                setCredential({
                    ...userCredentials,
                    role_id: numVal(data.role_id),
                });
            }

            // setCredential({ ...userCredentials, role_id: numVal(data) });
        });
    }, [keycloak.tokenParsed]);
    // keycloak.tokenParsed
    const init = async () => {
        let id;
        if (keycloak?.tokenParsed) {
            setUsername(keycloak?.tokenParsed.name);

            return (id = await axios({
                url: "/api/authenticateUser",
                method: "post",
                data: { keycloak_id: keycloak?.tokenParsed.sub },
            }).then((res) => {
                if (res.data.status_id == 1) {
                    let temp = { role_id: res.data.role_id };
                    return temp;
                } else {
                    alert("Your account does not have access in this system");
                    keycloak.logout();
                }
            }));
        }
    };

    const numVal = (value) => {
        let ifNan = isNaN(Number(value));

        let retVal = ifNan === true ? 0 : value;
        return retVal;
    };

    const display = () => {
        if (numVal(userCredentials.role_id) === 0) {
            {
                {
                    return <>loading.........</>;
                }
            }
        }

        return (
            <>
                <Header username={username} keycloak={keycloak} />
                <SideBar credentials={userCredentials} />
                <div className="content-wrapper">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row pt-3">
                                <Router credentials={userCredentials} />
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="main-footer text-sm">
                    <div className="float-right d-none d-sm-inline">
                        {" "}
                        CITI HARDWARE
                    </div>
                    {/* <strong>Copyright &copy; 2022-2023 </strong> All rights reserved. */}
                    <strong>Corporate Marketing System</strong>
                </footer>
            </>
        );
    };

    return <>{display()}</>;
};

export default App;
