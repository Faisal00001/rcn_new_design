import { Navigate, useLocation } from "react-router-dom";

import { jwtDecode } from 'jwt-decode';
import { useContext } from "react";
const PrivateRoute = ({ children }) => {
    const { customerLogoutHandler } = useContext
    const user = JSON.parse(localStorage.getItem('user'))

    const access_token = user?.access_token
    // const customerLoginRoute = user?.isCustomer === true ? true : false
    // const sellerLoginRoute = user?.isSeller === true ? true : false
    // let path = ''
    const isCustomer = user?.isCustomer ? true : false
    const isVendor = user?.isSeller ? true : false
    const isAdmin = user?.isAdmin ? true : false
    const location = useLocation()

    // Redirect to the appropriate login page if no access token is found
    if (!access_token) {
        if (isVendor) {
            return <Navigate to='/sellerLogin' />;
        } else if (isCustomer) {
            return <Navigate to='/login' />;
        }
        else if (isAdmin) {
            return <Navigate to='/adminLogin' />;
        }
    }
    try {
        // Decode the token to check its expiration time
        const decodedToken = jwtDecode(access_token);
        const currentTime = Date.now() / 1000; // Convert current time to seconds

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
            // Token has expired, clear storage and redirect to login
            customerLogoutHandler();

            <Navigate to={'/'}></Navigate>
        }
    } catch (error) {
        // If there's any issue with the token, clear storage and redirect to login
        console.error("Invalid token", error);
        localStorage.removeItem('user');

        <Navigate to={'/'}></Navigate>
    }
    if (isCustomer) {
        return children
    }
    if (isAdmin) {
        return children
    }
    if (isVendor) {
        return children
    }
    // if (customerLoginRoute) {
    //     path = '/login'
    // }
    // if (sellerLoginRoute) {
    //     path = '/sellerLogin'
    // }
    // return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    return <Navigate to={`/`} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;