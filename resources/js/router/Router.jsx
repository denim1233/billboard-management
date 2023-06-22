import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {} from "react-router-dom";

import Dashboard from "../components/module/dashboard/Dashboard";

import Slot from "../components/module/maintenance/1_slot/Slot";
import Create from "../components/module/maintenance/1_slot/Create";
import EditSlot from "../components/module/maintenance/1_slot/Edit";
import History from "../components/module/maintenance/1_slot/History";

import Type from "../components/module/maintenance/2_type/Type";
import AddType from "../components/module/maintenance/2_type/Add";
import EditType from "../components/module/maintenance/2_type/Edit";

import Brand from "../components/module/maintenance/3_brand/Brand";

import Branch from "../components/module/maintenance/4_branch/Branch";

import Payment from "../components/module/maintenance/5_payment/Payment";
import AddPayment from "../components/module/maintenance/5_payment/Add";
import EditPayment from "../components/module/maintenance/5_payment/Edit";

import Rental from "../components/module/maintenance/6_rental/Rental";
import AddRental from "../components/module/maintenance/6_rental/Add";
import EditRental from "../components/module/maintenance/6_rental/Edit";

import User from "../components/module/maintenance/7_users/User";
import AddUser from "../components/module/maintenance/7_users/Add";
import EditUser from "../components/module/maintenance/7_users/Edit";

import Account from "../components/module/maintenance/9_accounts/Account";
import Role from "../components/module/maintenance/9_accounts/Role";
import AddRole from "../components/module/maintenance/9_accounts/Add";
import EditRole from "../components/module/maintenance/9_accounts/Edit";

import Terms from "../components/module/maintenance/10_terms/Terms";

import Renew from "../components/module/contract/Renew";
import Approved from "../components/module/contract/Approved";
import ParentContract from "../components/module/parentcontract/ParentContract";
import Approver from "../components/module/contract/submitted/Approver";
import Requestor from "../components/module/contract/submitted/Requestor";
import Modification from "../components/module/contract/ForModification";
// import Template from '../components/module/contract/Template';

import CreateContract from "../components/module/contract/create/Create";
import SingleInhouse from "../components/module/contract/create/SingleInhouse";
import MultiInhouse from "../components/module/contract/create/MultiInhouse";
import SingleLease from "../components/module/contract/create/SingleLease";
import MultiLease from "../components/module/contract/create/MultiLease";
import ModifyInhouse from "../components/module/contract/create/ModifyInhouse";
import ModifyLease from "../components/module/contract/create/ModifyLease";

import ContractSummary from "../components/module/reports/ContractSummary";

// import Test from '../components/module/contract/test/Test';

const Router = (credentials) => {
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        routeGuard();
    }, [location.pathname]);

    const [userRights, setRights] = useState([]);

    const routeGuard = () => {
        let module_name = location.pathname.split("/")[1];
        // prevent approver to go to requestor page
        if (credentials.credentials.role_id === 1) {
            if (module_name === "submitted-requestor") {
                navigate("/submitted-approver");
            }
        }
        // prevent requestor to go to approver page
        if (credentials.credentials.role_id === 2) {
            if (module_name === "submitted-approver") {
                navigate("/submitted-requestor");
            }
        }

        let allowedModule = [
            "submitted-approver",
            "submitted-requestor",
            "dashboard",
        ];
        axios({
            url: "/api/middleware",
            method: "post",
            data: {
                api_link: "/" + module_name,
                role_id: credentials.credentials.role_id,
            },
        }).then((res) => {
            if (allowedModule.includes(module_name)) {
                return;
            }

            if (res.data[0].allow_view === 0) {
                alert("you are not allowed to view this page");
                navigate("/dashboard");
            }
        });
    };

    const checkRights = () => {
        axios({
            url: "/api/getRights/" + credentials.credentials.role_id,
            method: "get",
        }).then((res) => {
            setRights(res.data.rights);
        });
    };

    useEffect(() => {
        checkRights();
    }, []);

    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/create-contract">
                    <Route index element={<CreateContract />} />
                    <Route
                        path="single-inhouse/:id"
                        element={<SingleInhouse />}
                    />
                    <Route path="single-lease/:id" element={<SingleLease />} />
                    <Route path="multi-lease" element={<MultiLease />} />
                    <Route path="multi-inhouse" element={<MultiInhouse />} />
                </Route>

                <Route
                    path="/renew"
                    element={<Renew credentials={credentials} />}
                />

                <Route path="/approved" element={<Approved />} />

                {/* <Route path="/modification" element={<Modification />} /> */}

                <Route path="/modification">
                    <Route index element={<Modification />} />
                    <Route path="lease/:id" element={<ModifyLease />} />
                    <Route path="inhouse/:id" element={<ModifyInhouse />} />
                </Route>

                <Route path="/submitted-requestor" element={<Requestor />} />
                <Route path="/submitted-approver" element={<Approver />} />

                {/* <Route path="/template" element={<Template />} /> */}

                <Route path="/parent-contract" element={<ParentContract />} />

                <Route path="/slot">
                    <Route index element={<Slot />} />
                    <Route path="history" element={<History />} />
                    <Route path="create" element={<Create />} />
                    <Route path="edit/:id" element={<EditSlot />} />
                </Route>

                <Route path="/type">
                    <Route index element={<Type />} />
                    <Route path="add" element={<AddType />} />
                    <Route path="edit/:id" element={<EditType />} />
                </Route>

                <Route path="/brand" element={<Brand />} />

                <Route path="/branch" element={<Branch />} />

                <Route path="/payment">
                    <Route index element={<Payment />} />
                    <Route path="add" element={<AddPayment />} />
                    <Route path="edit/:id" element={<EditPayment />} />
                </Route>

                <Route path="/rental">
                    <Route index element={<Rental />} />
                    <Route path="add" element={<AddRental />} />
                    <Route path="edit/:id" element={<EditRental />} />
                </Route>

                <Route path="/user">
                    <Route index element={<User />} />
                    <Route path="add/:id" element={<AddUser />} />
                    <Route path="edit/:id" element={<EditUser />} />
                </Route>

                <Route path="/account">
                    <Route index element={<Account />} />
                    <Route path="role" element={<Role />} />
                    <Route path="role/add" element={<AddRole />} />
                    <Route path="role/edit/:id" element={<EditRole />} />
                </Route>
                <Route path="/terms" element={<Terms />} />
                <Route path="/reports/summary" element={<ContractSummary />} />

                {/* <Route path="/test" element={<Test />} /> */}
            </Routes>
        </>
    );
};

export default Router;
