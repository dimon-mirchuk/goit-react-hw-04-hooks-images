import PropTypes from "prop-types";
import styles from "./Button.module.css";

const { wrapper, button } = styles;

const Button = ({ LoadMore }) => {
  return (
    <div className={wrapper}>
      <button type="button" className={button} onClick={LoadMore}>
        load more
      </button>
    </div>
  );
};

Button.propTypes = {
  LoadMore: PropTypes.func.isRequired,
};

export default Button;
