import { useContext, useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdShoppingCartCheckout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;
    // Handle form change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        // Make sure the URL matches the Django URL pattern
        try {
            const response = await axiosPublic.post('/superuser-login/', {
                username,
                password
            });
            const user = {

                isAdmin: true,
                access_token: response.data.access,
                refresh_token: response.data.refresh
            }

            localStorage.setItem('user', JSON.stringify(user))
            toast.success('Login Successfully')
            navigate('/');
        }
        catch (error) {
            toast.error('Invalid user name or password')
        }
        // Redirect to admin dashboard after successful login

    }
    console.log('Username ', username)
    console.log('Password ', password)
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
            <div className="bg-[#FAFAFA] mt-5 ">
                <div className="container mx-auto">
                    <div className="flex justify-around flex-col md:flex-row px-5">
                        <div>
                            <h3 className="text-2xl md:text-4xl font-bold text-blue-700 pt-20">Sign In</h3>


                            <form onSubmit={handleSubmit} className="max-w-sm mt-5">
                                <div className="mb-5">
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">User Name</label>
                                    <input name="username" onChange={handleChange} type="text" className="bg-gray-50 border-2 text-gray-900 text-sm rounded focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" placeholder="Enter your user name" required />

                                </div>
                                <div className="mb-5 relative">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input name="password"
                                        onChange={handleChange} type={`${showPassword ? 'text' : 'password'}`} id="password" className="bg-gray-50 border-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-4 text-sm rounded focus:ring-blue-100 focus:border-blue-800 block w-full p-2.5" required />
                                    <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer select-none">
                                        {
                                            !showPassword ? <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Show</h3> : <h3 className="text-blue-800 font-bold text-xs absolute right-2 top-[60%]">Hide</h3>
                                        }

                                    </div>
                                </div>

                                <div className="flex gap-5 items-center flex-col md:flex-row">
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded text-sm w-full sm:w-auto px-14 py-4 text-center">Sign In</button>
                                    <Link to={'/forgetPassword'} className="text-sm font-bold text-blue-800 hover:underline">Forget Password?</Link>
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
                                <div className="mt-5 pl-8">
                                    <Link to={'/registration'} className="flex  items-center gap-1">
                                        <div>
                                            <p className="text-blue-800 hover:underline font-bold text-sm">Create your account as customer</p>
                                        </div>
                                        <div>
                                            <FaAngleRight />
                                        </div>
                                    </Link>
                                    <Link to={'/registrationSeller'} className="flex mt-5 items-center gap-1">
                                        <div>
                                            <p className="text-blue-800 hover:underline font-bold text-sm">Create your account as seller</p>
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

export default AdminLogin;