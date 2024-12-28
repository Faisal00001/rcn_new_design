import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


const ProductQuestion = () => {
    const [searchParams] = useSearchParams();
    const productId = parseInt(searchParams.get('pid'))
    console.log('pid', typeof (productId))

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Start loading
                setIsLoading(true);

                // Make a GET request to the API endpoint
                const response = await axios.get(`http://127.0.0.1:8000/api/product/${productId}/?format=json`);

                // Extract the data from the response
                const fetchedData = response.data;

                // Update state with fetched data
                setProduct(fetchedData);
            } catch (error) {
                // Handle errors
                setError(error.message);
            } finally {
                // Finish loading
                setIsLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [productId]);
    if (isLoading) {
        return "Loading"
    }
    console.log(product)
    return (
        <div className="my-24">



            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="product" className="block mb-2 text-sm font-medium text-gray-900">Product</label>
                    <input type="text" value={product.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" readOnly />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Question</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Question..." defaultValue={""} />
                </div>


                <div className="flex flex-col gap-5">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <Link to={`/productDetails/${productId}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</Link>
                </div>
            </form>


        </div>
    );
};

export default ProductQuestion;