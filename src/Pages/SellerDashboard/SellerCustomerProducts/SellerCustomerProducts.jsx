import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { GiConfirmed } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import toast from "react-hot-toast";


const SellerCustomerProducts = () => {
    const { customer_id } = useParams()
    const [selectedOrderStatus, setSelectedOrderStatus] = useState({});
    // console.log(use)
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const vendor = JSON.parse(localStorage.getItem('user'))
    const vendor_id = vendor.id
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [OrderItems, setOrderItems] = useState([]);
    const fetchCustomerOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosPublic.get(`/vendor/${vendor_id}/customer/${customer_id}/order-items/`);
            setOrderItems(response.data?.data);
        } catch (error) {
            console.error(error);
            setError('Oops, error while getting data');
        } finally {
            setLoading(false);
        }
    }, [axiosPublic, vendor_id, customer_id]);

    useEffect(() => {
        fetchCustomerOrders();
    }, [fetchCustomerOrders]);
    if (loading) {
        return "Loading"
    }
    const changeOrderStatus = (event, order_id) => {


        const status = event.target.value
        axiosSecure.patch(`/order-modify/${order_id}/`, { order_status: status })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Order status updated successfully')
                    fetchCustomerOrders()
                }
            })
            .catch(error => console.log(error))
        setSelectedOrderStatus((prevStatuses) => ({
            ...prevStatuses,
            [order_id]: status,
        }));

    }
    console.log('seller orders', OrderItems)
    return (
        <div>


            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Id
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Order ID
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            OrderItems.map((order, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={order?.product?.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                </td>
                                {/* <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {
                                        order.order
                                    }
                                </td> */}
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {
                                        order?.order
                                    }
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {
                                        order?.customer?.first_name
                                    }
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {
                                        order?.product?.title
                                    }
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {
                                        order?.product.price
                                    } <span className="ml-3">BDT</span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {

                                        order.order_status === 'Pending' ? <div className="flex gap-2 items-center">
                                            <div>
                                                <span className="loading loading-spinner loading-md text-accent"></span>
                                            </div>
                                            <div className="font-semibold text-gray-900">
                                                Pending
                                            </div>
                                        </div> : order.order_status === 'Confirm' ? <> <div className="flex items-center gap-2">
                                            <GiConfirmed className="text-2xl text-green-400" />
                                            <div>
                                                Confirmed
                                            </div>
                                        </div> </> : order.order_status === 'Cancelled' ? <div className="flex items-center gap-2">
                                            <TiCancel className="text-3xl text-red-400" />
                                            <div>
                                                Cancelled
                                            </div>
                                        </div> : <div className="flex items-center gap-2">
                                            <TbTruckDelivery className="text-3xl text-green-400" />
                                            <div>
                                                Delivered
                                            </div>
                                        </div>

                                    }
                                </td>
                                <td className="px-6 py-4">
                                    <select value={selectedOrderStatus[order.order] || ''} onChange={(e) => changeOrderStatus(e, order.order)} className="select select-accent w-full max-w-xs">
                                        <option selected value={''} disabled>Change Status</option>
                                        <option value="Confirm">Confirm</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    12/11/24
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default SellerCustomerProducts;