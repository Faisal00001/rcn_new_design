import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const useOrderId = () => {
    const axiosPublic = useAxiosPublic()
    const storedUser = localStorage.getItem('user');
    const [customerId, setCustomerId] = useState(null)
    useEffect(() => {
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCustomerId(parseInt(user.id))
        }
    }, [storedUser])
    const formData = new FormData();
    formData.append('customer', customerId);
    const { data: order_id = [], isPending: loading } = useQuery({
        queryKey: ['order_id'],
        queryFn: async () => {
            const res = await axiosPublic.post('/orders/', formData);
            return res.data.id;
        }
    })


    return [order_id, loading]
};

export default useOrderId;