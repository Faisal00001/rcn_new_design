import { useEffect, useState } from "react";

import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import axios from "axios";



const PersonalDetails = () => {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const axiosSecure = useAxiosSecure()
    const customer = JSON.parse(localStorage.getItem('user'))
    const token = customer.access_token
    const customer_id = customer.id
    const [profileData, setProfileData] = useState({
        id: '',
        user: {
            id: '',
            first_name: '',
            last_name: '',
            username: '',
            email: ''
        },
        profile_image: '',
        phone: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const response = await axiosSecure.get(url);
                setProfileData(response.data);
            }
            catch (error) {
                console.error('Error fetching profile:', error);
            }
        }
        fetchData(`/customer/${customer_id}/`);
    }, [customer_id, axiosSecure]);

    const handleFileChange = (event) => {
        console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name in profileData.user) {
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    [name]: value
                }
            })
        }
        else {
            setProfileData({
                ...profileData, [name]: value
            })
        }
    }
    const submitHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('user.first_name', profileData.user.first_name);
        formData.append('user.last_name', profileData.user.last_name);
        formData.append('user.username', profileData.user.username);
        formData.append('user.email', profileData.user.email);
        formData.append('phone', profileData.phone);
        if (selectedFile) {
            formData.append('profile_image', selectedFile);
        }
        // Log FormData values to console
        try {
            const response = await axios.put(baseUrl + '/customer/' + profileData.id + '/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                toast.success('Profile updated successfully!')
                setProfileData({
                    id: '',
                    user: {
                        id: '',
                        first_name: '',
                        last_name: '',
                        username: '',
                        email: ''
                    },
                    profile_image: '',
                    phone: ''
                });
                setSelectedFile(null);
            }
            // Show success message
            // setSuccessMessage('Profile updated successfully!');
            // setErrorMessage('');
            // setErrors({});

            // Clear the form after success

        } catch (error) {
            toast.error(error.response.data || 'Error updating profile')
            // setSuccessMessage('');
            // if (error.response && error.response.data) {
            //     setErrorMessage('Error updating profile');
            //     setErrors(error.response.data); // Display specific field errors
            // } else {
            //     setErrorMessage('Something went wrong. Please try again.');
            //     setErrors({});
            // }
        }
    }

    return (
        <div>
            <div className="pl-10">
                <h3 className="text-3xl font-bold text-center">Personal Details</h3>
                <p className="mt-2 text-center">Update your name, email, and account password at any time.</p>
                <div className="mt-10">
                    {/* <div className="flex gap-96">
                        <div>
                            <h3 className="font-semibold">Name</h3>
                            <p className="text-slate-600">Faisal Osman</p>
                        </div>
                        <div>
                            <h3 className="font-semibold cursor-pointer">Edit</h3>
                        </div>
                    </div> */}


                    <form onSubmit={submitHandler} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                            <input type="text" name="first_name"
                                value={profileData.user.first_name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="First name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                            <input type="text" name="last_name"
                                value={profileData.user.last_name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Last name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                            <input type="text" name="username"
                                value={profileData.user.username} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your user name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                            <input type="email" name="email"
                                value={profileData.user.email} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email address" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="profile_image" className="block mb-2 text-sm font-medium text-gray-900 ">Upload profile picture</label>
                            <input name="profile_image"
                                id="inputGroupFile02"
                                onChange={handleFileChange} type="file" className="file-input w-full max-w-xs mt-3" />
                            {/* <input type="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter your email address" required /> */}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone number</label>
                            <input type="text" name="phone"
                                value={profileData.phone} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your phone number" required />
                        </div>


                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default PersonalDetails;