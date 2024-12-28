import { useCallback, useEffect, useState } from "react";
import useVendorProducts from "../../../components/hooks/useVendorProducts";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AddProductSpecification = () => {
    const axiosSecure = useAxiosSecure()
    const [vendorProducts, loading] = useVendorProducts()
    if (loading) {
        return "Loading"
    }

    return (
        <div>
            <div className="text-center mb-10 text-2xl font-bold md:text-4xl">Add product specification</div>


            <div className="ml-10">
                <h3 className="text-2xl md:text-4xl font-bold text-center mb-10">Products</h3>


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
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vendorProducts?.data?.map((product, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 ">
                                    <td className="p-4">
                                        <img src={product.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
                                        {
                                            product.title
                                        }

                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {
                                            product.price
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">

                                            <Link to={`/sellerDashboard/addSpecificationOnParticularProduct/${product.id}`} className="btn bg-blue-500 text-white hover:bg-blue-600">Add Product Specification</Link>


                                        </div>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default AddProductSpecification;