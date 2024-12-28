import { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaRegWindowRestore, FaShoppingCart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import logo from "../../assets/Logo/Logo2.png"
import useCategories from "../../components/hooks/useCategories";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { CiHeart, CiViewList } from "react-icons/ci";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [categories] = useCategories()
    const [activeIndex, setActiveIndex] = useState(null); // Track which dropdown is open

    const handleMouseEnter = (index) => setActiveIndex(index);
    const handleMouseLeave = () => setActiveIndex(null);
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const storedUser = localStorage.getItem('user');
    const [firstName, setFirstName] = useState('')
    const { cartItems, logout, customerLogoutHandler } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    useEffect(() => {
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUser(JSON.parse(storedUser))
            setFirstName(user.user_name)
        }
    }, [storedUser])
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleSearch = async () => {
        if (query.length > 2) {
            navigate(`/searchResults?q=${query}`);
            setQuery('')
        }
    };
    const handleInputChange = async (e) => {
        const searchQuery = e.target.value;
        console.log(searchQuery)
        setQuery(searchQuery);

        if (searchQuery.length > 2) {
            const response = await fetch(baseUrl + `/search/?q=${searchQuery}`);
            const data = await response.json();
            setResults(data);
        } else {
            setResults([]);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleLogout = () => {
        customerLogoutHandler()
    }
    const handleLinkClickSearch = (product_id) => {
        if (query.length > 2) {
            navigate(`/productDetails/${product_id}`)
            setQuery('')
        }
    }
    return (
        <div>
            {isScrolled ? <>
                <div className="bg-red-500 text-white fixed w-full top-0 z-50">
                    <div className="container mx-auto px-20 py-2">
                        <h3 className="text-center">Visible</h3>
                    </div>
                </div>
            </> : <>  <div className="bg-[#1F4C94]">
                <div className="container mx-auto px-20">
                    <div className="flex flex-col md:flex-row justify-between items-center py-2">
                        <div className="text-center">
                            <h3 className="text-white text-sm">Welcome to Kopotakkho Electronics</h3>
                        </div>
                        <div className="flex text-white items-center gap-2 mt-2 md:mt-0">
                            <FaFacebook></FaFacebook>
                            <FaLinkedin></FaLinkedin>
                        </div>
                    </div>
                </div>
            </div>
                <div className="bg-[#2457AA]">
                    <div className="navbar container mx-auto lg:px-20">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 px-5 shadow py-10 space-y-5">
                                    <NavLink to="/" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-blue-500" : "text-black"
                                    }>





                                        Home
                                    </NavLink>
                                    <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-blue-500" : "text-black"
                                    }>





                                        Blog
                                    </NavLink>
                                    <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-blue-500" : "text-black"
                                    }>





                                        Shop
                                    </NavLink>
                                    <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-blue-500" : "text-black"
                                    }>





                                        Contact Us
                                    </NavLink>
                                </ul>
                            </div>
                            <div>
                                <img className="w-[100px]" src={logo} alt="Logo" />
                            </div>
                        </div>
                        <div className="navbar-center hidden lg:block">
                            <div className="relative">
                                <input
                                    value={query}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    className="focus:outline-none w-auto lg:w-[800px] py-3 pl-3 hidden lg:block rounded-sm text-sm border border-gray-300"
                                    type="text"
                                    placeholder="Search ..."
                                />
                                <button type="submit" className="text-white absolute end-2.5 top-1.5 bg-black font-medium rounded-lg text-sm px-5 py-1.5">
                                    <IoMdSearch className="text-2xl text-white"></IoMdSearch>
                                </button>

                                <div className="hidden lg:block">
                                    {/* Search results */}
                                    {results.length > 0 && query !== '' && (
                                        <div className="absolute top-full mt-1 w-[800px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                            <ul>
                                                {results.map((result) => (
                                                    <li key={result.id} className="p-2 hover:bg-gray-100">
                                                        <div onClick={() => handleLinkClickSearch(result.id)} className="flex items-center gap-2 cursor-pointer">
                                                            {result.image && (
                                                                <img
                                                                    src={result.image}
                                                                    alt={result.title}
                                                                    className="w-10 h-10 object-cover"
                                                                />
                                                            )}
                                                            <div>
                                                                <p className="font-medium">{result.title}</p>
                                                                {/* <p className="text-sm text-gray-500">{result.category} - {result.vendor}</p> */}
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="flex gap-5">
                                <div className="bg-[#1F4C94] px-3 py-2.5 rounded cursor-pointer">
                                    <VscAccount className="text-xl text-white" />
                                </div>
                                <div className="bg-[#1F4C94] px-3 py-2.5 rounded cursor-pointer">
                                    <CiHeart className="text-xl text-white"></CiHeart>
                                </div>
                                <div className="bg-[#1F4C94] px-3 py-2.5 rounded cursor-pointer">
                                    <CiViewList className="text-xl text-white" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#2457AA] block lg:hidden px-5 py-2">

                    <form className="max-w-md mx-auto">

                        <div className="relative">

                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search ..." />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-black  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                        </div>
                    </form>

                </div>
                <div className="hidden md:block">
                    <div className="bg-[#1F4C94] py-3">
                        <div className="container mx-auto lg:px-20">
                            <ul className="flex gap-5 text-white justify-end text-sm">
                                <NavLink to="/" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " text-[#DBD20E]" : " text-white hover:text-[#DBD20E]"
                                }>





                                    Home
                                </NavLink>
                                <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " text-[#DBD20E]" : " text-white hover:text-[#DBD20E]"
                                }>





                                    Blog
                                </NavLink>
                                <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " text-[#DBD20E]" : " text-white hover:text-[#DBD20E]"
                                }>





                                    Shop
                                </NavLink>
                                <NavLink to="/blogs" className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? " text-[#DBD20E]" : " text-white hover:text-[#DBD20E]"
                                }>





                                    Contact Us
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </div></>}



        </div>
    );
};

export default Navbar;