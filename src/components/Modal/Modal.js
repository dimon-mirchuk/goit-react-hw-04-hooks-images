import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const { overlay, modal } = styles;
const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={overlay} onClick={this.handleBackdropClick}>
        <div className={modal}>
          <img src={this.props.modalImg} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
