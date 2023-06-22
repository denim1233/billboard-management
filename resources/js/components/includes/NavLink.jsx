import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavLink = ({ to, title, hasSub = false }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: false });

    const checkIcon = (title) => {
        if (title === "dashboard")
            return <i className="fas fa-tachometer-alt nav-icon"></i>;
        if (title === "parent contract")
            return (
                <i
                    className="fas fa-file-contract nav-icon"
                    aria-hidden="true"
                ></i>
            );
    };

    return (
        <>
            <Link className={"nav-link " + (isActive ? "active" : "")} to={to}>
                {checkIcon(title) ? (
                    checkIcon(title)
                ) : (
                    <i className="far nav-icon"></i>
                    // <i className="far fa-circle nav-icon"></i>
                )}

                <p className="text-uppercase">
                    {title}
                    {hasSub && <i className="right fas fa-angle-left"></i>}
                </p>
            </Link>
        </>
    );
};

export default NavLink;
