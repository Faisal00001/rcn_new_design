import ImageGallery from "react-image-gallery";
//  import "~react-image-gallery/styles/scss/image-gallery.scss";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
// import "~react-image-gallery/styles/css/image-gallery.css";
const ProductImageGallery = ({ product }) => {
    // const imageBaseUrl = 'http://127.0.0.1:8000/'

    const images = []
    for (const item of product.product_image) {

        const modifyItem = `${item.image}`
        let obj = {
            original: modifyItem,
            thumbnail: modifyItem
        }
        images.push(obj)
    }

    return (
        <div>
            <ImageGallery items={images} showPlayButton={false} />
        </div>
    );
};

export default ProductImageGallery;