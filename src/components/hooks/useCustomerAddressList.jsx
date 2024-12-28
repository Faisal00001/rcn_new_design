import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCustomerAddressList = () => {
    const axiosPublic = useAxiosPublic()
    const user = JSON.parse(localStorage.getItem('user'))
    const customerId = user.id
    const { data: customerAddressList = [], isPending: loading, refetch } = useQuery({
        queryKey: ['customerAddressList'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/customer/${customerId}/address-list/?format=json`);
            return res.data;
        }
    })
    return [customerAddressList, loading, refetch]
};

export default useCustomerAddressList;