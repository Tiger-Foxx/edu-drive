import { Navigate } from "react-router-dom";
import {checkUserPaid} from "@/services/userService.jsx";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = checkUserPaid();

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
