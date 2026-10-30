import { useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { getSession } from "./auth";

// wspólny layout dla /admin/*
export const AdminLayout = () => {
    // statyczny ekran #boot z index.html usuwa normalnie LoadingScreen, którego tu nie ma
    useLayoutEffect(() => {
        document.getElementById("boot")?.remove();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Outlet />
        </div>
    );
};

// wpuszcza dalej tylko z ważnym tokenem, inaczej odsyła na logowanie
export const RequireAuth = () => {
    return getSession() ? <Outlet /> : <Navigate to="/admin" replace />;
};
