import { Link } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useState } from "react";
import useVendorProducts from "../../../components/hooks/useVendorProducts";


const UpdateProduct = () => {

    const [vendorProducts, loading] = useVendorProducts()
    if (loading) {
        return "Loading"
    }
    console.log(vendorProducts)

    return (
        <div>
            <h3 className="text-2xl md:text-4xl text-center font-bold">Update Prodcuts</h3>
            <div className="ml-10 my-10">


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
                                vendorProducts.data.map((product, index) => <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={product.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
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
                                        <Link to={`/sellerDashboard/updateProductDetails/${product.id}`} className="font-medium text-blue-600  hover:underline">Update</Link>
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

export default UpdateProduct;