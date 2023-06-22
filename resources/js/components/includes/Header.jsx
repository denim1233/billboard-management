
    const Header = ({username, keycloak}) => {

        return(
            <nav className="main-header navbar navbar-expand navbar-white navbar-light border-bottom-0 text-sm">
                <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                </ul>
                <ul className="navbar-nav ml-auto">      
                <li className="nav-item">
                    <a className="nav-link" href="#" role="button">
                    {username.toUpperCase()}
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" onClick={() => keycloak.logout()}>
                        <i className="fa fa-power-off"></i> LOGOUT
                    </a>
                </li>
                </ul>
            </nav>
        )
    
    }
    
    export default Header;
    // // const Header = ({username, keycloak}) => {

//     return(
//         <nav className="main-header navbar navbar-expand navbar-white navbar-light border-bottom-0 text-sm">
//             <ul className="navbar-nav">
//             <li className="nav-item">
//                 <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
//             </li>
//             </ul>
//             <ul className="navbar-nav ml-auto">      
//             <li className="nav-item">
//                 <a className="nav-link" href="#" role="button">
//                 rwerwerw
//                 {/* {username.toUpperCase()} */}
//                 </a>
//             </li>
//             <li className="nav-item">
//                 <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" >
//                 {/* <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button"  onClick={() => keycloak.logout()}> */}
//                     <i className="fa fa-power-off"></i> LOGOUT
//                 </a>
//             </li>
//             </ul>
//         </nav>
//     )

// }

// export default Header;