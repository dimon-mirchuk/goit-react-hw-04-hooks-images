import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const { overlay, modal } = styles;
const modalRoot = document.querySelector("#modal-root");

function Modal({ onClose, modalImg }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={overlay} onClick={handleBackdropClick}>
      <div className={modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};

export default Modal;
