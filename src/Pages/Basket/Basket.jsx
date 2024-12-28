import { useContext, useEffect, useState } from "react";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";


const Basket = () => {
    const axiosSecure = useAxiosSecure()
    // const parsedUser = JSON.parse(localStorage.getItem('user'))
    // const token = parsedUser.access_token
    const { user } = useContext(AuthContext)
    const { cartItems, setCartItems } = useContext(AuthContext)
    const [order_id, setOrderId] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [originalPrice, setOriginalPrice] = useState(0)
    // const [productWishList, setProductInWishList] = useState(() => {
    //     const wishListStatus = cartItems.reduce((acc, product) => {
    //         acc[product.id] = product.status = false

    //     }, {})
    //     return wishListStatus
    // })
    const axiosPublic = useAxiosPublic()


    // const initialQuantities = cartItems.reduce((acc, product) => {
    //     acc[product.id] = 1
    //     return acc;
    // }, {})

    // const prices = cartItems.reduce((acc, product) => {
    //     acc[product.id] = product.price
    //     return acc;
    // }, {})
    const [quantities, setQuantities] = useState({})
    // Initialize quantities when cartItems change
    const storedUser = localStorage.getItem('user');
    const [customerId, setCustomerId] = useState(null)
    useEffect(() => {
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCustomerId(parseInt(user.id))
        }
    }, [storedUser])



    // useEffect(() => {
    //     const initialQuantities = cartItems.reduce((acc, product) => {
    //         acc[product.id] = 1; // Initial quantity is set to 1
    //         return acc;
    //     }, {});
    //     setQuantities(initialQuantities);
    // }, [cartItems]);
    const navigate = useNavigate()
    useEffect(() => {
        const originalPrice = cartItems.reduce((accumulator, currentValue) => {
            return accumulator + parseFloat(currentValue.price)
        }, 0.0)
        setOriginalPrice(originalPrice)
        setTotalPrice(originalPrice)
    }, [cartItems])
    const handleRemoveItem = (cartItem) => {
        const updatedItems = cartItems.filter(item => item.id !== cartItem.id)
        setCartItems(updatedItems)
    }
    // const getOrderId = () => {

    //     const formData = new FormData();
    //     formData.append('customer', customerId);
    //     axiosPublic.post('/orders/', formData)
    //         .then(res => {
    //             setOrderId(res.data.id)
    //             handleCheckout(res.data.id)
    //         })
    //         .catch(error => console.log(error.message))
    // }
    // const handleCheckout = async () => {
    //     const order_id = getOrderId()
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    //     console.log('Basket cart Items ', cartItems)
    //     if (cartItems != null) {
    //         cartItems.map((cart) => {
    //             const formData = new FormData()
    //             formData.append('order', order_id);
    //             formData.append('product', cart.id);
    //             formData.append('quantity', cart.quantity);
    //             formData.append('price', cart.price);
    //             formData.forEach((value, key) => {
    //                 console.log(`${key}: ${value}`);
    //             });
    //             return axiosPublic.post('/order-items/', formData);


    //         })
    //         try {
    //             // Wait for all post requests to complete
    //             await Promise.all(postRequests);
    //             // Clear the cart and navigate after all requests are successful
    //             localStorage.removeItem('cartItems');
    //             console.log('All items posted successfully');
    //             // navigate('/checkout'); // Uncomment if you have a navigate function or use appropriate navigation logic
    //         } catch (error) {
    //             console.error('An error occurred while posting the cart items:', error);
    //         }
    //     }
    //     // navigate('/checkout')
    // }

    const handleCheckout = () => {
        if (!user) {
            navigate('/login')
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Login to proceed for checkout!",
            });
            return; // Exit the function early if user is not present
        }

        localStorage.setItem('totalPrice', totalPrice)
        navigate('/dashboard/CustomerAddress')
    }
    // const handleCheckout = async () => {
    //     const formData = new FormData();
    //     formData.append('customer', customerId);
    //     const orderIdResponse = await axiosPublic.post('/submit-order/', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     const order_id = orderIdResponse.data.id
    //     console.log('Order id ki', order_id)
    //     // localStorage.setItem('order_id', order_id)
    //     const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    //     console.log('Basket cart Items', cartItems);
    //     if (cartItems != null) {
    //         // Collect all the post requests as promises
    //         const postRequests = cartItems.map(async (cart) => {
    //             const formData = new FormData();
    //             formData.append('order', order_id);
    //             formData.append('product', cart.id);
    //             formData.append('quantity', cart.quantity);
    //             formData.append('price', 8);
    //             // Return the axios post promise
    //             return axiosPublic.post('/order-items/', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })

    //         });

    //         try {
    //             // Wait for all post requests to complete
    //             await Promise.all(postRequests);
    //             // Clear the cart and navigate after all requests are successful
    //             setCartItems([])
    //             Swal.fire({
    //                 title: "Order Placed!",
    //                 text: "Pay Now Please!",
    //                 icon: "success"
    //             });
    //             navigate('/dashboard/orderHistory')
    //             // navigate('/checkout'); // Uncomment if you have a navigate function or use appropriate navigation logic
    //         } catch (error) {
    //             console.error('An error occurred while posting the cart items:', error);
    //         }
    //     }
    // };

    // const handleIncQuantity = (id) => {
    //     setQuantities(prevQuantity => ({
    //         ...prevQuantity,
    //         [id]: prevQuantity[id] + 1

    //     }))
    // }
    // const handleDecQuantity = (id) => {
    //     setQuantities(prevQuantity => ({
    //         ...prevQuantity,
    //         [id]: prevQuantity[id] > 1 ? prevQuantity[id] - 1 : 1
    //     }))
    //     console.log('What', quantities[id])
    //     updateCartItemPrice(id, quantities[id])
    // }
    // Update quantities and recalculate total price

    const handleQuantityChange = (id, delta) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(item.quantity + delta, 1);
                const newPrice = newQuantity * item.unitPrice;
                return { ...item, quantity: newQuantity, price: newPrice };
            }
            return item;
        })
        // .filter(item => item.quantity > 0); // Remove items with zero quantity

        setCartItems(updatedCartItems);
        // localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    // const calculatePrice = (id) => {
    //     setCartItems()
    //     return quantities[id] * prices[id]
    // }
    // Update the price of the cart item based on the new quantity
    const handleAddToWishList = async (cartItem) => {
        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please Login to add product in your wishlist!",
            });

            return; // Exit the function early if user is not present
        }

        try {
            const wishListStatus = await checkProductInWishList(cartItem);

            if (wishListStatus) {
                return; // Exit the function if the item is already in the wishlist
            }

            const customerId = user.id;
            const formData = new FormData();
            formData.append('customer', customerId);
            formData.append('product', cartItem.id);

            const response = await axiosSecure.post('/wishlist/', formData);

            setCartItems(cartItems.map(item => item.id === cartItem.id ? { ...item, wishListStatus: true } : item)); // Update wishlist status on success
            toast.success("Item added in the wishlist")

        } catch (error) {
            console.error('Error saving to wishlist:', error);
        }
    }

    const checkProductInWishList = async (productData) => {

        if (!user) {
            return "Loading"
        }
        const customerId = user.id
        const formData = new FormData();
        formData.append('customer', customerId);
        formData.append('product', productData.id);
        try {
            const res = await axiosPublic.post('check-in-wishlist/', formData)
            if (res.data.bool === true) {
                return true
            }
            else {
                return false
            }
        }
        catch (error) {
            console.log('Error finding item in wishlist ', error)
        }

        // axiosPublic.post('check-in-wishlist/', formData)
        //     .then(res => {
        //         if (res.data.bool === true) {
        //             return true

        //         }
        //         else {
        //             return false
        //         }
        //     })
        //     .catch(error => {
        //         console.log('Error checking wishlist ', error)
        //     })
    }
    return (
        <div>
            {
                cartItems.length !== 0 ? <>

                    <section className="bg-white py-8 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    <div className="space-y-6">
                                        {
                                            cartItems.map((cartItem, index) =>
                                                <div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm  md:p-6">
                                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                        <div className="shrink-0 md:order-1">
                                                            <img className="h-20 w-20 " src={cartItem.image} alt="imac image" />

                                                        </div>

                                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                            <div className="flex items-center">
                                                                <button
                                                                    onClick={() => handleQuantityChange(cartItem.id, -1)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                                    </svg>
                                                                </button>
                                                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={cartItem.quantity} readOnly />
                                                                <button onClick={() => handleQuantityChange(cartItem.id, 1)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                                                                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="text-end md:order-4 md:w-32">
                                                                <p className="text-base font-bold text-gray-900 dark:text-white">{cartItem.price} BDT</p>
                                                            </div>
                                                        </div>

                                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                            <Link className="text-base font-medium text-gray-900 hover:underline dark:text-white">{cartItem.detail.slice(0, 150)}...</Link>

                                                            <div className="flex items-center gap-4">
                                                                <button onClick={() => handleAddToWishList(cartItem)} type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                                                                    <span className="mr-2">

                                                                        {
                                                                            cartItem.wishListStatus ? <FaHeart className="text-xl text-red-500" /> : <FaRegHeart className="text-xl" />
                                                                        }
                                                                    </span>

                                                                    Add to Favorites
                                                                </button>

                                                                <button onClick={() => handleRemoveItem(cartItem)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                                    </svg>
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }





                                    </div>

                                </div>

                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">{originalPrice} BDT</dd>
                                                </dl>

                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                                                    <dd className="text-base font-medium text-green-600">-299.00 BDT</dd>
                                                </dl>

                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">99 BDT</dd>
                                                </dl>

                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                                    <dd className="text-base font-medium text-gray-900 dark:text-white">799 BDT</dd>
                                                </dl>
                                            </div>

                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                                <dd className="text-base font-bold text-gray-900 dark:text-white">{totalPrice} BDT</dd>
                                            </dl>
                                        </div>

                                        {/* <button className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button> */}
                                        <button onClick={handleCheckout} className="flex w-full bg-blue-700 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">Proceed to Checkout</button>

                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                                            <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                                                Continue Shopping
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                        <form className="space-y-4">
                                            <div>
                                                <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
                                                <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
                                            </div>
                                            <button className="flex w-full bg-blue-700 items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800">Apply Code</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </> : <>
                    <div className="container mx-auto">
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-2xl mt-5">Your Cart</h3>
                                <h3 className="mt-5 text-xl font-semibold">Looks like it’s empty!</h3>
                                <p className="text-sm mt-3">Why not add something?</p>
                            </div>
                            <div className="mt-14">
                                <MdRemoveShoppingCart className="text-8xl" />
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export default Basket;