import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./App.css";
import mapper from "../helpers/Mapper";
import * as api from "../Service/ServiceAPI";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import Button from "./Button";
import Spinner from "./Spinner";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getImages = () => {
      if (!query) {
        return;
      }
      setIsLoading(true);

      api
        .getImages({ query, page })
        .then((response) => {
          setImages((prevImages) => [...prevImages, ...mapper(response)]);
        })
        .catch((error) =>
          toast.error("Woops, something went wrong... Try again later.")
        )
        .finally(() => {
          setIsLoading(false);
          if (page > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        });
    };
    getImages();
  }, [page, query]);

  const onChangeQuery = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = (modalImage) => {
    setLargeImage(modalImage);
    toggleModal();
  };

  const renderContent = images.length > 0 && !isLoading;
  return (
    <div className={style.App}>
      <SearchBar onSubmit={onChangeQuery} />
      {images.length > 0 && (
        <ImageGallery images={images} onClickImg={openModal} />
      )}
      {renderContent && <Button LoadMore={onLoadMore} />}
      {isLoading && <Spinner />}
      {showModal && (
        <Modal onClose={toggleModal} modalImg={largeImage.largeImageURL} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
