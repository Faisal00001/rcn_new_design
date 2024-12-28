import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useCustomerProfile = () => {
    const axiosPublic = useAxiosSecure()
    const user = JSON.parse(localStorage.getItem('user'))
    const customerId = user.id

    const { data: customerProfile = [], isPending: loading, refetch } = useQuery({
        queryKey: ['customerProfile'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/customer/${customerId}/?format=json`);
            return res.data
        }
    })


    return [customerProfile, loading, refetch]
};

export default useCustomerProfile;