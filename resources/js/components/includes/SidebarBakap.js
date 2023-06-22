import NavLink from "./NavLink";
import { useState, useEffect } from "react";

const SideBar = (credentials) => {
    const [userRights, setRights] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        submittedPage();
        checkRights();
    }, [credentials]);

    const checkRights = () => {
        axios({
            url: "/api/getRights/" + credentials.credentials.role_id,
            method: "get",
        }).then((res) => {
            setRights(res.data.rights);
            console.log(res.data.rights);
            setLoading(false);
        });
    };

    useEffect(() => {
        checkRights();
    }, []);

    const submittedPage = () => {
        let navigation =
            credentials.credentials.role_id == 1
                ? "/submitted-approver"
                : "submitted-requestor";
        return (
            <li className="nav-item">
                <NavLink to={navigation} title="submitted" />
            </li>
        );
    };

    const parentContract = () => {
        console.log(userRights[9]["allow_view"]);
        if (userRights[9]["allow_view"] === 1) {
            return (
                <li className="nav-item">
                    <NavLink to="/parent-contract" title="parent contract" />
                </li>
            );
        }
    };

    const sideBar = () => {
        if (isLoading === true) {
            return;
        }
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img
                        src="/img/ch-logo.jpg"
                        alt="AdminLTE Logo"
                        className="brand-image"
                    />
                    <span className="brand-text text-dark font-weight-light">
                        CONTRACTS
                    </span>
                </a>

                <div className="sidebar">
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column nav-flat"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <li className="nav-item">
                                <NavLink to="/dashboard" title="dashboard" />
                            </li>

                            <li className="nav-item has-treeview menu-open">
                                <a href="#" className="nav-link">
                                    <i className="far fa-file nav-icon"></i>
                                    <p className="text-uppercase">
                                        Contract
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>

                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/create-contract"
                                            title="create"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/renew" title="renew" />
                                    </li>

                                    {submittedPage()}

                                    <li className="nav-item">
                                        <NavLink
                                            to="/approved"
                                            title="approved"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/modification"
                                            title="for modification"
                                        />
                                    </li>
                                </ul>
                            </li>
                            {parentContract()}

                            <li className="nav-item has-treeview menu-open mb-5">
                                <a href="#" className="nav-link">
                                    <i className="fas fa-tools nav-icon"></i>
                                    <p className="text-uppercase">
                                        Maintenance
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>

                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to="/slot" title="slot" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/type" title="type" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/brand" title="brand" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/branch" title="branch" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/payment"
                                            title="payment"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/rental" title="rental" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/user" title="users" />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/account"
                                            title="accounts"
                                        />
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/terms"
                                            title="terms & conditions"
                                        />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    };

    return <>{sideBar()}</>;
};

export default SideBar;
