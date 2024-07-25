import styles from "../styles/subheader.module.css";

export const CustomButton = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
