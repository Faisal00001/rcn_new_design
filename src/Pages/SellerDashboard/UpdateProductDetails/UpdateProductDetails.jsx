import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../components/hooks/useAxiosPublic";
import axios from "axios";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";


const UpdateProductDetails = () => {

    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor = JSON.parse(localStorage.getItem('user'));
    const token = vendor.access_token;
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic();
    const product_id = id;

    const [Category, setCategory] = useState([]);
    const [ProductData, setProductData] = useState({
        category: '',
        vendor: '',
        title: '',
        detail: '',
        price: '',
        usd_price: '',
        tags: '',
        image: '',
        demo_url: '',
        publish_status: false,
        product_image: [],
        product_file: '',
    });
    const [fileName, setFileName] = useState({ image: '', product_file: '', multiple_images: '' });
    const [ProductImgs, setProductImgs] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [IsFeatureImagesSelected, setIsFeatureImagesSelected] = useState(false);
    const [IsProductFileSelected, setIsProductFileSelected] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const imageInputRef = useRef(null);
    const multipleImagesInputRef = useRef(null);
    const productFileInputRef = useRef(null);

    useEffect(() => {
        const fetchCategoriesData = async (url) => {
            try {
                const res = await axiosPublic.get(url);
                setCategory(res.data?.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchProductData = async (url) => {
            try {
                const res = await axiosPublic.get(url);
                setProductData(res.data);
                setImagePreview(res.data.image);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategoriesData('/categories/');
        fetchProductData(`/product/${product_id}/`);
    }, [product_id, axiosPublic]);

    const inputHandler = (event) => {
        setProductData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const fileHandler = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setProductData(prev => ({
            ...prev,
            [name]: file,
        }));
        setFileName(prev => ({
            ...prev,
            [name]: file.name,
        }));
        if (name === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setIsFeatureImagesSelected(true);
        } else if (name === 'product_file') {
            setIsProductFileSelected(true);
        }
    };

    const multipleFileHandler = (event) => {
        const files = Array.from(event.target.files);
        setProductImgs(files);
        setFileName(prev => ({
            ...prev,
            multiple_images: `${files.length} files selected`,
        }));
    };

    const deleteImage = (image_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/product-img-delete/${image_id}/`)
                    .then(response => {
                        setProductData(prev => ({
                            ...prev,
                            product_image: prev.product_image.filter(img => img.id !== image_id),
                        }));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    })
                    .catch(error => {
                        toast.error('Failed to delete the file')
                        console.error('Error:', error);
                    });


            }
        });

    };

    const checkBoxHandler = (e) => {
        setProductData(prev => ({
            ...prev,
            [e.target.name]: e.target.checked,
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('vendor', ProductData.vendor);
        formData.append('category', ProductData.category);
        formData.append('title', ProductData.title);
        formData.append('detail', ProductData.detail);
        formData.append('price', ProductData.price);
        formData.append('usd_price', ProductData.usd_price);
        formData.append('tags', ProductData.tags);
        if (IsFeatureImagesSelected) {
            formData.append('image', ProductData.image);
        }
        formData.append('demo_url', ProductData.demo_url);
        formData.append('publish_status', ProductData.publish_status);
        if (IsProductFileSelected) {
            formData.append('product_file', ProductData.product_file);
        }

        // Append multiple images if any
        ProductImgs.forEach(file => {
            formData.append('product_image', file);
        });

        axios.patch(`${baseUrl}/product/${product_id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.data.bool === false) {
                    setErrorMsg(response.data.msg || 'Oops... Something went wrong!');
                    setSuccessMsg('');
                } else {
                    // Make changes
                    // setProductData({
                    //     category: '',
                    //     vendor: '',
                    //     title: '',
                    //     detail: '',
                    //     price: '',
                    //     usd_price: '',
                    //     tags: '',
                    //     image: '',
                    //     demo_url: '',
                    //     publish_status: false,
                    //     product_image: [],
                    //     product_file: '',
                    // });

                    setErrorMsg('');
                    setSuccessMsg('Product updated successfully');
                    // Make changes
                    // setFileName({ image: '', product_file: '', multiple_images: '' });
                    // setImagePreview(null);
                    // Reset file inputs
                    // imageInputRef.current.value = '';
                    // multipleImagesInputRef.current.value = '';
                    // productFileInputRef.current.value = '';

                    // Handle multiple images submission
                    ProductImgs.forEach(file => {
                        const ImageformData = new FormData();
                        ImageformData.append('product', response.data.id);
                        ImageformData.append('image', file);
                        axios.post(`${baseUrl}/product-imgs/`, ImageformData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        })
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                setErrorMsg('Oops... Something went wrong!');
                            });
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMsg('Oops... Something went wrong!');
                setSuccessMsg('');
            });
    };
    console.log(ProductData)
    return (
        <div>
            <h3 className="text-2xl md:text-4xl text-center font-bold">Update Product</h3>
            <div className="ml-10 my-10">

                {successMsg && <p className='text-success text-center my-5 text-4xl font-bold'>{successMsg}</p>}
                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                <form className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <div>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                            <select name='category' value={ProductData.category} onChange={inputHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option >Choose Category</option>
                                {Category.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}

                            </select>
                        </div>

                    </div>
                    <div className="mb-5">
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" name="title" onChange={inputHandler} value={ProductData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="text" name="price" onChange={inputHandler} value={ProductData.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">

                        <div>
                            <label htmlFor="detail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                            <textarea name="detail" onChange={inputHandler} value={ProductData.detail} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
                        </div>


                    </div>
                    <div className="mb-5">

                        <div>
                            <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                            <textarea name="tags" onChange={inputHandler} value={ProductData.tags} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
                        </div>


                    </div>
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Demo Url</label>
                        <input type="text" name="demo_url" onChange={inputHandler} value={ProductData.demo_url} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-5">

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                            <input type="file" name="image" onChange={fileHandler} className="file-input file-input-bordered w-full max-w-xs" />
                        </div>


                        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Image</label> */}
                        {/* <input type='file' ref={imageInputRef} name='image' onChange={fileHandler} className='form-control' id='image' /> */}
                        {/* <input name="image" onChange={fileHandler} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" /> */}

                        {imagePreview && <img src={imagePreview} alt='Preview' className='img-thumbnail mt-2' />}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="multiple_images">Multiple Images</label>
                        <input type="file" ref={multipleImagesInputRef} name='multiple_images' onChange={multipleFileHandler} className="form-control" id="multiple_images" multiple />
                        {/* {Array.isArray(ProductData) && ProductData.map((img, index) => (
                                            
                                            <span className='image-box d-inline me-2' onClick={()=>deleteImage(img.id)}>
                                            <i className='fa fa-trash text-danger m-1' role='button'></i>
                                            <img 
                                                key={index} 
                                                src={img.product_image}
                                                alt={`Product ${index}`} 
                                                className='img rounded border mt-2' 
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                            </span>
                                         
                                        ))} */}
                        {
                            ProductData?.product_image.map((product, index) => {
                                return (
                                    <div className="relative" key={index} >
                                        <img

                                            src={`${product.image}`}
                                            alt={`Product ${index}`}
                                            className='img rounded border mt-2'
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                        <div>
                                            <button type="button" onClick={() => deleteImage(product.id)} className="absolute top-1 right-5 btn bg-red-500 text-white hover:bg-red-500">Delete</button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input name='publish_status' checked={ProductData.publish_status} onChange={checkBoxHandler} type="checkbox" defaultValue className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Publish</label>
                    </div>

                    <button onClick={submitHandler} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </form>


            </div>
        </div>
    );
};

export default UpdateProductDetails;