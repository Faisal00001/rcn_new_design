import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";


const ChangePassword = () => {
    const axiosSecure = useAxiosSecure()
    const vendor = JSON.parse(localStorage.getItem('user'))
    const vendor_id = vendor.id
    const [showPassword, setShowPassword] = useState(false)
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirm_password: ''
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if (passwordData.password !== passwordData.confirm_password) {
            toast.error('Passwords do not match')
        }
        else {
            const formData = new FormData();
            formData.append('password', passwordData.password);
            axiosSecure.post(`/vendor-change-password/${vendor_id}/`, formData)
                .then(() => {
                    toast.success("Password changed successfully")
                    setPasswordData({
                        password: '',
                        confirm_password: '',
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    return (
        <div>

            <h4 className='text-2xl mb-5 md:text-4xl font-bold text-center'>Change Password</h4>
            <form className="max-w-sm mx-auto">
                <div className="mb-5 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <input name="password"
                        onChange={handleInputChange}
                        value={passwordData.password} type={`${showPassword ? 'text' : 'password'}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer select-none">
                        {
                            !showPassword ? <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Show</h3> : <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Hide</h3>
                        }

                    </div>
                </div>
                <div className="mb-5 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input name="confirm_password"
                        onChange={handleInputChange}
                        value={passwordData.confirm_password} type={`${showPassword ? 'text' : 'password'}`} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer select-none">
                        {
                            !showPassword ? <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Show</h3> : <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Hide</h3>
                        }

                    </div>
                </div>

                <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>


        </div>
    );
};

export default ChangePassword;