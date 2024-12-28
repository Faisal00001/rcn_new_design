import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useVendorProducts = () => {
    const axiosSecure = useAxiosSecure()
    const vendor = JSON.parse(localStorage.getItem('user'))
    const vendor_id = vendor.id
    const { data: vendorDetails = [], isPending: loading, refetch } = useQuery({
        queryKey: ['vendorDetails'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendors/${vendor_id}/?format=json`);

            return res.data;
        }
    })


    return [vendorDetails, loading, refetch]
};

export default useVendorProducts;