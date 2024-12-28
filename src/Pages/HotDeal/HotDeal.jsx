import { Link } from "react-router-dom";
import useProducts from "../../components/hooks/useProducts";


const HotDeal = () => {
    const [products, loading] = useProducts()
    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    const hotOffersProduct = products?.data?.filter(product => product.hot_deal === true)
    return (
        <div className="container mx-auto">
            <h3 className="text-2xl md:text-4xl font-bold text-center my-10">Our Hot Deal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    Array.isArray(hotOffersProduct) && hotOffersProduct.length > 0 ? (
                        hotOffersProduct.map((product, index) => (
                            <div key={index} className="card card-compact md:w-96 bg-base-100 border-[1px] border-gray-200 shadow-lg transition-transform duration-300 hover:scale-105">
                                <figure className="overflow-hidden rounded-lg">
                                    <img
                                        src={product?.image || 'path/to/fallback-image.jpg'}
                                        alt={product?.title || "Product Image"}
                                        className="h-[167px] w-full object-contain transition-transform duration-500 hover:scale-110"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="text-base font-bold">{product?.title || "Product Title"}</h2>
                                    <div className="card-actions justify-end">
                                        <Link
                                            to={`/productDetails/${product?.id}`}
                                            className="btn bg-black text-white hover:bg-black"
                                            onClick={(e) => product?.id ? null : e.preventDefault()}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center mt-10">
                            <p className="text-gray-600 text-lg font-semibold">No products available at the moment</p>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default HotDeal;