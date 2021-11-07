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
  const [error, setError] = useState(null);
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
          setError(
            toast.error("Woops, something went wrong... Try again later.")
          )
        )
        .finally(() => {
          setIsLoading(false);
          handleScroll();
        });
    };
    getImages();
  }, [page, query]);

  const handleScroll = () => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const onChangeQuery = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   this.getImages();
  // };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

    const toggleModal = () => {
      setShowModal(!showModal);
    };

    const openModal = (modalImage) => {
      setLargeImage (modalImage);
      toggleModal();
    };

    const closeModal = () => {
      setLargeImage("");
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

// class App extends Component {
//   state = {
//     page: 1,
//     images: [],
//     query: "",
//     largeImage: "",
//     isLoading: false,
//     error: null,
//     showModal: false,
//   };

//   componentDidUpdate(prevProps, { query, page }) {
//     if (query !== this.state.query || page !== this.state.page) {
//       this.getImages();
//     }
//   }

//   onChangeQuery = (query) => {
//     this.setState({ page: 1, images: [], query, error: null });
//   };

//   onSubmit = (event) => {
//     event.preventDefault();
//     this.getImages();
//   };

//   onLoadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   handleScroll = () => {
//     if (this.state.page > 1) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   openModal = (modalImage) => {
//     this.setState(() => ({ largeImage: modalImage }));
//     this.toggleModal();
//   };

//   closeModal = () => {
//     this.setState({ largeImage: "" });
//     this.toggleModal();
//   };

//   getImages = () => {
//     const { page, query } = this.state;

//     this.setState({
//       isLoading: true,
//     });
//     api
//       .getImages({ query, page })
//       .then((response) => {
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...mapper(response)],
//         }));
//       })
//       .catch((error) =>
//         this.setState({
//           error: toast.error("Woops, something went wrong... Try again later."),
//         })
//       )
//       .finally(() => {
//         this.setState({ isLoading: false });
//         this.handleScroll();
//       });
//   };

//   render() {
//     const { images, showModal, largeImage, isLoading } = this.state;
//     const renderContent = images.length > 0 && !isLoading;
//     return (
//       <div className={style.App}>
//         <SearchBar onSubmit={this.onChangeQuery} />
//         {images.length > 0 && (
//           <ImageGallery images={images} onClickImg={this.openModal} />
//         )}
//         {renderContent && <Button LoadMore={this.onLoadMore} />}
//         {isLoading && <Spinner />}
//         {showModal && (
//           <Modal
//             onClose={this.toggleModal}
//             modalImg={largeImage.largeImageURL}
//           />
//         )}
//         <ToastContainer />
//       </div>
//     );
//   }
// }

export default App;
