import { useContext } from "react";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useGetWishLists from "../../../components/hooks/useGetWishLists";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { AuthContext } from "../../../Provider/AuthProvider";


const SellerWishList = () => {
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
        <div>
            {
                wishLists.data.map((wishList, index) => <div key={index} className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src={wishList.product.image}
                            alt="Wishlist product" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title hover:underline cursor-pointer">{wishList.product.title}</h2>

                        <div className="card-actions my-5 justify-end">
                            <button onClick={() => handleRemoveItemFromWishList(wishList)} className="btn">
                                <div className="flex items-center gap-3">
                                    <MdDeleteOutline className="text-2xl" />
                                    <span>Remove</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default SellerWishList;