import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";


const AddSpecificationOnParticularProduct = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [specifications, setSpecifications] = useState([
        { title: '', features: [{ feature_name: '', feature_value: '' }] },
    ]);
    const addSpecificationField = () => {
        setSpecifications([...specifications, { title: '', features: [{ feature_name: '', feature_value: '' }] }]);
    };
    const addFeatureField = (index) => {
        const newSpecification = [...specifications]
        newSpecification[index].features.push({ feature_name: '', feature_value: '' })
        setSpecifications(newSpecification)
    }
    const removeFeatureField = (specificationIndex, feautureIndex) => {
        if (specifications.length === 1) {
            return
        }
        const newSpecifications = [...specifications];
        newSpecifications[specificationIndex].features = newSpecifications[specificationIndex].features.filter((_, index) => index !== feautureIndex);
        setSpecifications(newSpecifications);
    }
    const removeSpecification = (specificationIndex) => {
        if (specifications.length === 1) {
            return
        }
        const newSpecification = specifications.filter((_, index) => index !== specificationIndex)
        setSpecifications(newSpecification)
    }
    const handleTitleChange = (specificationIndex, e) => {
        const { value } = e.target
        const newSpecifications = [...specifications]
        newSpecifications[specificationIndex].title = value
        setSpecifications(newSpecifications)
    }
    const handleFeatureChange = (specificationIndex, feautureIndex, e) => {
        const { name, value } = e.target
        const newSpecifications = [...specifications]
        newSpecifications[specificationIndex].features[feautureIndex][name] = value
        setSpecifications(newSpecifications)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axiosSecure.post(`/add-product-specifications/`, {
                product_id: id,
                specifications
            })
            // Access the 'message' field from the response data
            const { message } = response.data;

            if (message) {
                toast.success(message);  // Show the success message from the response
            } else {
                toast.error("Failed to add specifications");
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div>
            <h3 className="text-2xl md:text-4xl font-bold text-center mb-10">Add product specification</h3>
            <div className="mt-10 bg-gray-100 p-10 w-[80%] mx-auto">

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-5">
                    {
                        specifications.map((item, specificationIndex) => <div key={specificationIndex}>
                            <div className="mb-5 mt-5">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" value={item.title} onChange={(e) => handleTitleChange(specificationIndex, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" />
                            </div>

                            {
                                item.features.map((feature, feautureIndex) => <div key={feautureIndex}> <div className="mb-5">
                                    <label htmlFor="feature_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feature name</label>
                                    <input type="text" name="feature_name" value={feature.feature_name} onChange={(e) => handleFeatureChange(specificationIndex, feautureIndex, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feature name" />
                                </div>
                                    <div className="mb-5">
                                        <label htmlFor="feature_value" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feature value</label>
                                        <input type="text" name="feature_value" value={feature.feature_value} onChange={(e) => handleFeatureChange(specificationIndex, feautureIndex, e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Feature value" />
                                    </div>
                                    <div className="pb-5 border-b-[1px] border-gray-200 ">
                                        <div>
                                            <button onClick={() => removeFeatureField(specificationIndex, feautureIndex)} type="button" className="text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">- Remove Feature</button>
                                        </div>
                                        <div className="flex gap-5 mt-5">
                                            <div>
                                                <button type="button" onClick={() => addFeatureField(specificationIndex)} className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">+ Add Feature</button>
                                            </div>

                                        </div>
                                    </div></div>)
                            }
                            <div className="mt-5 grid grid-cols-2 gap-5 pr-5">
                                <button onClick={addSpecificationField} type="button" className="btn bg-green-500 hover:bg-green-500 text-white">+ Add another title</button>
                                <div>
                                    <button onClick={() => removeSpecification(specificationIndex)} type="button" className="text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">- Remove Specification</button>
                                </div>

                            </div>

                        </div>)
                    }

                    <button type="submit" className="btn mt-5 bg-green-500 hover:bg-green-500 text-white">Submit Specifications</button>
                </form>


            </div>
        </div>
    );
};

export default AddSpecificationOnParticularProduct;