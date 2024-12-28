import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';

const SellerProfile = () => {
    const axiosSecure = useAxiosSecure();
    const baseUrl = 'http://127.0.0.1:8000/api';
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
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem('user'));
    const vendor_id = user.id;

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const response = await axiosSecure.get(url);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchData('/vendors/' + vendor_id + '/');
    }, [vendor_id, axiosSecure]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name in profileData.user) {
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    [name]: value
                }
            });
        } else {
            setProfileData({ ...profileData, [name]: value });
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('user.first_name', profileData.user.first_name);
        formData.append('user.last_name', profileData.user.last_name);
        formData.append('user.username', profileData.user.username);
        formData.append('user.email', profileData.user.email);
        formData.append('phone', profileData.phone);
        if (selectedFile) {
            formData.append('profile_image', selectedFile);
        }

        try {
            await axiosSecure.put('/vendors/' + profileData.id + '/', formData);
            setSuccessMessage('Profile updated successfully!');
            setErrorMessage('');
            setErrors({});
        } catch (error) {
            setSuccessMessage('');
            if (error.response && error.response.data) {
                setErrorMessage('Error updating profile');
                setErrors(error.response.data);
            } else {
                setErrorMessage('Something went wrong. Please try again.');
                setErrors({});
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-5 shadow-lg rounded-lg bg-white">
            {/* Seller Info Section */}
            <div className="mb-8 border-b pb-6">
                <h2 className="text-2xl font-semibold text-center mb-6">Seller Information</h2>

                <div className="flex flex-col items-center mb-4">
                    {/* Seller Profile Image */}
                    <div className="avatar mb-4">
                        {profileData.profile_image ? (
                            <img
                                src={profileData.profile_image}
                                alt="Profile"
                                className="w-24 h-24 rounded-full"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Seller Name */}
                    <div className="text-center mb-2">
                        <h3 className="text-xl font-semibold">{profileData.user.first_name} {profileData.user.last_name}</h3>
                    </div>

                    {/* Seller Username */}
                    <div className="text-center text-gray-600 mb-2">
                        <p>@{profileData.user.username}</p>
                    </div>

                    {/* Seller Email */}
                    <div className="text-center text-gray-600 mb-2">
                        <p>{profileData.user.email}</p>
                    </div>

                    {/* Seller Phone */}
                    <div className="text-center text-gray-600">
                        <p>{profileData.phone}</p>
                    </div>
                </div>
            </div>

            {/* Success and Error Messages */}
            {successMessage && (
                <div className="alert alert-success shadow-lg mb-4">
                    <div>
                        <span>{successMessage}</span>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="alert alert-error shadow-lg mb-4">
                    <div>
                        <span>{errorMessage}</span>
                    </div>
                </div>
            )}

            {/* Update Profile Form */}
            <div>
                <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="input input-bordered w-full mt-1"
                            value={profileData.user.first_name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="input input-bordered w-full mt-1"
                            value={profileData.user.last_name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="input input-bordered w-full mt-1"
                            value={profileData.user.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input input-bordered w-full mt-1"
                            value={profileData.user.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="input input-bordered w-full mt-1"
                            value={profileData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Profile Image</label>
                        <div className="flex flex-col items-center mt-1">
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerProfile;
