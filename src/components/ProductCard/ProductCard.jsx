import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {
    const { id, title, image, price } = product
    return (
        <div>
            <div className="rounded-lg overflow-hidden bg-white transition-transform hover:scale-105">
                {/* Product Image */}
                <img
                    className="w-full h-[220px] object-contain"
                    src={image}
                    alt={title}
                />

                {/* Product Details */}
                <div className="p-4">
                    {/* Product Title */}
                    <div className="h-[50px] overflow-hidden">
                        <Link to={`/productDetails/${id}`}>
                            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer transition-colors line-clamp-2">
                                {title}
                            </h2>
                        </Link>
                    </div>

                    {/* Rating */}
                    <div className="rating flex items-center gap-1 mt-3">
                        <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-yellow-400 w-5" />
                        <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-yellow-400 w-5" />
                        <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-yellow-400 w-5" />
                        <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-yellow-400 w-5" />
                        <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-yellow-400 w-5" />
                    </div>

                    {/* Price */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-xl text-gray-900">
                            {price} BDT
                        </h3>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-2 mt-5 text-gray-600">
                        <FaCheck className="text-green-500" />
                        <p className="text-sm">Available to ship</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;