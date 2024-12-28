import { FaDollarSign } from "react-icons/fa";
import { ImAirplane, ImCheckmark } from "react-icons/im";
import { IoAccessibility } from "react-icons/io5";

const WhyChooseUs = () => {
    return (
        <div className="container mx-auto px-5 md:px-20 my-10 md:my-24">
            <div className="bg-[#F4F7F9] py-10 md:h-36">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Card 1 */}
                    <div className="w-full md:w-[25%] h-full flex justify-center items-center relative border-b md:border-b-0 md:border-r border-gray-200">
                        <div className="flex gap-5 items-center z-10 text-center md:text-left pb-5 md:pb-0">
                            <div>
                                <ImCheckmark className="text-yellow-400 text-2xl md:text-3xl" />
                            </div>
                            <div className="text-xs md:text-sm">
                                <p className="font-bold">Free Shipping</p>
                                <p>Free delivery for all products.</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="w-full md:w-[25%] h-full flex justify-center items-center relative border-b md:border-b-0 md:border-r border-gray-200">
                        <div className="flex gap-5 items-center z-10 text-center md:text-left py-7 md:py-0">
                            <div>
                                <IoAccessibility className="text-yellow-400 text-2xl md:text-3xl" />
                            </div>
                            <div className="text-xs md:text-sm">
                                <p className="font-bold">No Contact Delivery</p>
                                <p>We always value your safety.</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="w-full md:w-[25%] h-full flex justify-center items-center relative border-b md:border-b-0 md:border-r border-gray-200">
                        <div className="flex gap-5 items-center z-10 text-center md:text-left py-7 md:py-0">
                            <div>
                                <ImAirplane className="text-yellow-400 text-2xl md:text-3xl" />
                            </div>
                            <div className="text-xs md:text-sm">
                                <p className="font-bold">Fast Delivery</p>
                                <p>We deliver faster than anything else.</p>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="w-full md:w-[25%] h-full flex justify-center items-center relative">
                        <div className="flex gap-5 items-center z-10 text-center md:text-left pt-5 md:py-0">
                            <div>
                                <FaDollarSign className="text-yellow-400 text-2xl md:text-3xl" />
                            </div>
                            <div className="text-xs md:text-sm">
                                <p className="font-bold">30 Days Refund</p>
                                <p>Easy return policy for all products.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WhyChooseUs;