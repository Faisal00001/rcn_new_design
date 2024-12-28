import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTruck } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Link, Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import ProductDetailsSlider from "../../components/ProductDetailsSlider/ProductDetailsSlider";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import useProducts from "../../components/hooks/useProducts";
import ProductOverview from "../../components/ProductOverview/ProductOverview";
import Swal from "sweetalert2";



// import required modules

const ProductDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const isSeller = user?.isSeller ? true : false


    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [product, setProduct] = useState(null)

    const { id } = useParams()

    const productIdInt = parseInt(id)
    const { cartItems, setCartItems } = useContext(AuthContext)
    const [products, loading] = useProducts()

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Start loading
                setIsLoading(true);

                // Make a GET request to the API endpoint
                const response = await axios.get(`http://127.0.0.1:8000/api/product/${productIdInt}/?format=json`);

                // Extract the data from the response
                const fetchedData = response.data;

                // Update state with fetched data
                setProduct(fetchedData);
            } catch (error) {
                // Handle errors
                setError(error.message);
            } finally {
                // Finish loading
                setIsLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [productIdInt]);



    if (isLoading) {
        return "Loading"
    }
    if (loading) {
        return "Loading"
    }


    const tag_list_products = product.tags.split(',').flatMap(tag => {
        return products.data.filter(p => p.tags.split(',').includes(tag) && p.id !== product.id);
    });

    const unique_tag_list_products = Array.from(new Set(tag_list_products));


    const handleAddToCart = (product) => {
        if (isSeller) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Access denied!. Only customer can access.",
            });
            return;
        }
        const isFound = cartItems.find(cartItem => cartItem.id === product.id)
        if (!isFound) {
            const newProduct = { ...product, quantity: 1, unitPrice: product.price, wishListStatus: false };
            const newCartItems = [...cartItems, newProduct]
            setCartItems(newCartItems)
            toast.success('Success! Your item has been added to the cart.')
        }
    }

    return (
        <div>
            <div className="container mx-auto">
                <div className="flex gap-3 cursor-pointer mt-5 items-center ">
                    <h3 className="text-sm hover:underline text-blue-800">Home</h3>
                    <MdKeyboardArrowRight />
                    <h3 className="text-sm hover:underline text-blue-800">Tv</h3>
                    <MdKeyboardArrowRight />
                    <h3 className="text-sm">Product Details</h3>
                </div>
                <div className="mt-20">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="flex-1 mx-auto">

                            <div className="px-5 md:px-0 md:w-[600px]">
                                <ProductImageGallery product={product}></ProductImageGallery>

                            </div>

                        </div>
                        <div className="flex-1 px-5 md:px-0">
                            <p className="text-xl font-semibold">{product?.title}</p>
                            <p className="mt-3 text-sm">{product?.detail}</p>
                            <div className="flex gap-2 mt-2 items-center">
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask w-4 mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" className="mask w-4 mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" className="mask w-4 mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" className="mask w-4 mask-star-2 bg-yellow-400" />
                                    <input type="radio" name="rating-2" className="mask w-4 mask-star-2 bg-yellow-400" />
                                </div>
                                <p className="text-xs mt-1 text-blue-800 cursor-pointer">4.6(563 Reviews)</p>
                                <div className="flex mt-1 gap-2 ml-3 items-center">

                                    <p className="text-xs text-blue-800 hover:underline cursor-pointer">Write your review</p>
                                    <MdKeyboardArrowRight className="cursor-pointer text-blue-800" />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-sm font-medium">Sold and shipped by kappotakko Electronics</p>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-2xl font-bold">{product?.price} BDT</h3>
                            </div>
                            <div className="mt-5 flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <div><RiDiscountPercentLine className="text-2xl" /></div>
                                    <div><p className="text-sm font-semibold">2 special offers available!</p></div>
                                </div>
                                <div className="text-blue-800 font-medium cursor-pointer flex items-center">
                                    <p className="text-sm hover:underline">See all 2 offers</p>
                                    <MdKeyboardArrowRight />
                                </div>
                            </div>
                            <div className="mt-5 w-[90%] mx-auto border-2 group border-black hover:border-blue-800 cursor-pointer">
                                <div className="flex justify-between px-5 items-center py-3">
                                    <p className="text-xs text-blue-800 font-bold group-hover:underline">Save up to 20% on select Rocketfish HDMI cables when you buy any TV.*</p>
                                    <MdKeyboardArrowRight className="text-blue-800 text-2xl" />
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="bg-[#ECECEC]">
                                <div className="py-7">
                                    <div className="flex flex-col gap-y-5 md:gap-y-0 md:flex-row justify-center px-5 md:px-0">
                                        <button className="bg-blue-900 text-white text-sm font-medium py-4  px-10 md:px-20 rounded">Delivery</button>
                                        <button className="text-blue-800 py-4 px-10 md:px-20 text-sm font-medium bg-white rounded">Pick Up</button>
                                    </div>
                                    <div className="mt-8 flex gap-2 items-center lg:pl-24 justify-center lg:justify-normal">
                                        <FaTruck className="text-2xl" />
                                        <p className="font-medium">Available to ship</p>
                                    </div>
                                    <div className="lg:pl-32 mt-5  text-center lg:text-left">
                                        <p className="text-sm">This will be delivered as early as May 15, 2024</p>
                                        <p className="mt-2 text-sm">Enjoy <span className="text-blue-800 font-semibold"> fast, free shipping</span> on <span className="font-semibold">most orders over $35.</span></p>
                                    </div>
                                    <div onClick={() => handleAddToCart(product)} className="lg:pl-32 mt-5 flex justify-center lg:justify-normal">
                                        <button className="text-black bg-yellow-500 hover:bg-yellow-400  font-medium rounded text-sm px-10 md:px-36 py-4 text-center">Add to Cart</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="my-10">
                <hr />
            </div>
            <div className="flex flex-col lg:flex-row px-10">
                <div className="lg:w-[70%]">
                    <div className="flex flex-wrap gap-5 md:gap-0 md:flex-row md:gap-x-8">
                        <button className="btn btn-active bg-white">Specification</button>
                        <button className="btn btn-active bg-white">Description</button>
                        <button className="btn btn-active bg-white">Questions</button>
                        <button className="btn btn-active bg-white">Reviews</button>
                    </div>
                    <div>
                        <ProductOverview product={product}></ProductOverview>
                    </div>
                </div>
                <div className="lg:w-[30%]">
                    <div className="mt-10 xl:mt-8">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">People also bought</h3>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8">
                            {
                                unique_tag_list_products.map(product => <div key={product.id} className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <div className="overflow-hidden rounded">
                                        <img src={product.image} alt="" />

                                    </div>
                                    <div>
                                        <Link to={`/productDetails/${product.id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{product.title}</Link>
                                        <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">{product.detail}</p>
                                    </div>
                                    <div>
                                        {/* <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            <span className="line-through"> $399,99 </span>
                                        </p> */}
                                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">{product.price} BDT</p>
                                    </div>
                                    <div className="mt-6 flex items-center gap-2.5">
                                        <button data-tooltip-target="favourites-tooltip-1" type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                            </svg>
                                        </button>
                                        <div id="favourites-tooltip-1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                            Add to favourites
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <button type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-3 md:px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                            </svg>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>)
                            }


                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProductDetails;