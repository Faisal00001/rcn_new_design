import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCustomerAddressList from "../../components/hooks/useCustomerAddressList";


const ConfirmOrder = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const [orderId, setOrderId] = useState('')
    const { cartItems, setCartItems } = useContext(AuthContext)
    const totalPrice = parseFloat(localStorage.getItem('totalPrice'))

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const [selectedCourierService, setSelectedCourierService] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))

    const handleSubmitOrder = async () => {
        if (!selectedCourierService || !selectedPaymentMethod) {
            toast.error('Please select both a payment method and a courier service')
            return
        }
        // Show loading toast
        const loadingToastId = toast.loading('Processing your order...');
        const orderData = {
            cart_items: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            total_amount: totalPrice,
            payment_method: selectedPaymentMethod,
            select_courier: selectedCourierService,  // Pass the selected courier service
        };
        try {
            const response = await axiosSecure.post(
                `/submit-order/`,
                orderData
            );

            if (response.status === 201) {
                setOrderId(response.data.id);

                if (selectedPaymentMethod === 'mobile-banking') {
                    toast.dismiss(loadingToastId);
                    await initiateSSLCommerzPayment(response.data.id, totalPrice);
                } else if (selectedPaymentMethod === 'cash-on-delivery') {
                    toast.dismiss(loadingToastId);
                    // toast.success('Your order has been placed for Cash on Delivery')
                    Swal.fire({
                        icon: "success",
                        title: "Thank you...",
                        text: "Your order placed successfully",
                    });
                    setCartItems([]);
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('totalPrice');
                    // Swal.fire({
                    //     title: "Order Placed!",
                    //     text: "Thank you!",
                    //     icon: "success"
                    // });
                    navigate('/dashboard/orderHistory')
                }
            }
        } catch (error) {
            toast.dismiss(loadingToastId);
            console.error('Error submitting order:', error);
        }
    }
    const initiateSSLCommerzPayment = async (orderId, amount) => {
        const paymentLoadingToastId = toast.loading('Redirecting to payment gateway...');
        try {
            const response = await axiosSecure.post(
                `/initiate-payment/`,
                { order_id: orderId, amount: amount },
            );
            toast.dismiss(paymentLoadingToastId);
            window.location.href = response.data.GatewayPageURL;
            // setCartItems([])
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');
        } catch (error) {
            console.error('Error initiating SSLCommerz payment:', error);
        }
    };
    return (
        <div>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-2xl px-4 2xl:px-0">
                    <h2 className="text-3xl text-center font-semibold text-gray-900  sm:text-2xl mb-2">Please confirm your order !</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-3 md:mb-3 mt-10">Order Summery </p>
                    <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
                        {
                            cartItems.map((order, index) =>
                                <dl key={index} className="sm:flex items-center justify-between gap-4">
                                    <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Order Item</dt>
                                    <dd className="font-medium text-gray-900 dark:text-white sm:text-end"> {order.title}</dd>
                                </dl>)
                        }

                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Total Price</dt>
                            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">{totalPrice} BDT</dd>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Courier Service</dt>
                            <select value={selectedCourierService} onChange={(e) => setSelectedCourierService(e.target.value)} className="select select-success w-full max-w-[250px]">
                                <option disabled value={''}>Select Courier Service</option>
                                <option value="Sundarban Courier Service (SCS)">Sundarban Courier Service (SCS)</option>
                                <option value="Karatoa Courier Service (KCS)">Karatoa Courier Service (KCS)</option>
                                <option value="Afzal parcel & courier">Afzal parcel & courier</option>
                                <option value="RedX">RedX</option>
                                <option value="eCourier">eCourier</option>
                                <option value="Pathao Courier">Pathao Courier</option>
                                <option value="Delivery Tiger">Delivery Tiger</option>
                                <option value="Janani Express Parcel Service">Janani Express Parcel Service</option>
                                <option value="Sheba Delivery">Sheba Delivery</option>
                            </select>
                        </dl>
                        <dl className="sm:flex items-center justify-between gap-4">
                            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">Payment Method</dt>
                            <select value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)} className="select select-info w-full max-w-[250px]">
                                <option disabled value={''}>Select payment method</option>
                                {/* <option value="paypal">PayPal</option> */}
                                <option value="cash-on-delivery">Cash on Delivery</option>
                                {/* <option value="mobile-banking">Mobile Banking</option> */}
                            </select>
                        </dl>

                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleSubmitOrder} className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5">Confirm Order</button>
                        <Link to={'/'} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Return to shopping</Link>
                    </div>
                </div>
            </section>



        </div>
    );
};

export default ConfirmOrder;