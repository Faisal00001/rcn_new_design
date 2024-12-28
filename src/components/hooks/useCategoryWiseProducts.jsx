import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCategoryWiseProducts = (id) => {
    const axiosPublic = useAxiosPublic()
    const { data: categoryWiseProducts = [], isPending: categoryWiseloading, refetch } = useQuery({
        queryKey: ['categoryWiseProducts', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/?category=${id}`);
            return res.data;
        }
    })


    return [categoryWiseProducts, categoryWiseloading, refetch]
};

export default useCategoryWiseProducts;