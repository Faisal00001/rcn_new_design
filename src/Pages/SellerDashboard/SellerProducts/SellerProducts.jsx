import { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useVendorProducts from "../../../components/hooks/useVendorProducts";


const SellerProducts = () => {
    const [vendorProducts, loading, refetch] = useVendorProducts()
    // const [loading, setLoading] = useState(true)
    // const [ProductData, setProductData] = useState([]);
    const axiosSecure = useAxiosSecure()
    // const axiosPublic = useAxiosPublic()
    // const fetchProductData = useCallback(async () => {
    //     setLoading(true)
    //     axiosSecure.get('/vendor-products/')
    //         .then(res => {
    //             setProductData(res.data?.data)
    //             setLoading(false)
    //         })
    //         .catch(error => console.log(error))
    // }, [axiosSecure])
    // useEffect(() => {
    //     fetchProductData()
    // }, [fetchProductData])
    if (loading) {
        return "Loading"
    }
    const handleDeleteProduct = (product_id) => {
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
                axiosSecure.delete(`/product/${product_id}/`)
                    .then(res => {
                        console.log('My response ', res)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
                    .catch(error => console.log(error))

            }
        });
    }
    console.log('Vendor produycts', vendorProducts)
    return (
        <div >
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
                                        }  <span className="ml-3">BDT</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">

                                            <Link to={`/sellerDashboard/updateProductDetails/${product.id}`} className="btn bg-blue-500 text-white hover:bg-blue-600">Update</Link>
                                            <button onClick={() => handleDeleteProduct(product.id)} className="btn bg-red-500 text-white hover:bg-red-600">Delete</button>
                                            <Link to={`/sellerDashboard/addCoupon/${product.id}`} className="btn bg-green-500 text-white hover:bg-green-600">Add Coupon</Link>
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

export default SellerProducts;