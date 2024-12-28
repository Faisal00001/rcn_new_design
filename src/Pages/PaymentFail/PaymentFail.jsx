import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import { Link, useLocation } from "react-router-dom";


const PaymentFail = () => {
    const location = useLocation();
    const [transaction_id, setTransaction_id] = useState('')
    const [status, setStatus] = useState('')

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
    if (status === 'FAILED') {
        Swal.fire({
            icon: "error",
            title: "Payment Failed",
        });
    }
    return (
        <div>
            <h3>Payment Failed</h3>
            <Link to={'/'} className="flex justify-center mt-10">
                <button className="bg-blue-800 rounded text-white py-3 px-5">Go Back</button>
            </Link>
        </div>
    );
};

export default PaymentFail;