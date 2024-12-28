import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdShoppingCartCheckout } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const RegistrationSeller = () => {
    const [showPassword, setShowPassword] = useState(false)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleSellerRegistration = (event) => {
        event.preventDefault()
        const form = event.target
        const sellerFirstName = form.firstName.value
        const sellerLastName = form.lastName.value
        const seller_name = form.userName.value
        const shop_name = form.shopName.value
        const sellerPhoneNumber = form.phoneNumber.value
        const sellerEmail = form.email.value
        const sellerAddress = form.address.value
        const sellerPassword = form.password.value
        const formData = new FormData();
        formData.append('first_name', sellerFirstName);
        formData.append('last_name', sellerLastName);
        formData.append('username', seller_name);
        formData.append('email', sellerEmail);
        formData.append('phone', sellerPhoneNumber);
        formData.append('address', sellerAddress);
        formData.append('password', sellerPassword);
        formData.append('shop_name', shop_name)

        axiosPublic.post('/vendor-register/', formData)
            .then(res => {
                console.log(res.data.bool)
                if (res.data.bool === true) {
                    Swal.fire({
                        title: "Registration Successful!",
                        text: "Please login to continue!",
                        icon: "success"
                    });
                    // const user_information = {
                    //     firstName: userFirstName,
                    //     lastName: userLastName,
                    //     user_name: user_name,
                    //     email: userEmail

                    // };
                    // setUser(user_information)
                    form.reset()
                    navigate('/sellerLogin')
                }
                else {
                    const { msg } = res.data
                    toast.error(msg)
                }
            })
            .catch(error => {
                toast.error("Failed to register !")
                console.log(error)
            })
    }
    return (
        <div>
            <nav className="bg-[#0046be] pl-5 py-2">
                <h3 className="font-semibold lg:font-bold text-white lg:text-2xl text-xl">
                    <Link to={'/'}>Kopotakkho Electronics</Link>
                </h3>
            </nav>

            <div className="w-[15%]">
                <Link to={'/'} className="flex gap-1 items-center pl-4 mt-3 text-blue-800 ">
                    <MdKeyboardArrowLeft />
                    <h3 className="text-sm font-bold hover:underline">Back to previous page</h3>
                </Link>
            </div>
            <div className="bg-[#FAFAFA] mt-5">
                <div className="container mx-auto">
                    <div className="flex justify-around">
                        <div>
                            <h3 className="text-2xl md:text-4xl font-bold text-blue-700 pt-20">Create an account as Seller</h3>


                            <form onSubmit={handleSellerRegistration} className="max-w-sm mt-5 pb-20">
                                <div className="mb-5">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input name="firstName" type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input name="lastName" type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                                    <input name="userName" type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="shopName" className="block mb-2 text-sm font-medium text-gray-900">Shop name</label>
                                    <input name="shopName" type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                    <input name="phoneNumber" type="number" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Enter your Address</label>
                                    <input name="address" type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input name="email" type="email" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />

                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input name="password" type={`${showPassword ? 'text' : 'password'}`} id="password" className="bg-gray-50 border-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-4 text-sm rounded focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />
                                    <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer select-none">
                                        {
                                            !showPassword ? <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Show</h3> : <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Hide</h3>
                                        }

                                    </div>
                                </div>
                                <div className="flex my-5">
                                    <input type="checkbox" value="" className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:outline-none" />
                                    <label htmlFor="checked-checkbox" className="ms-2 text-sm text-gray-900">Sign up for our newsletter to stay in the loop about hot deals, new products, and more. Don’t worry, you can unsubscribe at any time.</label>
                                </div>
                                <div>
                                    <button type="submit" className="text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none  font-medium rounded text-sm w-full sm:w-auto px-14 py-4 text-center">Create Account</button>

                                </div>
                                <div>
                                    <p className="mt-5 text-sm font-light">By continuing you agree to our Terms and Conditions and Privacy Policy, and confirm you have reached the age of majority (18 or 19) in your province or territory of residence.</p>
                                </div>
                                <div className="my-10">
                                    <hr />
                                </div>
                                <div>
                                    <div className="flex gap-2">
                                        <div>
                                            <RiAccountCircleLine className="text-3xl" />
                                        </div>
                                        <div>
                                            <p className="text-sm">Already have an account?</p>
                                            <div className="flex gap-1 items-center text-blue-800">
                                                <Link className="flex  items-center" to={'/login'}>
                                                    <h3 className="text-sm font-bold cursor-pointer hover:underline">Sign In</h3>
                                                    <MdKeyboardArrowRight />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="pt-36 pb-20">
                            <h3 className="text-2xl font-bold mb-2">Don’t have an account?</h3>
                            <p className="text-sm text-slate-700">Here are some of the benefits you’ll enjoy:</p>
                            <div className="mt-5">
                                <div className="flex gap-1">
                                    <div>
                                        <MdShoppingCartCheckout className="text-3xl text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Fast checkout.</h3>
                                        <p className="text-sm">Your payment info is saved and ready.</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-5">
                                    <div>
                                        <IoLocationOutline className="text-3xl text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Easy tracking.</h3>
                                        <p className="text-sm">Keep an eye on your order.</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-5">
                                    <div>
                                        <IoMdTime className="text-3xl text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">Quick recap.</h3>
                                        <p className="text-sm">Your order history is a click away.</p>
                                    </div>
                                </div>
                                <div className="mt-5 pl-8 w-[67%]">
                                    <Link to={'/registration'} className="flex  items-center gap-1">
                                        <div>
                                            <p className="text-blue-800 hover:underline font-bold text-sm">Create your account</p>
                                        </div>
                                        <div>
                                            <FaAngleRight />
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container mx-auto my-10">
                <div className="flex gap-2 items-center">
                    <div>
                        <CiLock className="text-3xl " />
                    </div>
                    <div>
                        <h3 className="font-bold">
                            Security & Privacy
                        </h3>
                        <p className="text-xs">
                            Security & Privacy
                            Every transaction on Kopotakkho Electronics.ca is secure. Any personal information you give us will be handled according to our Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationSeller;