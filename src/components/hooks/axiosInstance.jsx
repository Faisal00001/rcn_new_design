import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Base URL for your API
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"))
        // Get the access token from localStorage
        const token = user.access_token
        if (token) {
            // If token exists, set Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle errors during the request setup
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
    (response) => {
        // If response is successful, return the response as is
        return response;
    },
    async (error) => {
        // Store the original request to retry after token refresh
        const originalRequest = error.config;

        // If the response status is 401 (Unauthorized) and this request hasn't been retried
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried
            const user = JSON.parse(localStorage.getItem("user"))
            // Get the access token from localStorage
            const refreshToken = user.refresh_token
            // Get the refresh token from localStorage

            if (refreshToken) {
                try {
                    // Attempt to refresh the access token
                    const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    });

                    // Get the new access token from the response
                    const newAccessToken = response.data.access;
                    const user = JSON.parse(localStorage.getItem("user"))
                    // Set the new access token to the user object
                    user.access_token = newAccessToken;

                    // Store the updated user object back in localStorage
                    localStorage.setItem('user', JSON.stringify(user)); // Save the new access token in localStorage
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // Update axios headers
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Update original request headers

                    // Retry the original request with the new token
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Token refresh failed, remove tokens and redirect to login
                    console.error('Token refresh failed:', refreshError);
                    localStorage.removeItem('user');
                    // localStorage.removeItem('refresh_token');
                    // localStorage.removeItem('vendor_login');
                    // window.location.href = '/seller-login/';
                    window.location.href = '/';
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token available, log out the user
                localStorage.removeItem('user');
                // localStorage.removeItem('refresh_token');
                // localStorage.removeItem('vendor_login');
                // window.location.href = '/seller-login/';
                window.location.href = '/';
            }
        }

        return Promise.reject(error); // If error is not 401, just reject the promise
    }
);

export default axiosInstance;