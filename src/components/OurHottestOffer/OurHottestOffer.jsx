import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../ProductCard/ProductCard";
import NoData from "../../assets/Data_not_found/Data_not_found.png"


const OurHottestOffer = () => {
    const [products, loading] = useProducts()
    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>
    }
    const hotOffersProduct = products?.data?.filter(product => product.hot_deal === true) || []


    return (
        <div>

            <h3 className="text-2xl font-bold text-center mb-10">Our hottest offers and more</h3>
            {
                hotOffersProduct?.length ? (
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 gap-5">
                            {
                                hotOffersProduct.slice(0, 6).map((product) => (
                                    <ProductCard key={product.id} product={product}></ProductCard>
                                ))
                            }
                        </div>
                        <div className="my-10 flex justify-center">
                            <Link to={`/hotDeal`} className="btn bg-blue-700 hover:bg-blue-700 text-white">Show More</Link>
                        </div>
                    </div>

                ) : (
                    <div className="flex flex-col justify-center items-center mt-10 space-y-4">
                        <img
                            className="w-1/3 h-1/3 opacity-75 transition duration-300 hover:scale-105"
                            src={NoData}
                            alt="No data available"
                        />
                        <p className="text-gray-500 text-lg font-semibold">No products available at the moment</p>

                    </div>
                )
            }


        </div>
    );
};

export default OurHottestOffer;