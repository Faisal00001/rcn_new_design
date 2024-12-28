import {
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import Basket from "../Pages/Basket/Basket";
import Blogs from "../Pages/Blogs/Blogs";
import CategoryDetails from "../Pages/CategoryDetails/CategoryDetails";
import Checkout from "../Pages/Checkout/Checkout";
import OrderHistory from "../Pages/Dashboard/OrderHistory/OrderHistory";
import PersonalDetails from "../Pages/Dashboard/PersonalDetails/PersonalDetails";
import YourAccount from "../Pages/Dashboard/YourAccount/YourAccount";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import PaymentSuccessful from "../Pages/PaymentSuccessful/PaymentSuccessful";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Registration from "../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import PaymentFail from "../Pages/PaymentFail/PaymentFail";
import MyWishlist from "../Pages/Dashboard/MyWishlist/MyWishlist";
import Invoice from "../components/Invoice/Invoice";
import Profile from "../Pages/Dashboard/Profile/Profile";
import RegistrationSeller from "../Pages/RegistrationSeller/RegistrationSeller";
import SellerLogin from "../Pages/SellerLogin/SellerLogin";
import SellerDashboard from "../Layout/SellerDashboard";
import AddProduct from "../Pages/SellerDashboard/AddProduct/AddProduct";
import ChangePassword from "../Pages/SellerDashboard/ChangePassword/ChangePassword";
import SellerWishList from "../Pages/SellerDashboard/SellerWishList/SellerWishList";
import SellerOrders from "../Pages/SellerDashboard/SellerOrders/SellerOrders";
import ProductQuestion from "../Pages/ProductQuestion/ProductQuestion";
import UserChangePassword from "../Pages/Dashboard/UserChangePassword/UserChangePassword";
import CustomerAddress from "../Pages/Dashboard/CustomerAddress/CustomerAddress";
import AddCustomerAddress from "../Pages/Dashboard/AddCustomerAddress/AddCustomerAddress";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import SellerCustomers from "../Pages/SellerDashboard/SellerCustomers/SellerCustomers";
import SellerCustomerOrders from "../Pages/SellerDashboard/SellerCustomerOrders/SellerCustomerOrders";
import ConfirmOrder from "../Pages/ConfirmOrder/ConfirmOrder";
import AddCustomerReview from "../Pages/Dashboard/AddCustomerReview/AddCustomerReview";
import SellerReport from "../Pages/SellerDashboard/SellerReport/SellerReport";
import UpdateProduct from "../Pages/SellerDashboard/UpdateProduct/UpdateProduct";
import UpdateProductDetails from "../Pages/SellerDashboard/UpdateProductDetails/UpdateProductDetails";
import SellerCustomerProducts from "../Pages/SellerDashboard/SellerCustomerProducts/SellerCustomerProducts";
import SellerProfile from "../Pages/SellerDashboard/SellerProfile/SellerProfile";
import SellerProducts from "../Pages/SellerDashboard/SellerProducts/SellerProducts";
import AddCoupon from "../Pages/SellerDashboard/AddCoupon/AddCoupon";
import SearchResults from "../Pages/SearchResults/SearchResults";
import AdminDashboard from "../Layout/AdminDashboard";

import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import AdminAddCategory from "../Pages/AdminDashboard/AdminAddCategory/AdminAddCategory";
import CustomerTotalOrders from "../Pages/AdminDashboard/CustomerTotalOrders/CustomerTotalOrders";
import TotalVendors from "../Pages/AdminDashboard/TotalVendors/TotalVendors";
import VendorAllOrders from "../Pages/AdminDashboard/VendorAllOrders/VendorAllOrders";
import TotalCustomers from "../Pages/AdminDashboard/TotalCustomers/TotalCustomers";
import AddProductSpecification from "../Pages/SellerDashboard/AddProductSpecification/AddProductSpecification";
import AddSpecificationOnParticularProduct from "../Pages/SellerDashboard/AddSpecificationOnParticularProduct/AddSpecificationOnParticularProduct";
import HotDeal from "../Pages/HotDeal/HotDeal";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/categories/:id',
                element: <CategoryDetails></CategoryDetails>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/sellerLogin',
                element: <SellerLogin></SellerLogin>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path: '/registrationSeller',
                element: <RegistrationSeller></RegistrationSeller>
            },
            {
                path: '/productDetails/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path: '/question',
                element: <ProductQuestion></ProductQuestion>
            },
            {
                path: '/basket',
                element: <Basket></Basket>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: `/payment_status`,
                element: <PrivateRoute><PaymentSuccessful></PaymentSuccessful></PrivateRoute>
            },
            {
                path: '/paymentFail',
                element: <PrivateRoute><PaymentFail></PaymentFail></PrivateRoute>
            },
            {
                path: '/invoice',
                element: <Invoice></Invoice>
            },
            {
                path: '/forgetPassword',
                element: <ForgetPassword></ForgetPassword>
            }
            ,
            {
                path: 'confirmOrder',
                element: <ConfirmOrder></ConfirmOrder>
            },
            {
                path: '/searchResults',
                element: <SearchResults></SearchResults>
            },
            {
                path: '/adminLogin',
                element: <AdminLogin></AdminLogin>
            },
            {
                path: 'hotDeal',
                element: <HotDeal></HotDeal>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'yourAccount',
                element: <YourAccount></YourAccount>
            },
            {
                path: 'orderHistory',
                element: <OrderHistory></OrderHistory>
            },
            {
                path: 'personalDetails',
                element: <PersonalDetails></PersonalDetails>
            },
            {
                path: 'myWishlist',
                element: <MyWishlist></MyWishlist>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'userChangePassword',
                element: <UserChangePassword></UserChangePassword>
            },
            {
                path: 'customerAddress',
                element: <CustomerAddress></CustomerAddress>
            },
            {
                path: 'addCustomerAddress',
                element: <AddCustomerAddress></AddCustomerAddress>
            },
            {
                path: 'addCustomerReview/:pid',
                element: <AddCustomerReview></AddCustomerReview>
            }
        ]
    },
    {
        path: 'sellerDashboard',
        element: <PrivateRoute> <SellerDashboard></SellerDashboard> </PrivateRoute>,
        children: [
            {
                path: 'addProduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'changePassword',
                element: <ChangePassword></ChangePassword>
            },
            {
                path: 'wishList',
                element: <SellerWishList></SellerWishList>
            },
            {
                path: 'orders',
                element: <SellerOrders></SellerOrders>
            },
            {
                path: 'sellerCustomers',
                element: <SellerCustomers></SellerCustomers>
            },
            {
                path: 'sellerCustomerOrders/:id',
                element: <SellerCustomerOrders></SellerCustomerOrders>
            },
            {
                path: 'sellerReport',
                element: <SellerReport></SellerReport>
            },
            {
                path: 'updateProduct',
                element: <UpdateProduct></UpdateProduct>
            },
            {
                path: 'updateProductDetails/:id',
                element: <UpdateProductDetails></UpdateProductDetails>
            },
            {
                path: 'sellerCustomerProducts/:customer_id',
                element: <SellerCustomerProducts></SellerCustomerProducts>
            },
            {
                path: 'sellerProfile',
                element: <SellerProfile></SellerProfile>
            },
            {
                path: 'sellerProducts',
                element: <SellerProducts></SellerProducts>
            },
            {
                path: 'addCoupon/:product_id',
                element: <AddCoupon></AddCoupon>
            },
            {
                path: 'addProductSpecification',
                element: <AddProductSpecification></AddProductSpecification>
            },
            {
                path: 'addSpecificationOnParticularProduct/:id',
                element: <AddSpecificationOnParticularProduct></AddSpecificationOnParticularProduct>
            }
        ]
    },
    {
        path: 'adminDashboard',
        element: <PrivateRoute> <AdminDashboard></AdminDashboard> </PrivateRoute>,
        children: [
            {
                path: 'adminAddCategory',
                element: <AdminAddCategory></AdminAddCategory>
            },
            {
                path: 'customerTotalOrders',
                element: <CustomerTotalOrders></CustomerTotalOrders>
            },
            {
                path: 'totalVendors',
                element: <TotalVendors></TotalVendors>
            },
            {
                path: 'totalCustomers',
                element: <TotalCustomers></TotalCustomers>
            },
            {
                path: 'vendor_total_orders/:vendor_id',
                element: <VendorAllOrders></VendorAllOrders>
            },
            {
                path: 'customer_total_orders/:customer_id',
                element: <CustomerTotalOrders></CustomerTotalOrders>
            }
        ]
    }
]);


export default router;