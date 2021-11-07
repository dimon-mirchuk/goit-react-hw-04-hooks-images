import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const { imageGalleryItem, imageGalleryItemImage } = styles;

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClickImg }) => {
  return (
    <li className={imageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={imageGalleryItemImage}
        onClick={() => onClickImg({ largeImageURL })}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
