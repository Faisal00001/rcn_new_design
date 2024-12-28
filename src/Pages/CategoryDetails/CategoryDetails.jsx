import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import backgroundImage from "../../assets/images/CategoryDetails/bg.jpg";

import MenuEntry from "../../components/MenuEntry/MenuEntry";
import ProductCard from "../../components/ProductCard/ProductCard";
import useCategories from "../../components/hooks/useCategories";

import useCategoryWiseProducts from "../../components/hooks/useCategoryWiseProducts";
import noData from "../../assets/Data_not_found/Data_not_found.png"
const CategoryDetails = () => {
    const [showCategoriesOptions, setShowCategoriesOptions] = useState(false)
    let { id } = useParams()
    let idInt = parseInt(id)
    // const itemsPerPage = 10;
    // const [isloading, setIsLoading] = useState(false);
    // const [productContainer, setProductContainer] = useState([])
    // const [totalPages, setTotalPages] = useState(0);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [products, loading] = useProducts()
    const [categories, loading] = useCategories()
    const [categoryWiseProducts, categoryWiseloading] = useCategoryWiseProducts(idInt)
    // useEffect(() => {
    //     const fetchProducts = async (page) => {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch(
    //                 `https://kopotakkhoelectronics.com/api/products/?category=${idInt}&page=${page}`
    //             );
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch products");
    //             }
    //             const data = await response.json();
    //             setProductContainer(data.data || []);
    //             const totalItems = data.count || 0;
    //             setTotalPages(Math.ceil(totalItems / itemsPerPage));
    //         } catch (error) {
    //             console.error("Error fetching products:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchProducts(currentPage);
    // }, [idInt, currentPage]);


    if (loading) {
        return "Loading"
    }
    if (categoryWiseloading) {
        return ""
    }
    const categoryName = categories.data?.find(category => category.id === idInt)

    // const categoryWiseProducts = products?.data.filter(product =>
    //     product.category === idInt
    // )



    return (
        <div>
            <div className="flex container mx-auto px-20 mt-5">
                <div className="w-[15%]">
                    <h3 className="font-bold">Product Categories</h3>

                    {
                        categories?.data.map(category => <MenuEntry key={category.id} option={category}></MenuEntry>)
                    }
                </div>
                <div className="w-[70%] px-3">
                    <div>
                        <h3 className="text-3xl font-bold">Category: {categoryName.title}</h3>
                        <p className="text-sm my-5">Showing all {categoryWiseProducts?.data.length} results</p>
                    </div>
                    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {
                            categoryWiseProducts?.data.map((data, index) => <div key={index} className="card card-compact rounded cursor-pointer">
                                <figure>
                                    <img
                                        className="h-40"
                                        src={data?.image}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-sm">{data?.title}</h2>
                                    <p>
                                        {
                                            data?.detail.slice(0, 19)
                                        }...
                                    </p>
                                    <p className="font-bold">Price: {data?.price} BDT</p>

                                </div>
                            </div>)
                        }
                    </div>


                </div>
                <div className="w-[15%] ">
                    <div className="flex text-sm gap-2">
                        <Link to={'/'}>Home</Link> <span>/</span> <p>Products</p> <span>/</span> <p>{categoryName?.title}</p>
                    </div>
                    <div className="mt-5">
                        <select className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none transition duration-200 bg-white text-gray-700 hover:bg-gray-50">
                            <option value="" disabled selected>
                                Default Sorting
                            </option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                        </select>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetails;