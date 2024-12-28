import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";

const CustomerTotalOrders = () => {
    const axiosPublic = useAxiosPublic()

    const [OrderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const { customer_id } = useParams();
    useEffect(() => {
        const fetchData = (url) => {
            axiosPublic.get(url)
                .then(res => {
                    setOrderItems(res.data)
                    setLoading(false)
                })
                .catch(error => console.log(error))
        }
        fetchData(`/customer/${customer_id}/order-items/`)
    }, [customer_id, axiosPublic])
    if (loading) {
        return "Loading"
    }
    const renderOrderStatus = (status) => {
        switch (status) {
            case 'Confirm':
                return <span className='text-success'><i className="fa fa-check-circle"></i> Confirmed</span>;
            case 'Delivered':
                return <span className='text-info'><i className="fa fa-truck"></i> Delivered</span>;
            case 'Cancelled':
                return <span className="text-danger"><i className="fa fa-times-circle"></i> Cancelled</span>;
            default:
                return <span className='text-warning'><i className="fa fa-spinner"></i> Pending</span>;
        }
    };
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
        return `${formattedDate} ${formattedTime}`;
    };
    console.log(OrderItems)
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
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !OrderItems.data ? <div>Data not found</div> : <>
                                {
                                    OrderItems?.data.map((order, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="p-4">
                                            <img src={order?.product?.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            <p><strong>Name: </strong>{order?.customer?.first_name} {order?.customer?.last_name}</p>
                                            <p><strong>Email: </strong>{order?.customer?.email}</p>
                                            <p><strong>Phone: </strong>{order?.customer?.phone}</p>
                                            <p><strong>Address: </strong>{order?.customer?.address?.address}</p>
                                            <p><strong>Post: </strong>{order?.customer?.address?.post}</p>
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                            {order?.product?.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                order?.product?.price
                                            }<span className="ml-2">BDT</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                renderOrderStatus(order?.order_status)
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDateTime(order?.order_time)}
                                        </td>
                                    </tr>)
                                }
                            </>
                        }


                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default CustomerTotalOrders;