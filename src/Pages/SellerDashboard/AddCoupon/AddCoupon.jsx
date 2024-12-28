import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";


const AddCoupon = () => {
    const { product_id } = useParams()
    const product_id_int = parseInt(product_id)
    const vendor = JSON.parse(localStorage.getItem('user'))
    const sellerId = vendor.id
    const axiosSecure = useAxiosSecure()

    const [couponData, setCouponData] = useState({
        code: '',
        discount_amount: '',
        is_active: true,
        expiration_date: '',
        expiration_time: '',
        product: product_id_int,
        vendor: sellerId
    });
    // const [products, setProducts] = useState([]);
    // const [errorMsg, setErrorMsg] = useState('');
    // const [successMsg, setSuccessMsg] = useState('');
    // const [selectedProduct, setSelectedProduct] = useState(null);
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setCouponData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // if (name === 'product') {
        //     const product = products.find(prod => prod.id === Number(value));
        //     setSelectedProduct(product);
        // }
    };
    const checkBoxHandler = (event) => {
        setCouponData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.checked
        }))
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const expirationDateTime = `${couponData.expiration_date}T${couponData.expiration_time}`;
        console.log(expirationDateTime)
        axiosSecure.post('/coupons/', {
            ...couponData,
            expiration_date: expirationDateTime,
            products: couponData.product,
            vendor: couponData.vendor
        })
            .then(res => {
                if (res.data.id) {
                    toast.success("Coupon addded successfully")
                    setCouponData({
                        code: '',
                        discount_amount: '',
                        is_active: true,
                        expiration_date: '',
                        expiration_time: '',
                        product: product_id_int,
                        vendor: sellerId
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

        // try {

        // } catch (error) {
        //     console.log(error)
        // }

    }
    console.log(couponData)
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-center">Coupon</h3>
            <div className="mt-10">


                <form onSubmit={submitHandler} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-900">Coupon Code</label>
                        <input name="code" value={couponData.code}
                            onChange={inputHandler} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coupon Code" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900">Discount Amount</label>
                        <input name="discount_amount"
                            value={couponData.discount_amount}
                            onChange={inputHandler} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discount Amount" required />
                    </div>
                    <div className="mb-5">
                        <div className="max-w-md mx-auto">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiration Date</label>
                            <input
                                type="date"
                                name="expiration_date"
                                value={couponData.expiration_date}
                                onChange={inputHandler}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="max-w-md mx-auto">
                            <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">
                                Select a Time
                            </label>
                            <input
                                type="time"
                                name="expiration_time"
                                value={couponData.expiration_time}
                                onChange={inputHandler}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input name="is_active"
                                checked={couponData.is_active} type="checkbox" onChange={checkBoxHandler} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Active</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Coupon</button>
                </form>

            </div>
        </div>
    );
};

export default AddCoupon;