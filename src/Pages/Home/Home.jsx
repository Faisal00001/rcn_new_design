import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Banner from "../../components/Banner/Banner";
import OurHottestOffer from "../../components/OurHottestOffer/OurHottestOffer";
import ProductImageGallery from "../../components/ProductImageGallery/ProductImageGallery";
import ShopByCategory from "../../components/ShopByCategory/ShopByCategory";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";

const Home = () => {
    // const { isLogin } = useContext(AuthContext)
    // if (isLogin) {
    //     console.log(isLogin)
    // }
    return (
        <div>
            <Banner></Banner>
            {/* <OurHottestOffer></OurHottestOffer> */}
            <ShopByCategory></ShopByCategory>
            <WhyChooseUs></WhyChooseUs>

        </div>
    );
};

export default Home;