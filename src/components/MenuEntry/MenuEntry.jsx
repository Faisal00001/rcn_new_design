import { Link } from "react-router-dom";


const MenuEntry = ({ option }) => {
    const { id, title } = option
    return (
        <div>
            <ul className="list-none py-2 text-sm">
                <Link to={`/categories/${id}`} className="hover:underline cursor-pointer">
                    <p>{title}</p>
                </Link>
            </ul>

        </div>
    );
};

export default MenuEntry;