import { useEffect, useRef, useState } from "react";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import useCategories from "../../../components/hooks/useCategories";
import toast from "react-hot-toast";


const AddProduct = () => {
    const vendor = JSON.parse(localStorage.getItem('user'))
    const axiosPublic = useAxiosPublic()
    // const [Categories, setCategories] = useState([]);
    const [ProductImgs, setProductImgs] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [categoryError, setCategoryError] = useState(false);
    const [fileName, setFileName] = useState({ image: '', product_file: '', multiple_images: '' });
    const [formError, setFormError] = useState(false);
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('');


    const imageInputRef = useRef(null);
    const multipleImagesInputRef = useRef(null);
    const token = vendor.access_token
    const [productData, setProductData] = useState({
        'category': '',
        'vendor': vendor.id,
        'title': '',
        // 'slug': '',
        'detail': '',
        'price': '',
        'usd_price': '',
        'tags': '',
        'image': '',
        'demo_url': '',
        'product_file': '',
        'publish_status': false,
        'hot_deal': false,
    });
    // useEffect(() => {
    //     setProductData({
    //         ...productData, 'vendor': vendor.id
    //     })
    // }, [productData, vendor.id])
    const [categories, loading] = useCategories()
    if (loading) {
        return 'Loading'
    }

    const inputHandler = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value
        })
        if (event.target.name === "category" && event.target.value) {
            setCategoryError(false); // Reset error when valid category is selected
        }

    }

    const fileHandler = (event) => {
        const { name, files } = event.target
        const file = files[0]
        // console.log(file)
        // console.log(file)
        setProductData(prevData => ({
            ...prevData,
            [name]: file
        }))
        setFileName(prevData => ({
            ...prevData,
            [name]: file.name
        }))
        if (name === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }



    }
    const multipleFileHandler = (event) => {

        const files = Array.from(event.target.files)
        setProductImgs(files)
        setFileName(prevData => ({
            ...prevData,
            'multiple_images': `${files.length} files selected`
        }))

    }
    const checkBoxHandler = (event) => {
        setProductData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.checked
        }))
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const formData = new FormData();
    //     formData.append('vendor', productData.vendor);
    //     formData.append('category', productData.category);
    //     formData.append('title', productData.title);
    //     formData.append('slug', productData.slug);
    //     formData.append('detail', productData.detail);
    //     formData.append('price', productData.price);
    //     formData.append('usd_price', productData.usd_price);
    //     formData.append('tags', productData.tags);
    //     formData.append('image', productData.image);
    //     formData.append('demo_url', productData.demo_url);
    //     formData.append('product_file', productData.product_file);
    //     formData.append('publish_status', productData.publish_status);
    //     axiosPublic.post('/products/', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    //         .then(res => {
    //             if (res.data.bool === false) {
    //                 setFormError(true);
    //                 setErrorMsg(res.data.msg || 'Oops... Something went wrong!');
    //                 setSuccessMsg('');
    //             }
    //             else {
    //                 setProductData({
    //                     'category': '',
    //                     'vendor': '',
    //                     'title': '',
    //                     'slug': '',
    //                     'detail': '',
    //                     'price': '',
    //                     'usd_price': '',
    //                     'tags': '',
    //                     'image': '',
    //                     'demo_url': '',
    //                     'product_file': '',
    //                     'product_image': '',
    //                     'publish_status': false,
    //                 });
    //                 setFormError(false);
    //                 setErrorMsg('');
    //                 setSuccessMsg('Product added successfully');

    //                 setFileName({ image: '', product_file: '', multiple_images: '' });
    //                 setImagePreview(null);
    //                 // imageInputRef.current.value = '';
    //                 // multipleImagesInputRef.current.value = '';
    //                 console.log('hello from here')
    //                 // ProductImgs.forEach(item => {
    //                 //     const imageformData = new FormData();
    //                 //     imageformData.append('product', res.data.id);
    //                 //     imageformData.append('image', item);
    //                 //     axiosPublic.post('/product-imgs/', imageformData)
    //                 //         .then(res => {
    //                 //             console.log(res)
    //                 //             toast.success('Successfully added');
    //                 //         })
    //                 //         .catch(error => {
    //                 //             console.log(error)
    //                 //             setFormError(true);
    //                 //             setErrorMsg('Oops... Something went wrong!');
    //                 //         })

    //                 // })
    //                 for (let i = 0; i < ProductImgs.length; i++) {
    //                     console.log('Hello from mul')
    //                     const ImageformData = new FormData();
    //                     ImageformData.append('product', res.id);
    //                     ImageformData.append('image', ProductImgs[i]);

    //                     axiosPublic.post('/product-imgs/', ImageformData)

    //                         .then(function (response) {
    //                             console.log('Hello from here too')
    //                             console.log(response);
    //                         })
    //                         .catch(function (error) {
    //                             console.log('Hello error from here too')
    //                             console.error('Error:', error);
    //                             setFormError(true);
    //                             setErrorMsg('Oops... Something went wrong!');
    //                         });
    //                 }
    //             }
    //         })

    // }
    // console.log(productData)
    // console.log('File Name', fileName)
    // console.log('Image preview', imagePreview)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!productData.category) {
            setCategoryError(true);
            setErrorMsg("Please select a category.");
            return; // Prevent form submission if category is not selected
        }

        try {
            // Prepare the main product data
            const formData = new FormData();
            formData.append('vendor', productData.vendor);
            formData.append('category', productData.category);
            formData.append('title', productData.title);
            // formData.append('slug', productData.slug);
            formData.append('hot_deal', productData.hot_deal)
            formData.append('detail', productData.detail);
            formData.append('price', productData.price);
            formData.append('usd_price', productData.usd_price);
            formData.append('tags', productData.tags);
            formData.append('image', productData.image);
            formData.append('demo_url', productData.demo_url);
            formData.append('product_file', productData.product_file);
            formData.append('publish_status', productData.publish_status);

            // Submit the product data
            const res = await axiosPublic.post('/products/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.data.bool === false) {
                setFormError(true);
                setSuccessMsg('')
                setErrorMsg(res.data.msg || 'Oops... Something went wrong! hehe');

                return; // Exit the function early since there's an error
            }

            // If product is successfully added, reset form
            setProductData({
                'category': '',
                'vendor': '',
                'title': '',
                // 'slug': '',
                'detail': '',
                'price': '',
                'usd_price': '',
                'tags': '',
                'image': '',
                'demo_url': '',
                'product_file': '',
                'product_image': '',
                'publish_status': false,
                'hot_deal': false,
            });
            setFormError(false);
            setErrorMsg('');

            setFileName({ image: '', product_file: '', multiple_images: '' });
            setImagePreview(null);
            // imageInputRef.current.value = '';
            // multipleImagesInputRef.current.value = '';


            // Now, upload multiple images associated with the product
            const uploadPromises = ProductImgs.map((item) => {
                const imageFormData = new FormData();
                imageFormData.append('product', res.data.id);
                imageFormData.append('image', item);

                return axiosPublic.post('/product-imgs/', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        // console.log('Hello from here too');
                        // console.log(response);
                        setSuccessMsg('Product added successfully');
                    })
                    .catch(error => {
                        setFormError(true);
                        setErrorMsg('Oops... Something went wrong with image upload!');
                    });
            });

            // Wait for all images to upload
            await Promise.all(uploadPromises);

        } catch (error) {
            console.error('Error during product submission:', error);
            setFormError(true);
            setErrorMsg('Oops... Something went wrong!');
        }
    };


    return (
        <div>


            <form className="max-w-sm mx-auto">
                {
                    successMsg &&
                    <p className="text-green-600 text-center my-5 text-4xl font-bold">{successMsg}</p>
                }
                {errorMsg &&
                    <p className='text-danger'>{errorMsg}</p>
                }
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name='category' value={productData.category} onChange={inputHandler} required>
                        <option value={""}>Choose a category</option>
                        {
                            categories.data.map((item, index) =>
                                <option key={index} value={item.id}>{item.title}</option>
                            )
                        }

                    </select>
                    {categoryError && <p className="text-red-500 text-sm mt-1">Category is required.</p>}

                </div>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" value={productData.title} name="title" onChange={inputHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />

                </div>
                {/* <div className="mb-5">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 ">Slug</label>
                    <input type="text" value={productData.slug} name="slug" onChange={inputHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                </div> */}
                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                    <input type="text" value={productData.price} name="price" onChange={inputHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />

                </div>

                <div className="mb-5">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Details</label>
                    <textarea id="message" value={productData.detail} name="detail" onChange={inputHandler} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." />
                </div>
                <div className="mb-5">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Tags</label>
                    <textarea id="message" value={productData.tags} name="tags" onChange={inputHandler} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your tags here..." />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Demo URL</label>
                    <input type="url" value={productData.demo_url} name="demo_url" onChange={inputHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " required />

                </div>
                <div className="relative mb-5 flex w-full max-w-sm flex-col gap-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Featured Image</label>
                    <input type="file" onChange={fileHandler} name='image' className="w-full overflow-clip rounded-xl border border-slate-300 bg-slate-100/50 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 dark:border-slate-700 " />
                </div>
                {imagePreview && (
                    <div className="mb-3">
                        <img src={imagePreview} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
                <div className="relative mb-5 flex w-full max-w-sm flex-col gap-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Multiple Featured Image</label>
                    <input type="file" multiple name='multiple_images' onChange={multipleFileHandler} className="w-full overflow-clip rounded-xl border border-slate-300 bg-slate-100/50 text-sm text-slate-700 file:mr-4 file:cursor-pointer file:border-none file:bg-slate-100 file:px-4 file:py-2 file:font-medium file:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-75 " />
                </div>




                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input name='publish_status' checked={productData.publish_status} onChange={checkBoxHandler} type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</label>
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input name='hot_deal' checked={productData.hot_deal} onChange={checkBoxHandler} type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hot Deal</label>
                </div>
                <button onClick={handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Product</button>
            </form>


        </div>
    );
};

export default AddProduct;