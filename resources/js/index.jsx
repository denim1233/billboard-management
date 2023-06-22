import "./bootstrap";
import reactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

// adminLTE

import "admin-lte/plugins/fontawesome-free/css/all.min.css";

import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";

import "admin-lte/plugins/jquery/jquery.min.js";
import "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js";

import "admin-lte/dist/js/adminlte.js";
import "admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";

import "../css/app.css";

// adminLTE

import App from "./components/App";

window.Swal = Swal;
const toast = Swal.mixin({
    toast: true,
    iconColor: "#e80000",
    position: "top",
    showConfirmButton: false,
    timer: 3000,
});
window.toast = toast;

// KeyCloak
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENTID,
});

reactDom.createRoot(document.getElementById("app")).render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{ onLoad: "login-required", checkLoginIframe: false }}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReactKeycloakProvider>
);
