import axios from "axios";
import axiosInstance from "./axiosInstance";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    maxContentLength: Infinity, // Increase maximum request content length
    maxBodyLength: Infinity,
});
const clearAllCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

        // Clear cookie for current domain
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;

        // Attempt to clear the cookie for root domain (if applicable)
        const domainParts = window.location.hostname.split(".");
        if (domainParts.length > 1) {
            const rootDomain = `.${domainParts.slice(-2).join(".")}`; // Example: .kopotakkhoelectronics.com
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${rootDomain}`;
        }
    });
};

// Customer logout handler
const customerLogoutHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const refreshToken = user.refresh_token;
    const accessToken = user.access_token;

    if (refreshToken && accessToken) {
        try {
            const response = await axiosInstance.post('/logout/', { refresh_token: refreshToken });

            if (response.status === 200) {
                localStorage.removeItem('user');
                sessionStorage.clear(); // Clear all session storage data
                clearAllCookies(); // Call the function to clear all cookies
                window.location.href = '/';
            }
        } catch (error) {
            console.error("Customer logout failed:", error.response?.data || error.message);
        }
    }
};
const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use(function (config) {
        const user = localStorage.getItem('user');

        if (user) {
            const parsedUser = JSON.parse(user);
            const token = parsedUser?.access_token;

            if (token) {
                config.headers.authorization = `Bearer ${token}`;

            } else {
                console.error("No token found");
                // Optional: You could throw an error here if a token is required
                // throw new Error("No token found");
            }
        } else {
            console.error("User not found in localStorage");
            // Optional: Handle cases where there is no user data
        }

        return config;
    }, function (error) {
        console.error("Error in request interceptor", error);
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            console.error("Unauthorized or forbidden request");
            // Optional: Handle unauthorized access differently if needed
            customerLogoutHandler()
            return Promise.reject(new Error("Unauthorized access"));
        }

        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;