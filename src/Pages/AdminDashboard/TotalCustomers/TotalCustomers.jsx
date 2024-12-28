import { useEffect, useState } from "react";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useTotalCustomers from "../../../components/hooks/useTotalCustomers";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const TotalCustomers = () => {
    const axiosSecure = useAxiosSecure()

    const [totalCustomers, loading, refetch] = useTotalCustomers()
    if (loading) {
        return "Loading"
    }
    const handleDelete = (customer_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-customer-orders/${customer_id}/`)
                    .then(response => {

                        if (response.ok) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error('Failed to delete product')
                    })

            }
        });
    }
    return (
        <div>
            <h3 className="my-10 text-center text-2xl font-bold md:text-4xl">Total Customers</h3>


            <div className="ml-10 relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Full name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalCustomers.data.length > 0 ?
                                totalCustomers?.data.map((customer, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {customer.user.first_name} {customer.user.last_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.phone}
                                    </td>
                                    <td className="px-6 py-4 flex gap-2 items-center ">
                                        <Link to={`/adminDashboard/customer_total_orders/${customer.id}`} className="btn bg-blue-500 hover:bg-blue-500 text-white">
                                            Orders
                                        </Link>
                                        <button onClick={() => handleDelete(customer.id)} className="btn bg-red-500 hover:bg-red-500 text-white">Remove</button>
                                    </td>
                                </tr>)
                                : 'No cutomer found'
                        }


                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default TotalCustomers;