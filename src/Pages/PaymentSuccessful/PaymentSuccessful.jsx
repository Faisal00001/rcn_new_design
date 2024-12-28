import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import Swal from "sweetalert2";


const PaymentSuccessful = () => {

    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const [transaction_id, setTransaction_id] = useState('')
    const [status, setStatus] = useState('')
    const order_id = localStorage.getItem('order_id')
    // Function to get query parameters from the URL


    useEffect(() => {
        const getQueryParams = () => {
            return new URLSearchParams(location.search);
        };
        const queryParams = getQueryParams();
        const transactionId = queryParams.get('transaction_id');
        const status = queryParams.get('status');

        // Handle the transaction status
        if (transactionId && status) {
            setTransaction_id(transactionId)
            setStatus(status)

            // You can add your custom logic here to update the UI or make further API calls
        } else {
            console.error('Invalid query parameters');
        }
    }, [location]);
    if (status === 'SUCCESS') {
        axiosPublic.post(`/update-order-status/${order_id}/`, { order_status: false })
            .then(res => {
                if (res.data) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Done",
                        text: "Thank You",
                    });
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div>
            <h3 className="text-2xl font-bold text-center">Congratulation</h3>
            {/* <h3 className="text-center">transaction id: {transaction_id} and message: {status}</h3> */}
            <Link to={'/'} className="flex justify-center mt-10">
                <button className="bg-blue-800 rounded text-white py-3 px-5">Go Back</button>
            </Link>
        </div>
    );
};

export default PaymentSuccessful;