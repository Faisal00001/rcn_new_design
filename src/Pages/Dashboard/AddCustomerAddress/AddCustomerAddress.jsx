import toast from "react-hot-toast";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";


const AddCustomerAddress = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [addressForm, setAddressForm] = useState({
        address: '',
        city: '',
        post: '',
        customer: userId,
    });
    const handleInput = (event) => {
        const { name, value } = event.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('address', addressForm.address);
        formData.append('city', addressForm.city);
        formData.append('post', addressForm.post);
        formData.append('customer', addressForm.customer);
        axiosSecure.post('/address/', formData)
            .then(res => {
                if (res.status !== 201) {
                    toast.error('Something wrong')
                }
                else {
                    toast.success('Address save successfully')
                    setAddressForm({
                        'address': '',
                        'city': '',
                        'post': '',
                        'customer': '',
                    })
                    navigate('/dashboard/customerAddress')
                }
            })
            .catch(error => console.log(error))
    }
    const handleBack = () => {
        navigate('/dashboard/customerAddress')
    }
    return (
        <div>
            <div className="flex justify-end">
                <div>
                    <button onClick={handleBack} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input type="text" onChange={handleInput} name="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                    <input type="text" onChange={handleInput} name="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="postcode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Postcode</label>
                    <input type="text" onChange={handleInput} name="post" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type="submit" onChange={handleInput} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    );
};

export default AddCustomerAddress;