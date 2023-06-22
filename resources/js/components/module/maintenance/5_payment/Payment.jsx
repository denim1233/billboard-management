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
                url: API.manage_payment_url,
                method: "post",
                data: parseData,
            }).then(async (res) => {
                toast.fire({
                    icon: "success",
                    title: "Updated Successfully!",
                });
                await axios.get(API.get_payment_url).then(({ data }) => {
                    setFilteredList(data);
                });
            });
        }
    });
};

const Payment = () => {
    const [tableColumn, setColumn] = useState([]);
    const [inActiveColumns, setInActive] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [paymentList, setPaymentList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    const hideColumn = (original, idKey) => {
        return original.filter((val, i) => idKey.includes(val.id));
    };
    useEffect(() => {
        //dynamic columns
        let active = Helper.getItemCache("paymentColumns");
        if (active === null) {
            active = paymentColumns;
            Helper.addItemCache("paymentColumns", active);
        }
        let result = active.map((a) => a.id);
        let temp2 = hideColumn(paymentColumns, result);
        setColumn(temp2);
        let inActiveColumn = Helper.getArrOfObjectDifference(
            paymentColumns,
            active,
            "a"
        );

        setInActive(inActiveColumn);
        //dynamic columns

        getDataTable(API.get_payment_url, setPaymentList, setFilteredList);
    }, []);

    useEffect(() => {
        setFilteredList(
            (c) => (c = filteredData(paymentList, "mode_of_payment", searchKey))
        );
    }, [searchKey]);

    //dynamic columns
    useEffect(() => {
        Helper.addItemCache("paymentColumns", tableColumn);
    }, [tableColumn]);
    //dynamic columns

    const paymentColumns = [
        {
            id: "MODE OF PAYMENT",
            content: "MODE OF PAYMENT",
            name: "MODE OF PAYMENT",
            selector: (row) => row.mode_of_payment,
            sortable: true,
        },
        {
            id: "TERMS OF CONTRACT",
            content: "TERMS OF CONTRACT",
            name: "TERMS OF CONTRACT",
            selector: (row) => row.terms_of_contract,
            sortable: true,
        },
        {
            id: "START DATE",
            content: "START DATE",
            name: "START DATE",
            selector: (row) => row.start_date,
            sortable: true,
        },
        {
            id: "END DATE",
            content: "END DATE",
            name: "END DATE",
            selector: (row) => row.end_date,
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
            id: "UPDATED AT",
            content: "UPDATED AT",
            name: "UPDATED AT",
            selector: (row) => row.updated_at,
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
            id: "CREATED AT",
            content: "CREATED AT",
            name: "CREATED AT",
            selector: (row) => row.created_at,
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
                        to={"/payment/edit/" + row.id}
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
                                        status_id: row.status_id,
                                        mode_of_payment: row.mode_of_payment,
                                        no_of_months: row.no_of_months,
                                        terms_of_contract:
                                            row.terms_of_contract,
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
                                className="custom-btn ml-auto"
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                            >
                                Set Column
                            </button>

                            <CLINK
                                text="Add MOP"
                                to="/payment/add"
                                custom="ml-5"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <CardHeader title="mode of payment maintenance" />

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

export default Payment;
