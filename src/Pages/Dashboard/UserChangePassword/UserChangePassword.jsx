import { useState } from "react";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import toast from "react-hot-toast";

const UserChangePassword = () => {
    const axiosPublic = useAxiosPublic()
    const user = JSON.parse(localStorage.getItem('user'))
    const customerId = user.id
    const [confirmError, setConfirmError] = useState(false);
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(passwordData.password)
        console.log(passwordData.confirm_password)
        if (passwordData.password !== passwordData.confirmPassword) {
            console.log('True')
            setConfirmError(true);
        }
        else {
            console.log('Heelo')
            setConfirmError(false)
            const formData = new FormData();
            formData.append('password', passwordData.password);
            axiosPublic.post(`/customer-change-password/${customerId}/`, formData)
                .then(() => {
                    toast.success('Password changed successfully')
                    setPasswordData({
                        password: '',
                        confirmPassword: '',
                    });

                })
                .catch(error => console.log(error))
        }

    }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     if (passwordData.password !== passwordData.confirm_password) {
    //         setConfirmError(true);
    //     }
    //     else {
    //         console.log('Heelo')
    //         setConfirmError(false)
    //         const formData = new FormData();
    //         formData.append('password', passwordData.password);
    //         axiosPublic.post(`/customer-change-password/${customerId}/`, formData)
    //             .then(() => {
    //                 alert("Password changed successfully");
    //             })
    //             .catch(error => console.log('Error occur'))
    //     }
    // }
    return (
        <div>


            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">

                <div className="mb-5">
                    {
                        confirmError && <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
                            Passwords do not match
                        </div>

                    }
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                    <input type="password" onChange={handleInputChange} name="password" value={passwordData.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" name="confirmPassword" onChange={handleInputChange} value={passwordData.confirmPassword} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>


        </div>
    );
};

export default UserChangePassword;