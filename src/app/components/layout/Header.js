import Image from "next/image";
import styles from "../../styles/header.module.css";
import logo from "../../../../public/assets/images/logo.png";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={logo} width={60} height={40} alt="Logo de Esto Es" />
    </header>
  );
};
