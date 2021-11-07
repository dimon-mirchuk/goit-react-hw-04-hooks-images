import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map((image) => (
        <ImageGalleryItem {...image} key={image.id} onClickImg={onClickImg} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
