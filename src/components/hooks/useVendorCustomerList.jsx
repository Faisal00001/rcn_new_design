import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useVendorCustomerList = () => {
    const axiosPublic = useAxiosPublic()
    const user = JSON.parse(localStorage.getItem('user'))
    const userId = user.id
    const { data: vendorCustomerList = [], isPending: loading, refetch } = useQuery({
        queryKey: ['vendorCustomerList'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/vendor/${userId}/customers/?format=json`);
            return res.data;
        }
    })
    return [vendorCustomerList, loading, refetch]
};

export default useVendorCustomerList;