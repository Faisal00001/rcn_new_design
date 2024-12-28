import { FaCheck } from "react-icons/fa";

import useOrders from "../../../components/hooks/useOrders";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import useCustomerAddressList from "../../../components/hooks/useCustomerAddressList";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const OrderHistory = () => {

    const axiosPublic = useAxiosPublic()
    const [userOrders, loading, , currentPage, setCurrentPage, totalPage, setTotalPage] = useOrders()

    const [ordersByOrderId, setOrdersByOrderId] = useState([])
    const [singleOrderByOrderId, setSingleOrderByOrderId] = useState([])
    const [customerAddressList, isCustomerListLoading] = useCustomerAddressList()
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) {
            return
        }
        const orderMap = userOrders.data.reduce((acc, order) => {
            if (!acc[order.id]) {
                acc[order.id] = []
            }
            acc[order.id].push(order)
            return acc
        }, {})

        const multiOrderUsingOneOrder_id = userOrders.data.filter(order => orderMap[order.id].length > 1)
        const singleOrderUsingSingleOrder_id = userOrders.data.filter(order => orderMap[order.id].length === 1)
        setOrdersByOrderId(multiOrderUsingOneOrder_id)
        setSingleOrderByOrderId(singleOrderUsingSingleOrder_id)
    }, [userOrders.data, loading])
    if (isCustomerListLoading) {
        return ''
    }
    if (loading) {
        return "Loading"
    }

    const isDefaultAddressPresent = customerAddressList?.data.some(item => {
        return item?.default_address
    })

    if (!isDefaultAddressPresent) {
        navigate('/dashboard/customerAddress')
    }

    // console.log(singleOrderByOrderId)

    const paymentHandler = async (order) => {
        localStorage.setItem('order_id', order.order.id)
        try {
            const response = await axiosPublic.post('/initiate/', {
                order_id: order.order.id,
                amount: order.price,
                // customer_name: "Faisal Osman",
                // customer_email: "faisalosman798@gmail.com",
                // customer_phone: '01790203616',
                // customer_address: 'Baridhara',
                // customer_address_id: 10,
                // customer_postcode: '1207'
            });
            console.log(response.data)
            // window.location.href = response.data.GatewayPageURL;
            window.location.href = response.data.GatewayPageURL;

        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    }
    const handlePageChange = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page)
    }
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
        return `${formattedDate} ${formattedTime}`;
    };
    // console.log('Order multiple ', ordersByOrderId)
    // console.log('Order single ', singleOrderByOrderId)
    // console.log('Muli order using same oid', ordersByOrderId)

    return (
        <div className="flex relative flex-col justify-center">
            <h3 className="text-center mb-10 font-bold text-3xl">Order History</h3>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Pay
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>





                            {
                                userOrders.data.map((order, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">

                                        <div key={order.id}>
                                            <img src={order.product.image} className="w-16 md:w-32 max-w-full max-h-full" alt={order.product.title} />
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                        <p className="py-10" >{order.product.title}</p>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                        <p className="py-10">{order.quantity}</p>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                        <p className="py-10">{
                                            parseFloat(order.price) * parseFloat(order.quantity)
                                        } <span className="ml-2">BDT</span></p>

                                    </td>
                                    <td className="px-6 py-4">

                                        <Link to={`/dashboard/addCustomerReview/${order.product.id}`} className="font-medium text-red-600  hover:underline py-10 cursor-pointer">Add Review</Link>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                        <div key={order.id}>
                                            {order?.order_status === 'Confirm' ? (
                                                <div>
                                                    <div className="flex gap-x-1 items-center">
                                                        <FaCheck className="text-green-700" />
                                                        Confirmed
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex gap-x-1 items-center">
                                                        <span className="loading loading-spinner text-red-500 loading-sm"></span>
                                                        Pending
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">

                                        <p className="py-10">
                                            {
                                                formatDateTime(order.order_time)
                                            }
                                        </p>

                                    </td>

                                </tr>)
                            }






                        </tbody>
                    </table>

                </div>
                <div>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        handlePageChange={handlePageChange}
                    ></Pagination>
                </div>
            </div>
        </div >
    );
};

export default OrderHistory;