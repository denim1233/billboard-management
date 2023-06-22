import NavLink from "./NavLink";
import { useState, useEffect } from "react";

const SideBar = (credentials) => {
    const [userRights, setRights] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        checkRights();
        document.getElementsByClassName("sidebar").onmouseout = function () {
            hoverFunction();
        };
    }, [credentials]);

    const checkRights = () => {
        // url: "/api/getRights/" + credentials.credentials.role_id,

        axios({
            url: "/api/getRights/" + credentials.credentials.role_id,
            method: "get",
        }).then((res) => {
            setRights(res.data.rights);
            setLoading(false);
        });

        console.log(userRights);
    };

    const hackFix = (id) => {
        var element = document.getElementById(id);
        element.classList.toggle("menu-open");
    };

    const hoverFunction = () => {
        hackFix("contractTree");
        hackFix("maintenanceTree");
    };

    const sideBar = () => {
        if (isLoading === true) {
            return;
        }
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="/index3.html" className="brand-link">
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
                            key={2231}
                        >
                            {userRights.map((item, i) => {
                                if (item.display_group === 1) {
                                    if (item.api_link === "/dashboard") {
                                        return (
                                            <li
                                                className="nav-item"
                                                key={item.module_id}
                                            >
                                                <NavLink
                                                    to={item.api_link}
                                                    title={item.link_title}
                                                />
                                            </li>
                                        );
                                    }
                                }
                            })}

                            <li
                                id="contractTree"
                                className="nav-item has-treeview menu-open"
                            >
                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={(e) => {
                                        let treeId =
                                            e.currentTarget.parentElement.id;
                                        hackFix(treeId);
                                    }}
                                >
                                    <i class="fas fa-file-signature nav-icon"></i>
                                    <p className="text-uppercase">
                                        Contract
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview ">
                                    {userRights.map((item, i) => {
                                        let tempLink = item.api_link;
                                        if (item.api_link === "/submitted") {
                                            if (
                                                parseInt(
                                                    credentials.credentials
                                                        .role_id
                                                ) === 1
                                            ) {
                                                tempLink =
                                                    "/submitted-approver";
                                            } else {
                                                tempLink =
                                                    "/submitted-requestor";
                                            }
                                        }
                                        if (item.display_group === 2) {
                                            return (
                                                <li
                                                    className="nav-item"
                                                    key={item.module_id}
                                                >
                                                    <NavLink
                                                        to={tempLink}
                                                        title={item.link_title}
                                                    />
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </li>

                            {userRights.map((item, i) => {
                                if (item.display_group === 1) {
                                    if (item.api_link === "/parent-contract") {
                                        return (
                                            <li
                                                className="nav-item"
                                                key={item.module_id}
                                            >
                                                <NavLink
                                                    to={item.api_link}
                                                    title={item.link_title}
                                                />
                                            </li>
                                        );
                                    }
                                }
                            })}
                            <li
                                id="maintenanceTree"
                                className="nav-item has-treeview menu-open"
                            >
                                <a
                                    onClick={(e) => {
                                        let treeId =
                                            e.currentTarget.parentElement.id;
                                        hackFix(treeId);
                                    }}
                                    href="#"
                                    className="nav-link"
                                >
                                    <i className="fas fa-solid fa-wrench nav-icon"></i>
                                    <p className="text-uppercase">
                                        Maintenances
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    {userRights.map((item, i) => {
                                        if (item.display_group === 3) {
                                            return (
                                                <li
                                                    className="nav-item"
                                                    key={item.module_id}
                                                >
                                                    <NavLink
                                                        to={item.api_link}
                                                        title={item.link_title}
                                                    />
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </li>
                            <li
                                id="contractTree"
                                className="nav-item has-treeview menu-open"
                            >
                                <a
                                    href="#"
                                    className="nav-link"
                                    onClick={(e) => {
                                        let treeId =
                                            e.currentTarget.parentElement.id;
                                        hackFix(treeId);
                                    }}
                                >
                                    <i class="fas fa-file-signature nav-icon"></i>
                                    <p className="text-uppercase">
                                        Reports
                                        <i className="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul className="nav nav-treeview ">
                                    {userRights.map((item, i) => {
                                        let tempLink = item.api_link;

                                        if (item.display_group === 4) {
                                            return (
                                                <li
                                                    className="nav-item"
                                                    key={item.module_id}
                                                >
                                                    <NavLink
                                                        to={tempLink}
                                                        title={item.link_title}
                                                    />
                                                </li>
                                            );
                                        }
                                    })}
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
