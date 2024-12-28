import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTotalCustomers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: totalCustomers = [], isPending: loading, refetch } = useQuery({
        queryKey: ['totalCustomers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/customers/?format=json');
            return res.data;
        }
    })


    return [totalCustomers, loading, refetch]
};

export default useTotalCustomers;