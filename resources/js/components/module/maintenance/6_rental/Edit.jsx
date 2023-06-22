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
import { API } from "../../a_custom/ApiServices";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CurrencyField from "../../../CurrencyField.jsx";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rentalData, setRentalData] = useState({
        id: "",
        status_id: "",
        monthly_rental: "",
    });

    const clearBTN = () => {
        setRentalData({
            id: 0,
            status_id: 1,
            monthly_rental: "",
        });
    };
    useEffect(() => {
        axios.get(API.get_rental_url).then(({ data }) => {
            let result = data.filter((c) => c.id == id);
            setRentalData({
                ...rentalData,
                id: result[0].id,
                status_id: result[0].status_id,
                monthly_rental: result[0].monthly_rental,
            });
        });
    }, []);

    return (
        <>
            <div className="col-12">
                <div className="card">
                    <CardHeader title={"edit monthly rental"} />
                    <div className="card-body d-flex  gap-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <CurrencyField
                                        type={"text"}
                                        text={"Monthly Rental"}
                                        value={rentalData.monthly_rental}
                                        disabled={false}
                                        onChange={(e) => {
                                            setRentalData({
                                                ...rentalData,
                                                monthly_rental: e,
                                            });
                                        }}
                                        Lwidth="30%"
                                        Iwidth="70%"
                                    />
                                </div>
                            </div>
                            <div className="row py-2 col-lg-12">
                                <CBTN
                                    text={"Save"}
                                    onClick={() => {
                                        if (rentalData.monthly_rental != "") {
                                            submitData(
                                                API.manage_rental_url,
                                                JSON.stringify([rentalData]),
                                                navigate,
                                                "/rental"
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
                                        clearBTN();
                                    }}
                                />

                                <CLINK text={"Back"} to={"/rental"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
