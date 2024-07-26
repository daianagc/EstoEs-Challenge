import { Avatar, Card, CardContent } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "../styles/cards.module.css";

export const CustomCards = ({ rows, handleClick, id }) => {
  return (
    <div className={styles.hiddenDesktop}>
      {rows.map((row) => (
        <Card key={row.id} className={styles.card}>
          <CardContent className={styles.content}>
            <div className={styles.firstColumn}>
              <p className={styles.names}>{row.name}</p>
              <p className={styles.created}>Creation date: {row.created_at}</p>
              <div className={styles.avatar}>
                <Avatar
                  className={styles.avatarImg}
                  alt={row.assigned_to?.name + " " + row.assigned_to?.lastname}
                  src={
                    row.assigned_to.image ??
                    `https://ui-avatars.com/api/?name=${row.assigned_to?.name}+${row.assigned_to?.lastname}`
                  }
                />
                <p className={styles.avatarName}>
                  {row.assigned_to?.name} {row.assigned_to?.lastname}
                </p>
              </div>
            </div>
            <div className={styles.secondColumn}>
              <MoreVertIcon
                aria-describedby={id}
                onClick={(event) => handleClick(event, row.id)}
                fontSize="large"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
