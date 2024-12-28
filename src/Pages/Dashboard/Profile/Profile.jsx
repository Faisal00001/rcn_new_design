import { useNavigate } from "react-router-dom";
import useCustomerProfile from "../../../components/hooks/useCustomerProfile";


const Profile = () => {
    const [customerProfile] = useCustomerProfile()
    const navigate = useNavigate()
    const { user, phone, profile_image, orders } = customerProfile
    // const { user, phone, profile_image, orders } = customerProfile;
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-end  pt-10 pr-10">
                <button onClick={() => {
                    navigate('/dashboard/personalDetails')
                }} className="btn bg-blue-700 hover:bg-blue-700 text-white">Update Profile Information</button>
            </div>
            <div className="flex pt-16 justify-center">

                <div className="bg-white rounded-lg shadow-md p-10 max-w-md w-full">
                    {/* Profile Picture */}
                    <div className="flex justify-center">
                        <img
                            className="w-32 h-32 rounded-full border-4 border-indigo-500"
                            src={profile_image || "https://via.placeholder.com/150"}
                            alt="Profile"
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="text-center mt-4">
                        <h1 className="text-2xl font-semibold text-gray-800">{user?.first_name} {user?.last_name}</h1>
                        <p className="text-gray-600">@{user?.username}</p>
                        <p className="text-gray-600 mt-2">{user?.email}</p>
                        <p className="text-gray-600 mt-2">Phone: {phone}</p>
                    </div>

                    {/* Orders Section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Orders</h2>
                        {orders?.length > 0 ? (
                            <ul className="space-y-2">
                                {orders.map((order, index) => (
                                    <div key={index}>
                                        {
                                            order.order_status === 'Pending' && <>
                                                <li key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                                                    <p className="text-gray-700">Order #{order.id}</p>

                                                    <p className="text-sm text-gray-500">Details: {JSON.stringify(order.order_status)}</p>
                                                </li>


                                            </>
                                        }
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No orders available.</p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;