import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";


const useTotalVendors = () => {
    const axiosSecure = useAxiosSecure()
    const { data: totalVendors = [], isPending: loading, refetch } = useQuery({
        queryKey: ['totalVendors'],
        queryFn: async () => {
            const res = await axiosSecure.get('/vendors/?format=json');
            return res.data;
        }
    })


    return [totalVendors, loading, refetch]
};

export default useTotalVendors;