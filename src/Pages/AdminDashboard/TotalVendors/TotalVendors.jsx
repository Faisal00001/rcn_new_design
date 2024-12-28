import { useState } from "react";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useTotalVendors from "../../../components/hooks/useTotalVendors";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const TotalVendors = () => {
    const axiosSecure = useAxiosSecure()
    const [totalVendors, loading, refetch] = useTotalVendors()

    if (loading) {
        return "Loading"
    }
    const showConfirm = (vendor_id) => {
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
                axiosSecure.delete(`/delete-vendor/${vendor_id}/`)
                    .then(res => {
                        if (!res.ok) {
                            toast.success("Successfully Deleted")
                        }
                        refetch()
                    })
                    .catch((error) => {
                        toast.error('Failed to delete')
                        console.log(error)
                    })
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }
    return (
        <div>
            <div className="my-10">
                <h3 className="text-2xl font-bold md:text-4xl text-center">Total Vendors</h3>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-6 py-3">
                                Full name
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            totalVendors.data.map((vendor, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <span> {vendor?.user.first_name}</span>
                                    <span className="ml-2">{vendor?.user.last_name}</span>
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {vendor.user.email}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {vendor.phone}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {vendor.address}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <div className="flex gap-5">
                                        <div>
                                            <Link to={`/adminDashboard/vendor_total_orders/${vendor.id}`} className="btn bg-blue-500 hover:bg-blue-500 text-white">Orders</Link>
                                        </div>
                                        <div>
                                            <button onClick={() => showConfirm(vendor.id)} className="btn bg-red-500 hover:bg-red-500 text-white">Delete</button>
                                        </div>
                                    </div>
                                </td>

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalVendors;