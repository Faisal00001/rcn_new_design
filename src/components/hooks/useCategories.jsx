import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCategories = () => {
    const axiosPublic = useAxiosPublic()
    const { data: categories = [], isPending: loading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories/?format=json');
            return res.data;
        }
    })


    return [categories, loading, refetch]
};

export default useCategories;