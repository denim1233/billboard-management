import {
    CLINK,
    SearchInput,
    LoadDataTable,
    CardHeader,
    INPUT,
    CBTN,
} from "../../a_custom/Custom";

import { submitData } from "../../a_custom/Function";
import { useState } from "react";
import { useEffect } from "react";
import { getDataTable, filteredData } from "../../a_custom/Load";
import { API } from "../../a_custom/ApiServices";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const navigate = useNavigate();

    const [paymentData, setPaymentData] = useState({
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
                    <CardHeader title={"add mode of payment"} />
                    <div className="card-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5 mr-auto">
                                    <INPUT
                                        type="text"
                                        text="Mode of Payment*"
                                        name={"mode_of_payment"}
                                        value={paymentData.mode_of_payment}
                                        onChange={(e) => {
                                            setPaymentData({
                                                ...paymentData,
                                                mode_of_payment: e.target.value,
                                            });
                                        }}
                                    />
                                    <INPUT
                                        type="text"
                                        text="Number of Months"
                                        name={"no_of_months"}
                                        value={paymentData.no_of_months}
                                        onChange={(e) => {
                                            setPaymentData({
                                                ...paymentData,
                                                no_of_months: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-5">
                                    <INPUT
                                        type="text"
                                        text="Terms of Contract*"
                                        name={"terms_of_contract"}
                                        value={paymentData.terms_of_contract}
                                        onChange={(e) => {
                                            setPaymentData({
                                                ...paymentData,
                                                terms_of_contract:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row py-2 col-lg-12">
                                <CBTN
                                    text="Save"
                                    onClick={(e) => {
                                        if (
                                            paymentData.mode_of_payment != "" &&
                                            paymentData.no_of_months != "" &&
                                            paymentData.terms_of_contract != ""
                                        ) {
                                            submitData(
                                                API.manage_payment_url,
                                                JSON.stringify([paymentData]),
                                                navigate,
                                                "/payment"
                                            );
                                        } else {
                                            toast.fire({
                                                icon: "error",
                                                title: "Please fill up missing fields",
                                            });
                                        }
                                    }}
                                />
                                <CBTN
                                    text="Clear"
                                    custom="mx-5"
                                    onClick={() => {
                                        setPaymentData({
                                            ...paymentData,
                                            no_of_months: "",
                                            mode_of_payment: "",
                                            terms_of_contract: "",
                                        });
                                    }}
                                />
                                <CLINK text="Back" to="/payment" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
