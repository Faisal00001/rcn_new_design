import { useState } from "react";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import toast from "react-hot-toast";


const AdminAddCategory = () => {
    const axiosSecure = useAxiosSecure()
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('title', categoryName);
        formData.append('detail', description);
        if (categoryImage) {
            formData.append('category_image', categoryImage);
        }
        axiosSecure.post(`/add-category/`, formData)
            .then(res => {
                setCategoryName('');
                setDescription('');
                setCategoryImage(null);
                toast.success('Category added successfully')

            })
            .catch(error => {
                toast.error('Failed to add category')
                console.log(error)
            })
    }
    return (
        <div>
            <div>


                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category name</label>
                        <input type="text" id="categoryName"

                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">

                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea id="description" value={description}
                                onChange={(e) => setDescription(e.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
                        </div>


                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category image</label>
                        <input accept="image/*" onChange={(e) => setCategoryImage(e.target.files[0])} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add category</button>
                </form>


            </div>
        </div>
    );
};

export default AdminAddCategory;