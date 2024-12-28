import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const VendorAllOrders = () => {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [orderItems, setOrderItems] = useState([]);
    const { vendor_id } = useParams();
    console.log(vendor_id)
    useEffect(() => {
        if (vendor_id) {
            fetchData(`${baseUrl}/vendor/${vendor_id}/ordered-products/`);
        }
    }, [vendor_id]);

    const fetchData = (url) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setOrderItems(data.data); // Access the `data` field of the API response
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    console.log(orderItems)
    return (
        <div>


            <div className="ml-10 relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                Order Count
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Confirmed Orders
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            !orderItems ? 'No order found' :
                                orderItems.map((orderItem, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={orderItem.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Order" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {orderItem.customers.length > 0 ? (
                                            orderItem.customers.map((customer, customerIndex) => (
                                                <div key={customerIndex}>
                                                    <p><strong>Name: </strong>{customer.user.first_name} {customer.user.last_name}</p>
                                                    <p><strong>Email: </strong>{customer.user.email}</p>
                                                    <p><strong>Phone: </strong>{customer.phone}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No customer data available</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            orderItem.title
                                        }

                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {
                                            orderItem.price
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        Ordered {orderItem.order_count} times
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Count confirmed orders */}
                                        {orderItem.customers.reduce((acc, customer) => {
                                            return acc + customer.orders.filter(order => order.order_status === 'Confirm').length;
                                        }, 0)}
                                        {/* Total Confirmed Orders */}
                                    </td>

                                </tr>

                                )
                        }



                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default VendorAllOrders;