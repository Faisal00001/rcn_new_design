import CategoryCard from "../CategoryCard/CategoryCard";
import useCategories from "../hooks/useCategories";
import NoData from "../../assets/Data_not_found/Data_not_found.png"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import { FaAngleRight } from "react-icons/fa";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ShopByCategory = () => {
    const navigate = useNavigate()
    const [categories, loading] = useCategories()

    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    const handleCatagory = (data) => {
        navigate(`/categories/${data?.id}`)
    }
    return (
        <div className="container mx-auto px-20 mt-10">
            <div className="border-b-2 border-b-gray-200 pb-5 relative">
                <div className="flex items-center gap-5">
                    <div className="w-3 h-3 rounded-full ring-4 ring-yellow-500"></div>
                    <h3 className="font-bold text-lg">Choose Category</h3>
                </div>
                {/* Custom Navigation Buttons */}
                <button
                    className="absolute right-10 top-1/2 border-[1px] rounded border-gray-300 transform -translate-y-1/2 z-10 bg-white text-black hover:bg-yellow-300 hover:border-yellow-300 hover:text-white p-1 focus:outline-none prev-btn"
                >
                    <MdOutlineChevronLeft className="text-xl" />
                </button>
                <button
                    className="absolute right-0 top-1/2 border-[1px] rounded border-gray-300 transform -translate-y-1/2 z-10 bg-white text-black p-1 hover:bg-yellow-300 hover:border-yellow-300 hover:text-white focus:outline-none next-btn"
                >
                    <MdOutlineChevronRight className="text-xl" />
                </button>
            </div>
            <div className="mt-10">
                <div >


                    {/* Swiper Component */}
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={15}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                        navigation={{
                            nextEl: ".next-btn",
                            prevEl: ".prev-btn",
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {categories.data.map((data, index) => (
                            <SwiperSlide onClick={() => handleCatagory(data)}
                                key={index}
                                className="w-52 h-52 bg-[#5AA1FF] rounded-full flex justify-center items-center cursor-pointer"
                            >
                                <img
                                    className="h-28 w-28 rounded transition-transform duration-300 ease-in-out hover:scale-110"
                                    src={data.category_image}
                                    alt="Category"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

            </div>




        </div>
    );
};

export default ShopByCategory;