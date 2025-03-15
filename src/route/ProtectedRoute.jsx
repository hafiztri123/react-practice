import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../context/UserContext";



const ProtectedRoutes = () => {
    const token = localStorage.getItem('TOKEN')

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;