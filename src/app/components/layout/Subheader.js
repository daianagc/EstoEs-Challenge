"use client";

import styles from "../../styles/subheader.module.css";
import { useRouter, usePathname } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CustomButton } from "../Button";

export const SubHeader = () => {
  let title = "My projects";
  const router = useRouter();
  const pathname = usePathname();
  const goBack = () => {
    router.back(); // Go back to the previous page
  };

  const checkTitle = () => {
    if (pathname.includes("edit")) {
      title = "Edit project";
    } else if (pathname.includes("add")) {
      title = "Add project";
    }
    return title;
  };

  return (
    <div className={styles.subheader}>
      <div className={styles.column}>
        {pathname !== "/" && (
          <div className={styles.back} onClick={goBack}>
            <ArrowBackIcon />
            <p className={styles.p}>Back</p>
          </div>
        )}
        <h1 className={styles.h1}>{checkTitle()}</h1>
      </div>
      {pathname === "/" && (
        <CustomButton
          type="Add"
          onClick={() => router.push("/add")}
          text="Add Project"
        />
      )}
    </div>
  );
};
