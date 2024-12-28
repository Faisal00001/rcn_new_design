import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";

const SearchResults = () => {
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchSearchResults = async () => {
            try {
                const response = await axiosPublic.get(`/search/?q=${query}`);
                const data = await response.data;
                setResults(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query, axiosPublic]);

    if (loading) {
        return "Loading";
    }

    const showProductDetails = (product_id) => {
        if (query) {
            navigate(`/productDetails/${product_id}`);
        }
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    return (
        <div className="container mx-auto">
            <div className="mt-10 mb-10">
                <h3 className="text-3xl font-bold text-center">Search Results for {query}</h3>
            </div>

            <div>
                {
                    results.length === 0 ? (
                        <div className="text-center text-xl text-gray-500">No data found</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                results.map((product, index) => (
                                    <div key={index} className="card bg-base-100 border border-slate-300 shadow-md flex flex-col justify-between">
                                        {/* Product Image */}
                                        <figure className="w-full h-64 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt="Product"
                                                className="w-full h-full object-contain"
                                            />
                                        </figure>

                                        {/* Card Body */}
                                        <div className="card-body flex flex-col justify-between">
                                            <div>
                                                <h2 className="card-title text-xl font-semibold">{product.title}</h2>
                                                <p className="text-gray-600">
                                                    {truncateText(product.detail, 10)}
                                                </p>
                                            </div>

                                            <div onClick={() => showProductDetails(product.id)} className="card-actions justify-end mt-4">
                                                <button className="btn bg-black hover:bg-black text-white">View Product</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default SearchResults;
