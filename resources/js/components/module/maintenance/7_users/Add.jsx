import { useState } from "react";
import { INPUT, LOV, CBTN, CLINK, CardHeader } from "../../a_customs/Customs";

import { setSingleObjState, submitData } from "../../a_customs/Functions";

const Add = () => {
    const [user, setUser] = useState({
        id: 0,
        status_id: 1,
        no_of_months: "",
        mode_of_payment: "",
        terms_of_contract: "",
    });

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
                                        text="First name"
                                        name={"firstname"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <INPUT
                                        type="text"
                                        text="Last name"
                                        name={"lastname"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <INPUT
                                        type="text"
                                        text="Middle name"
                                        name={"middlename"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <LOV text={"Position"} name={"position"} />
                                    <LOV text={"Access"} name={"access"} />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="text"
                                        text="Username"
                                        name={"terms_of_contract"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <INPUT
                                        type="password"
                                        text="Password"
                                        name={"password"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <INPUT
                                        type="password"
                                        text="Re password"
                                        name={"re_password"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                    <INPUT
                                        type="email"
                                        text="Email"
                                        name={"email"}
                                        onChange={(e) => {
                                            setSingleObjState(e, user, setUser);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2">
                                <CBTN
                                    text="save"
                                    onClick={(e) => {
                                        submitData(user);
                                    }}
                                />
                                <CBTN text="clear" />
                                <CLINK text="back" to="/user" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
