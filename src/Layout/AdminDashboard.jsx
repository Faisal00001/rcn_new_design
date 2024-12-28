import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";

import { MdDoNotDisturbOnTotalSilence, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import Navbar from "../Shared/Navbar/Navbar";
import { GoListUnordered } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


const AdminDashboard = () => {
    const location = useLocation()
    const [pathName, setPathName] = useState('')
    useEffect(() => {
        if (location.pathname === '/dashboard/orderHistory') {
            setPathName('Order History')
        }
        if (location.pathname === '/dashboard/myWishlist') {
            setPathName('My Wishlist')
        }
        if (location.pathname === '/dashboard/personalDetails') {
            setPathName('Personal Details')
        }
        if (location.pathname === '/dashboard/profile') {
            setPathName('Profile')
        }
    }, [location.pathname])
    return (
        <div>
            <Navbar></Navbar>
            <div className="container mx-auto my-5">
                <div className="flex gap-5">
                    <Link
                        to={'/'} className="flex gap-1 items-center">
                        <h3 className="text-sm cursor-pointer text-blue-500 hover:underline">Home</h3>
                        <MdOutlineKeyboardArrowRight className="text-2xl" />
                    </Link>
                    <div className="flex gap-1 items-center">
                        <h3 className="text-sm">{pathName}</h3>

                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="drawer md:w-[25%] lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col items-center justify-center pl-5">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Click to open menus</label>

                        </div>
                        <div className="drawer-side z-50 lg:z-0">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <a
                                    href="https://kopotakkhoelectronics.com/KpeAdmin-secret/admin/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-3 px-2 text-blue-800 flex gap-2 items-center hover:bg-black hover:text-white rounded-sm font-semibold"
                                >
                                    <div className="flex gap-2 items-center">
                                        <MdDashboard className="text-2xl" />
                                        <h3>Main Dashboard</h3>
                                    </div>
                                </a>
                                <NavLink to="/adminDashboard/adminAddCategory" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <TbCategoryPlus className="text-2xl" />

                                        <h3>Add Category</h3>
                                    </div></NavLink>
                                {/* <NavLink to="/adminDashboard/customerTotalOrders" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <GoListUnordered className="text-2xl" />

                                        <h3>Customer total orders</h3>
                                    </div></NavLink> */}
                                <NavLink to="/adminDashboard/totalVendors" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <MdDoNotDisturbOnTotalSilence className="text-2xl" />

                                        <h3>Total vendors</h3>
                                    </div></NavLink>
                                <NavLink to="/adminDashboard/totalCustomers" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <FaUserFriends className="text-2xl" />

                                        <h3>Total customers</h3>
                                    </div></NavLink>



                            </ul>

                        </div>
                    </div>
                    <div className="md:w-[75%] px-5">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
            <Footer></Footer>
            <Toaster position="top-center"
                reverseOrder={false} />
        </div>
    );
};

export default AdminDashboard;