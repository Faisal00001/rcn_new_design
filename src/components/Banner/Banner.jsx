// import image1 from "../../assets/images/banner/image1.jpg";
// import image2 from "../../assets/images/banner/image2.jpg";
// import image3 from "../../assets/images/banner/image3.jpg";
// Swiper
// Import Swiper React components


// test purpose

import offer1 from "../../assets/special_offer/offer1.png"
import offer2 from "../../assets/special_offer/offer2.png"




// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';


// // import required modules
// import { Pagination } from 'swiper/modules';
// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

// import NoData from "../../assets/Data_not_found/Data_not_found.png"
import useCategories from "../hooks/useCategories";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import required modules
const Banner = () => {
    const [bannerImages, setBannerImages] = useState([])
    const axiosPublic = useAxiosPublic()
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    // const navigate = useNavigate()
    // const [isFliped, setIsFliped] = useState(false)
    // const [isAnimating, setIsAnimating] = useState(false)
    // const handleFliped = () => {
    //     setIsFliped(!isFliped)
    //     setIsAnimating(true)
    // }
    const [categories, categoriesLoading] = useCategories()
    const [products, loading] = useProducts()
    useEffect(() => {
        axiosPublic.get(`/banner-images/`)
            .then(res => {
                setBannerImages(res.data)
            })
            .catch(error => console.log(error))
    }, [axiosPublic])
    if (categoriesLoading) {
        return "Loading"
    }
    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }

    const hotOffersProduct = products?.data?.filter(product => product.hot_deal === true) || []
    console.log(hotOffersProduct)
    return (
        <div className="bg-[#ECF9FF] min-h-screen flex justify-center items-center py-10 lg:py-0">
            <div className="bg-white h-full lg:h-[80vh] w-[95%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[73%] shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">

                    {/* Left Sidebar */}
                    <div className="md:w-1/4 border-r border-gray-200 bg-gray-50">
                        <div className="px-5 py-4 border-b border-gray-300">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-500"></div>
                                Market
                            </h3>
                        </div>
                        <div className="h-full overflow-y-auto">
                            {categories.data.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-100 transition"
                                >
                                    <div className="avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={data?.category_image} alt="Category" />
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium">{data?.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Middle Content - Swiper */}
                    <div className="md:w-2/4 relative group overflow-hidden">
                        {/* Custom navigation buttons */}
                        <button
                            ref={prevRef}
                            className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500"
                        >
                            <MdKeyboardArrowLeft className="text-2xl" />
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-yellow-500"
                        >
                            <MdKeyboardArrowRight className="text-2xl" />
                        </button>
                        <Swiper
                            modules={[Navigation]}
                            loop={true}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            className="h-full w-full"
                        >
                            <SwiperSlide>
                                <img className="h-full w-full object-cover" src={offer1} alt="Offer 1" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img className="h-full w-full object-cover" src={offer2} alt="Offer 2" />
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    {/* Right Sidebar */}
                    <div className="md:w-1/4 bg-gray-50 overflow-y-auto">
                        {hotOffersProduct.map((data, index) => (
                            <div
                                key={index}
                                className="h-48 w-[90%] mx-auto my-5 shadow-lg rounded-lg overflow-hidden"
                            >
                                <img
                                    className="h-full w-full object-contain"
                                    src={data.image}
                                    alt="Hot Offer"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;