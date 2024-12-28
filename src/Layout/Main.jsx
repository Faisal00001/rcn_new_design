import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";


const Main = () => {
    const location = useLocation()
    return (
        <div>
            {
                location.pathname === '/login' || location.pathname === '/sellerLogin' || location.pathname === '/registration' || location.pathname === '/registrationSeller' || location.pathname === '/invoice' ? '' : <Navbar></Navbar>
            }

            <div className={`${location.pathname === '/invoice' && 'bg-[#f1f1f1] min-h-screen'}`}>
                <Outlet></Outlet>
            </div>
            {
                location.pathname === '/invoice' ? '' : <Footer></Footer>
            }

            <Toaster position="top-center"
                reverseOrder={false} />
        </div>
    );
};

export default Main;