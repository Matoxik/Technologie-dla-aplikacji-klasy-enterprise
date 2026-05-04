import {Link} from "react-router-dom";

const ProductItem = ({id, title, brand}) => {
    return (
        <li>
            <Link to={`/details/${id}`}>{title}</Link> ({brand})
        </li>
    );
};

export default ProductItem;
