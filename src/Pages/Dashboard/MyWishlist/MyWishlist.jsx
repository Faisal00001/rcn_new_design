import { MdDeleteOutline } from "react-icons/md";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useGetWishLists from "../../../components/hooks/useGetWishLists";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const MyWishlist = () => {
    const axiosPublic = useAxiosPublic()
    const { cartItems, setCartItems } = useContext(AuthContext)
    const [wishLists, loading, refetch] = useGetWishLists()
    if (loading) {
        return "Loading"
    }

    const handleRemoveItemFromWishList = (wishList) => {
        const wishListId = wishList.id
        const formData = new FormData();
        formData.append('wishlist_id', wishListId);
        axiosPublic.post('remove-from-wishlist/', formData)
            .then(res => {
                if (res.data.bool == true) {

                    refetch()
                    setCartItems(cartItems.map(item => item.id === wishList.product.id ? { ...item, wishListStatus: false } : item));
                    console.log('Hello')
                    toast.success('Item removed from the wishlist')
                }
            })
            .catch(error => {
                console.log('Failed to deleted ', error)
            })
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ml-10">
            {
                wishLists.data.map((wishList, index) =>
                    <div key={index} className="card bg-base-100 w-96 border-[1px] border-gray-200 p-5">
                        <figure>
                            <img
                                src={wishList.product.image}
                                alt="Wishlist product" />
                        </figure>
                        <div className="card-body">
                            <Link to={`/productDetails/${wishList.product.id}`}>
                                <h2 className="card-title hover:underline cursor-pointer">{wishList.product.title}</h2>
                            </Link>


                            <div className="card-actions my-5 justify-end">
                                <button onClick={() => handleRemoveItemFromWishList(wishList)} className="btn bg-red-500 hover:bg-red-500 text-white">
                                    <div className="flex items-center gap-3">
                                        <MdDeleteOutline className="text-2xl" />
                                        <span>Remove</span>
                                    </div>
                                </button>
                                <Link to={`/productDetails/${wishList.product.id}`} className="btn bg-blue-500 hover:bg-blue-500 text-white">View Details</Link>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default MyWishlist;