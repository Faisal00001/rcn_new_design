import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";


const AddCustomerReview = () => {
    const axiosSecure = useAxiosSecure()
    const { pid } = useParams();
    const customer = JSON.parse(localStorage.getItem('user'))

    const customer_id = customer.id
    const [ReviewFormData, setReviewFormData] = useState({
        reviews: '',
        rating: 1,
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReviewFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const disableBtn = ReviewFormData.reviews === '' || ReviewFormData.rating === '';
    const submitHandler = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('reviews', ReviewFormData.reviews);
        formData.append('rating', ReviewFormData.rating);
        formData.append('customer', customer_id);
        formData.append('product', pid);
        axiosSecure.post('/product-rating/', formData)
            .then(res => {
                if (res.status !== 201) {
                    toast.error('Failed to submit review')
                }
                else {
                    toast.success('Review added successfully')
                    setReviewFormData({
                        reviews: '',
                        rating: 1,
                    });
                }
            })


    }

    return (
        <div>
            <h3 className="text-2xl font-bold md:text-4xl text-center my-10">Product review</h3>


            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Review</label>
                        <textarea name='reviews'
                            onChange={handleInputChange}
                            value={ReviewFormData.reviews} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." defaultValue={""} required />
                    </div>


                </div>

                <div className="flex items-start mb-5 gap-5">
                    <div className="max-w-sm ">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <select name='rating'
                            id='rating'
                            onChange={handleInputChange}
                            value={ReviewFormData.rating} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option disabled selected>Select a rating</option>
                            <option value={1}>⭐ 1 Star</option>
                            <option value={2}>⭐⭐ 2 Stars</option>
                            <option value={3}>⭐⭐⭐ 3 Stars</option>
                            <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                            <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                        </select>
                    </div>


                </div>
                <button disabled={disableBtn} onClick={submitHandler} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add a review</button>
            </form>

            <button className="btn btn-primary">Go Back</button>


        </div>
    );
};

export default AddCustomerReview;