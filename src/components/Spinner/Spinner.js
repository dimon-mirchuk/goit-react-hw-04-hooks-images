import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Spinner;
