import styles from "../styles/button.module.css";
import AddIcon from "@mui/icons-material/Add";
export const CustomButton = ({ text, onClick, color = "primary", type }) => {
  return (
    <button
      className={
        styles.button +
        " " +
        (color === "primary" ? "" : styles.secondary) +
        " " +
        (type === "Add" ? styles.add : "")
      }
      onClick={onClick}
    >
      {type === "Add" && <AddIcon />}
      {text}
    </button>
  );
};
