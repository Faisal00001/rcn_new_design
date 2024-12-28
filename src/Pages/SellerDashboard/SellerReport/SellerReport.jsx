import { useCallback, useEffect, useState } from "react";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import Chart from 'react-apexcharts';
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";

const SellerReport = () => {
    const axiosSecure = useAxiosSecure();
    const vendor = JSON.parse(localStorage.getItem('user'));
    const vendor_id = vendor.id;
    const [reportType, setReportType] = useState('daily');
    const [Dates, setDates] = useState([]);
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReportData = useCallback(async () => {
        let reportTypeUrl = '';
        if (reportType === 'daily') {
            reportTypeUrl = 'seller-daily-report';
        } else if (reportType === 'monthly') {
            reportTypeUrl = 'seller-daily-report/?time_frame=monthly';
        } else if (reportType === 'yearly') {
            reportTypeUrl = 'seller-daily-report/?time_frame=yearly';
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axiosSecure.get(`/vendor/${vendor_id}/${reportTypeUrl}/`);
            const dates = response?.data?.data.map(item => item.date);
            const totals = response?.data?.data.map(item => item.total_orders);
            setDates(dates);
            setData(totals);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    }, [reportType, axiosSecure, vendor_id]);

    useEffect(() => {
        fetchReportData(); // Fetch data when reportType changes
    }, [fetchReportData]);

    const chartOptions = {
        chart: {
            type: 'line',
            animations: {
                enabled: true,
                easing: 'easeinout',
                dynamicAnimation: {
                    speed: 800,
                },
            },
        },
        series: [
            {
                name: 'Sales',
                data: Data, // Data will dynamically update
            },
        ],
        xaxis: {
            categories: Dates,
            title: {
                text: 'Date',
            },
        },
        yaxis: {
            title: {
                text: 'Total Orders',
            },
        },
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex ml-10">
                <div className="w-[95%] p-8 mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Sales Reports</h2>

                    <div className="mb-6">
                        <label htmlFor="report-filter" className="block text-lg font-medium text-gray-700 mb-2">
                            Select Report
                        </label>
                        <select
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}
                            id="report-filter"
                            name="report-filter"
                            className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="daily">Daily Report</option>
                            <option value="monthly">Monthly Report</option>
                            <option value="yearly">Yearly Report</option>
                        </select>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold mb-4">Report Overview</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-indigo-500 text-white rounded-lg shadow">
                                <h4 className="text-lg font-medium">Daily Sales</h4>
                                <p className="text-4xl font-bold mt-2">1,200 BDT</p>
                                <p className="text-sm opacity-75">Today</p>
                            </div>
                            <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
                                <h4 className="text-lg font-medium">Monthly Sales</h4>
                                <p className="text-4xl font-bold mt-2">25,000 BDT</p>
                                <p className="text-sm opacity-75">This Month</p>
                            </div>
                            <div className="p-4 bg-green-500 text-white rounded-lg shadow">
                                <h4 className="text-lg font-medium">Yearly Sales</h4>
                                <p className="text-4xl font-bold mt-2">300,000 BDT</p>
                                <p className="text-sm opacity-75">This Year</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="text-lg font-semibold mb-4">Sales Graph</h4>
                            <div className="bg-gray-200 rounded-lg flex items-center justify-center">
                                <div className="row mt-2">
                                    <Chart options={chartOptions} series={chartOptions.series} type="bar" width={750} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerReport;
