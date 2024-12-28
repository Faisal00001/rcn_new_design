import { createContext, useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../components/hooks/axiosInstance";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure(AuthContext);
    const [user, setUser] = useState(null);
    const isLogin = localStorage.getItem('user');
    const [loadingUser, setLoadingUser] = useState(true);
    const [cartItems, setCartItems] = useState(() => {
        const savedItems = localStorage.getItem('cartItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    // Function to check if the token is expired
    const isTokenExpired = (token) => {
        if (!token) return true;

        try {
            const decodedToken = jwtDecode(token); // Decode the token
            const currentTime = Date.now() / 1000; // Current time in seconds
            return decodedToken.exp < currentTime; // Return true if the token is expired
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // If decoding fails, consider token expired
        }
    };
    // Clear all cookies clean
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


    const customerLogoutHandler = useCallback(async () => {
        const user = JSON.parse(localStorage.getItem("user"));

        const refreshToken = user?.refresh_token;
        const accessToken = user?.access_token;

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
    }, []);

    useEffect(() => {
        // Check if user is present in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoadingUser(false);

        // Check for token expiration every 10 seconds
        const intervalId = setInterval(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && isTokenExpired(user.access_token)) {
                customerLogoutHandler(); // Log out if token is expired
            }
        }, 10000); // Check every 10 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [customerLogoutHandler]);

    useEffect(() => {
        // Update localStorage whenever cartItems changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const authInfo = {
        user,
        loadingUser,
        setUser,
        setLoadingUser,
        cartItems,
        setCartItems,
        isLogin,
        customerLogoutHandler
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
