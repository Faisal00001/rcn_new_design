import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import { GoChecklist } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { Toaster } from "react-hot-toast";
import { CgPassword } from "react-icons/cg";
import { FaMapLocationDot } from "react-icons/fa6";

const Dashboard = () => {
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
                    <Link to={'/'} className="flex gap-1 items-center">
                        <h3 className="text-sm cursor-pointer text-blue-500 hover:underline">Home</h3>
                        <MdOutlineKeyboardArrowRight className="text-2xl" />
                    </Link>
                    {/* <div className="flex gap-1 items-center">
                        <h3 className="text-sm text-blue-500 hover:underline cursor-pointer">Account</h3>
                        <MdOutlineKeyboardArrowRight className="text-2xl" />
                    </div> */}
                    <div className="flex gap-1 items-center">
                        <h3 className="text-sm">{pathName}</h3>

                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="drawer md:w-[25%] lg:drawer-open">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col my-10 px-5">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-2" className="btn bg-blue-700 hover:bg-blue-700 text-white drawer-button lg:hidden">Click to open menus</label>

                        </div>
                        <div className="drawer-side z-50 lg:z-0">
                            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu  w-80 min-h-full bg-base-200 text-base-content">
                                {/* Sidebar content here */}
                                <NavLink to="/dashboard/profile" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <ImProfile className="text-2xl"></ImProfile>
                                        <h3>Profile</h3>
                                    </div></NavLink>
                                <NavLink to="/dashboard/orderHistory" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 font-semibold py-3 px-2 rounded-sm text-white" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <IoIosTimer className="text-2xl"></IoIosTimer>
                                        <h3>Order History</h3>
                                    </div></NavLink>

                                <NavLink to="/dashboard/personalDetails" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <FaRegUserCircle className="text-2xl"></FaRegUserCircle>
                                        <h3>Personal Details</h3>
                                    </div></NavLink>
                                <NavLink to="/dashboard/myWishlist" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <GoChecklist className="text-2xl"></GoChecklist>
                                        <h3>My Wishlist</h3>
                                    </div></NavLink>
                                <NavLink to="/dashboard/userChangePassword" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <CgPassword className="text-2xl"></CgPassword>
                                        <h3>Change Password</h3>
                                    </div></NavLink>
                                <NavLink to="/dashboard/customerAddress" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-blue-900 text-white py-3 px-2 rounded-sm font-semibold" : "py-3 px-2 text-blue-800"
                                }>

                                    <div className="flex gap-2 items-center">
                                        <FaMapLocationDot className="text-2xl"></FaMapLocationDot>
                                        <h3>Adress</h3>
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

export default Dashboard;