import NavLink from "./NavLink";
import { useState, useEffect } from "react";
import { template } from "lodash";

const SideBar = (credentials) => {
    const [userRights, setRights] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        checkRights();
    }, [credentials]);

    const checkRights = () => {
        axios({
            url: "/api/getRights/" + credentials.credentials.role_id,
            method: "get",
        }).then((res) => {
            setRights(res.data.rights);
            setLoading(false);
        });
    };

    const hackFix = (id) => {
        var element = document.getElementById(id);
        element.classList.toggle("menu-open");
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
                                    } else {
                                        return <></>;
                                    }
                                } else {
                                    return <></>;
                                }
                            })}

                            <li
                                id="maintenanceTree"
                                onClick={(e) => {
                                    let treeId = e.currentTarget.id;
                                    hackFix(treeId);
                                }}
                                className="nav-item has-treeview menu-open"
                            >
                                <a href="#" className="nav-link">
                                    <i className="far fa-file nav-icon"></i>
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
                                    } else {
                                        return <></>;
                                    }
                                } else {
                                    return <></>;
                                }
                            })}
                            <li
                                id="maintenanceTree"
                                onClick={(e) => {
                                    let treeId = e.currentTarget.id;
                                    hackFix(treeId);
                                }}
                                className="nav-item has-treeview menu-open"
                            >
                                <a href="#" className="nav-link">
                                    <i className="far fa-file nav-icon"></i>
                                    <p className="text-uppercase">
                                        Maintenance
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
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    };

    return <>{sideBar()}</>;
};

export default SideBar;
