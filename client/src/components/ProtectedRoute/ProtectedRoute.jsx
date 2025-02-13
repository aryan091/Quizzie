import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Component }) {
    const [token] = useState(localStorage.getItem("token"));
    const [isLoggedIn] = useState(!!token);

    return <>{isLoggedIn ? <Component /> : <Navigate to="/" />}</>;
}