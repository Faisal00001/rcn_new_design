import { useState } from "react";

import useSellerOrders from "../../../components/hooks/useSellerOrders";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { GiConfirmed } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { TiCancel } from "react-icons/ti";


const SellerOrders = () => {
    const axiosSecure = useAxiosSecure()
    // const baseUrl = 'http://127.0.0.1:8000/api';


    const [sellerOrders, loading, refetch] = useSellerOrders()
    const [selectedOrderStatus, setSelectedOrderStatus] = useState({});
    // const [selectedOrderId, setSelectedOrderId] = useState('')
    if (loading) {
        return "Loading"
    }
    const changeOrderStatus = (event, order_id) => {


        const status = event.target.value
        axiosSecure.patch(`/order-modify/${order_id}/`, { order_status: status })
            .then(res => {
                if (res.status === 200) {
                    toast.success('Order status updated successfully')
                    refetch()
                }
            })
            .catch(error => console.log(error))
        setSelectedOrderStatus((prevStatuses) => ({
            ...prevStatuses,
            [order_id]: status,
        }));

    }
    console.log('Seller orders', sellerOrders)
    return (
        <div>



            <div className="relative ml-10 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Order Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Step 1: Group orders by orderID
                            Object.entries(sellerOrders.data.reduce((acc, order) => {
                                if (!acc[order.order]) acc[order.order] = []; // Initialize array for each orderID
                                acc[order.order].push(order); // Push each order into its corresponding orderID group
                                return acc;
                            }, {})).map(([orderID, orders], index) => { // Object.entries gives [orderID, orders]

                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                        <td className="p-4">
                                            {/* Render all product images for this orderID one by one */}
                                            {orders.map((order, i) => (
                                                <div key={i}>
                                                    <img src={order?.product?.image} className="w-16 md:w-32 max-w-full max-h-full" alt={order?.product?.title} />
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white space-y-28">

                                            {orders.map((order, i) => (
                                                <div key={i}>
                                                    {order?.order}
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white space-y-28">
                                            {/* Render all product titles for this orderID one by one */}
                                            {orders.map((order, i) => (
                                                <div key={i}>
                                                    {order?.product?.title}
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {/* Render customer details */}
                                            <div>

                                                <span className="mr-2">{orders[0]?.customer?.first_name}</span>
                                                <span>{orders[0]?.customer?.last_name}</span>
                                            </div>
                                            <div>Address : {orders[0]?.customer?.address.address}</div>
                                            <div>Phone : {orders[0]?.customer?.phone}</div>
                                            <div>Email : {orders[0]?.customer?.email}</div>
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white space-y-28">
                                            {/* Render prices for each product */}
                                            {orders.map((order, i) => (
                                                <div key={i}>
                                                    {order?.price} BDT
                                                </div>
                                            ))}
                                        </td>

                                        <td className="px-6 py-4">
                                            {/* Render the order status for this orderID (same for all products in the order) */}
                                            {orders[0]?.order_status === 'Pending' ? (
                                                <div className="flex gap-2 items-center">
                                                    <div>
                                                        <span className="loading loading-spinner loading-md text-accent"></span>
                                                    </div>
                                                    <div className="font-semibold text-gray-900">Pending</div>
                                                </div>
                                            ) : orders[0]?.order_status === 'Confirm' ? (
                                                <div className="flex items-center gap-2">
                                                    <GiConfirmed className="text-2xl text-green-400" />
                                                    <div>Confirmed</div>
                                                </div>
                                            ) : orders[0]?.order_status === 'Cancelled' ? (
                                                <div className="flex items-center gap-2">
                                                    <TiCancel className="text-3xl text-red-400" />
                                                    <div>Cancelled</div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <TbTruckDelivery className="text-3xl text-green-400" />
                                                    <div>Delivered</div>
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            {/* Allow changing the order status */}
                                            <select value={selectedOrderStatus[orders[0]?.order] || ''} onChange={(e) => changeOrderStatus(e, orders[0]?.order)} className="select select-accent w-full max-w-xs">
                                                <option value={''} disabled>Change Status</option>
                                                <option value="Confirm">Confirm</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default SellerOrders;