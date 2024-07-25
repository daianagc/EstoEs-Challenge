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
import { getData } from "../utils/getData";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
import styles from "../styles/table.module.css";

const getInitials = async (project_manager) => {
  const url = `https://ui-avatars.com/api/?name=${project_manager.name}+${project_manager.lastname}`;
  return await getData(url);
};

const rows = [
  {
    id: 1,
    name: "Landing page",
    created_at: Date.now(),
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
    created_at: Date.now(),
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
    created_at: Date.now(),
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table
        className={styles.table}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Project info</TableCell>
            <TableCell align="left">Project Manager</TableCell>
            <TableCell align="left">Assigned to</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div>
                  <p>{row.name}</p>
                  <p>Creation date: {row.created_at}</p>
                </div>
              </TableCell>
              <TableCell align="right">
                <div className={styles.project}>
                  <Avatar
                    alt={
                      row.project_manager?.name +
                      " " +
                      row.project_manager?.lastname
                    }
                    src={getInitials(row.project_manager)}
                  />
                  <p>
                    {row.project_manager?.name} {row.project_manager?.lastname}
                  </p>
                </div>
              </TableCell>
              <TableCell align="right">{""}</TableCell>
              <TableCell align="right">
                <Chip
                  className={styles.enabled}
                  label={row.status.name}
                  variant={row.status.id === 1 ? "" : "outline"}
                />
              </TableCell>
              <TableCell align="right">
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
