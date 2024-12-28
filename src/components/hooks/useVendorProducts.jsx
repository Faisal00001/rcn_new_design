import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useVendorProducts = () => {
    const axiosSecure = useAxiosSecure()
    const vendor = JSON.parse(localStorage.getItem('user'))
    const vendor_id = vendor.id
    const { data: vendorProducts = [], isPending: loading, refetch } = useQuery({
        queryKey: ['sellerOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor/${vendor_id}/products/?format=json`);

            return res.data;
        }
    })


    return [vendorProducts, loading, refetch]
};

export default useVendorProducts;