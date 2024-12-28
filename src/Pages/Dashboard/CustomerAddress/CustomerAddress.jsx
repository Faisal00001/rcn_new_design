
import toast from "react-hot-toast";
// import { FaPlusCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import useCustomerAddressList from "../../../components/hooks/useCustomerAddressList";
import { RiUserLocationFill } from "react-icons/ri";



const CustomerAddress = () => {

    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const isTotalPriceAvailable = localStorage.getItem('totalPrice') !== null;
    const handleAddAddress = () => {
        navigate('/dashboard/addCustomerAddress')
    }
    //  get customer address
    const [customerAddressList, loading, refetch] = useCustomerAddressList()
    if (loading) {
        return "Loading"
    }
    const isDefaultAddressPresent = customerAddressList?.data.some(item => {
        return item?.default_address
    })
    const handleMakeDefault = (item) => {
        const customerId = item?.customer?.id
        const address_id = item.id
        const formData = new FormData();
        formData.append('default_address', address_id);
        axiosPublic.post(`/make-default-address/${customerId}/`, formData)
            .then(res => {
                if (res.data.bool === true) {
                    toast.success(`${item.address} has been added as default address`)
                    refetch()
                }
                else {
                    toast.error('Something wrong')
                }
            })
            .catch(error => console.log(error))
    }
    const handleCheckout = () => {

        navigate('/confirmOrder')
    }
    return (
        <div>
            <div>
                {
                    customerAddressList?.data.length === 0 && <div role="alert" className="mb-10 relative flex w-[80%] mx-auto p-3 text-sm text-white bg-yellow-400 rounded-md">
                        Please add a Address.

                    </div>

                }
                {
                    !isDefaultAddressPresent &&
                    <div role="alert" className="mb-10 relative flex w-[80%] mx-auto p-3 text-sm text-white bg-yellow-400 rounded-md">
                        Please add a default Address.

                    </div>

                }
            </div>
            <div className="flex justify-end">
                <div>
                    <button onClick={handleAddAddress} className="btn bg-blue-700 hover:bg-blue-700">
                        <FaPlusCircle className="text-2xl text-white" />
                        <span className="font-normal text-white">Add Address</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ml-10 mt-10">
                {
                    customerAddressList?.data.map((item, index) => <div key={index} className="card bg-white border-2 border-gray-100 text-black w-96 shadow">
                        <div className="card-body">
                            <div className="flex justify-end">
                                {/* <div className="flex items-center">
                                    <input type="radio" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 " />
                                    <label htmlFor="link-radio" className="ms-2 text-sm font-medium text-gray-900">Make Default</label>
                                </div> */}
                                <div >
                                    {
                                        item.default_address ? <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
                                            Selected Address
                                        </div>
                                            : <div className="flex items-center gap-2">
                                                <span className="text-base">Make Default</span>
                                                <input onClick={() => handleMakeDefault(item)} type="radio" name="radio-7" className="radio radio-info" />
                                            </div>
                                    }

                                </div>

                            </div>
                            <div>
                                <RiUserLocationFill className="text-4xl mb-3" />
                            </div>
                            <p >Name : {item?.customer?.user?.first_name} {item?.customer?.user?.last_name}</p>
                            <p>City : {item.city}</p>
                            <p>Address : {item.address}</p>
                            <p>Postcode : {item.post}</p>
                            <p>Phone Number : {item?.customer.phone}</p>

                        </div>
                    </div>)
                }
            </div>

            {
                (customerAddressList?.data.length !== 0 && isDefaultAddressPresent && isTotalPriceAvailable) && <div className="mt-10 flex justify-center">
                    <button onClick={handleCheckout} className="btn bg-blue-500 hover:bg-blue-500 text-white">Continue to pay</button>
                </div>
            }
        </div>


    );
};

export default CustomerAddress;