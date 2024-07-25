"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import styles from "../styles/table.module.css";

const rows = [
  {
    id: 1,
    name: "Landing page",
    created_at: "2011-10-05T14:48:00.000Z",
    project_manager: {
      id: 1,
      name: "Walt",
      lastname: "Cosani",
    },
    assigned_to: {
      id: 1,
      name: "Ignacio",
      lastname: "Truffa",
    },
    status: {
      id: 1,
      name: "Enabled",
    },
  },
  {
    id: 2,
    name: "E-Commerce Shop",
    created_at: "2011-10-05T14:48:00.000Z",
    project_manager: {
      id: 1,
      name: "Walt",
      lastname: "Cosani",
    },
    assigned_to: {
      id: 1,
      name: "Ignacio",
      lastname: "Truffa",
    },
    status: {
      id: 1,
      name: "Enabled",
    },
  },
  {
    id: 3,
    name: "CRM Linkroom",
    created_at: "2011-10-05T14:48:00.000Z",
    project_manager: {
      id: 1,
      name: "Walt",
      lastname: "Cosani",
    },
    assigned_to: {
      id: 1,
      name: "Ignacio",
      lastname: "Truffa",
    },
    status: {
      id: 1,
      name: "Enabled",
    },
  },
];

const CustomTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.head} align="left">
              Project info
            </TableCell>
            <TableCell className={styles.head} align="left">
              Project Manager
            </TableCell>
            <TableCell className={styles.head} align="left">
              Assigned to
            </TableCell>
            <TableCell className={styles.head} align="left">
              Status
            </TableCell>
            <TableCell className={styles.head} align="left">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={styles.row}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div>
                  <p className={styles.names}>{row.name}</p>
                  <p>Creation date: {row.created_at}</p>
                </div>
              </TableCell>
              <TableCell className={styles.cell} align="left">
                <div className={styles.avatar}>
                  <Avatar
                    alt={
                      row.project_manager?.name +
                      " " +
                      row.project_manager?.lastname
                    }
                    src={`htttps://ui-avatars.com/api/?name=${row.project_manager?.name}+${row.project_manager?.lastname}`}
                  />
                  <p>
                    {row.project_manager?.name} {row.project_manager?.lastname}
                  </p>
                </div>
              </TableCell>
              <TableCell align="left">
                <div className={styles.cell}>
                  <Avatar
                    alt={
                      row.assigned_to?.name + " " + row.assigned_to?.lastname
                    }
                    src={`htttps://ui-avatars.com/api/?name=${row.assigned_to?.name}+${row.assigned_to?.lastname}`}
                  />
                  <p>
                    {row.assigned_to?.name} {row.assigned_to?.lastname}
                  </p>
                </div>
              </TableCell>
              <TableCell align="left">
                <Chip
                  className={styles.enabled}
                  label={row.status.name}
                  variant={row.status.id === 1 ? "" : "outline"}
                />
              </TableCell>
              <TableCell className={styles.icon} align="left">
                <MoreVertIcon aria-describedby={row.id} onClick={handleClick} />
                <Popover
                  id={row.id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <p>Edit</p>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
