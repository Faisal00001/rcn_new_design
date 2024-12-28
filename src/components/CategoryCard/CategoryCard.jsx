import { Link } from "react-router-dom";


const CategoryCard = ({ category }) => {
    const { id, title, category_image } = category
    return (
        <div>
            <Link to={`/categories/${id}`} className="rounded overflow-hidden">
                <img className="w-full h-[200px]" src={category_image} alt={title} />
                <div className="px-6 py-4 text-center">
                    <Link to={`/categories/${id}`}>
                        <div className="text-base mb-2 cursor-pointer hover:underline">{title}</div>
                    </Link>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;