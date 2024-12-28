const Footer = () => {
    return (
        <div className="mt-20 bg-gray-100 text-gray-800">
            {/* Footer Content */}
            <footer className="container mx-auto px-4 py-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Connect With Us */}
                    <div>
                        <h6 className="font-bold text-lg mb-5">Connect With Us</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-600 cursor-pointer">Branding</li>
                            <li className="hover:text-blue-600 cursor-pointer">Design</li>
                            <li className="hover:text-blue-600 cursor-pointer">Marketing</li>
                            <li className="hover:text-blue-600 cursor-pointer">Advertisement</li>
                        </ul>
                        <h6 className="font-bold text-lg mt-8 mb-5">Useful Links</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-600 cursor-pointer">Terms & Conditions</li>
                            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-blue-600 cursor-pointer">FAQs</li>
                            <li className="hover:text-blue-600 cursor-pointer">Support</li>
                        </ul>
                    </div>

                    {/* More About Store */}
                    <div>
                        <h6 className="font-bold text-lg mb-5">More About Store</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-600 cursor-pointer">Our Story</li>
                            <li className="hover:text-blue-600 cursor-pointer">Careers</li>
                            <li className="hover:text-blue-600 cursor-pointer">Sustainability</li>
                            <li className="hover:text-blue-600 cursor-pointer">Press</li>
                        </ul>
                        <h6 className="font-bold text-lg mt-8 mb-5">End Points</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-600 cursor-pointer">API Documentation</li>
                            <li className="hover:text-blue-600 cursor-pointer">Developer Tools</li>
                            <li className="hover:text-blue-600 cursor-pointer">Integration Guides</li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h6 className="font-bold text-lg mb-5">Products</h6>
                        <ul className="space-y-2 text-sm">
                            <li className="hover:text-blue-600 cursor-pointer">Electronics</li>
                            <li className="hover:text-blue-600 cursor-pointer">Home Appliances</li>
                            <li className="hover:text-blue-600 cursor-pointer">Mobile Devices</li>
                            <li className="hover:text-blue-600 cursor-pointer">Accessories</li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h6 className="font-bold text-lg mb-5">Contact Details</h6>
                        <ul className="space-y-2 text-sm">
                            <li>Phone: +1 (123) 456-7890</li>
                            <li>Email: support@kopotakkho.com</li>
                            <li>Address: 123 Electronics Avenue, City, Country</li>
                        </ul>
                        <h6 className="font-bold text-lg mt-8 mb-5">Offline Stores</h6>
                        <ul className="space-y-2 text-sm">
                            <li>Downtown Outlet</li>
                            <li>Uptown Branch</li>
                            <li>City Mall Store</li>
                        </ul>
                    </div>
                </div>
            </footer>

            {/* Footer Bottom */}
            <footer className="bg-gray-200 py-4">
                <div className="container mx-auto text-center text-sm">
                    © 2024 Big Store Kopotakkho Electronics. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;
