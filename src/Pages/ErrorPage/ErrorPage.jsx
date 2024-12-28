import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <div className="flex flex-col h-screen justify-center items-center space-y-3">
                {
                    error.status === 404 && <p className="text-5xl md:text-8xl font-bold text-blue-500">404</p>
                }
                <p className="text-2xl md:text-3xl font-bold">{error.statusText || error.message}</p>
                <Link to={"/"}><button className="btn text-white hover:bg-blue-500  bg-blue-500 font-semibold">Go Back To Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;