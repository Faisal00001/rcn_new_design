import { useEffect, useState } from "react";
import { FaChevronRight, FaRegUserCircle } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { Link } from "react-router-dom";


const YourAccount = () => {
    const storedUser = localStorage.getItem('user');
    const [firstName, setFirstName] = useState('')


    useEffect(() => {
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFirstName(user.user_name)

        }
    }, [storedUser])
    return (
        <div>
            <div>
                <div className="container mx-auto mt-5 flex gap-1">
                    <Link to={'/'} className="text-blue-800 text-sm hover:underline flex items-center gap-2">Home <FaChevronRight className="text-slate-600 text-xs" /> </Link>
                    <h3 className="text-sm">Your Account</h3>
                </div>
                <div className="bg-[#FAFAFA] mt-5">
                    <div className="container mx-auto">
                        <div className="pt-16 pl-32">
                            <h3 className="text-blue-800 text-6xl font-bold">Hi, {firstName}</h3>
                            <h3 className="pt-3 pb-10 text-2xl font-medium">Welcome to your account</h3>

                        </div>
                    </div>
                    <hr />
                </div>
                <div className="container mx-auto mt-8 mb-20">
                    <div className="grid grid-cols-3 gap-5">
                        <Link to={'/dashboard/orderHistory'} className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <IoIosTimer className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Order History</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Track your recent purchases and view past orders with ease.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your Orders</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Link>
                        <div className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <FaRegUserCircle className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Personal Details</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Update your name, email, and account password at any time.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your personal details</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <FaRegUserCircle className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Personal Details</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Update your name, email, and account password at any time.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your personal details</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <FaRegUserCircle className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Personal Details</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Update your name, email, and account password at any time.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your personal details</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <FaRegUserCircle className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Personal Details</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Update your name, email, and account password at any time.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your personal details</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="border border-slate-400 rounded transition-transform transform hover:-translate-y-2 hover:border-blue-800 hover:shadow-2xl hover:cursor-pointer">
                            <div className="my-7 ml-7 mr-3 flex flex-col h-[250px]">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <FaRegUserCircle className="text-3xl text-blue-800" />
                                    </div>
                                    <div>
                                        <h3 className="text-blue-800 font-semibold">Personal Details</h3>

                                    </div>
                                </div>
                                <p className="text-slate-500 ml-10 ">Update your name, email, and account password at any time.</p>
                                <div className="flex-grow"></div>
                                <Link className="mt-5 ml-10">
                                    <div className="flex gap-2 items-center text-blue-800 hover:underline">
                                        <div>
                                            <p className="font-bold">Your personal details</p>
                                        </div>
                                        <div>
                                            <FaChevronRight className="text-blue-800 text-xs"></FaChevronRight>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-10">

                </div>
            </div>
        </div>
    );
};

export default YourAccount;