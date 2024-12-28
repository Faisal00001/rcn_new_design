import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useSellerOrders = () => {
    const axiosPublic = useAxiosPublic()
    const vendor = JSON.parse(localStorage.getItem('user'))
    const vendorId = vendor.id
    const { data: sellerOrders = [], isPending: loading, refetch } = useQuery({
        queryKey: ['sellerOrders'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/vendor/${vendorId}/order-items/?format=json`);

            return res.data;
        }
    })


    return [sellerOrders, loading, refetch]
};

export default useSellerOrders;