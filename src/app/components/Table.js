"use client";

import { useEffect, useState } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Popover from "@mui/material/Popover";
import styles from "../styles/table.module.css";
import { getProjects } from "../utils/projects";
import Link from "next/link";

const CustomTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setRows(getProjects());
  }, []);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  return (
    <TableContainer className={styles.container} component={Paper}>
      <Table
        className={styles.table}
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="left" className={styles.head}>
              Project info
            </TableCell>
            <TableCell align="left" className={styles.head}>
              Project Manager
            </TableCell>
            <TableCell align="left" className={styles.head}>
              Assigned to
            </TableCell>
            <TableCell align="left" className={styles.head}>
              Status
            </TableCell>
            <TableCell align="left" className={styles.head}>
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
              <TableCell align="left" className={styles.cell}>
                <div className={styles.avatar}>
                  <Avatar
                    alt={
                      row.project_manager?.name +
                      " " +
                      row.project_manager?.lastname
                    }
                    src={`https://ui-avatars.com/api/?name=${row.project_manager?.name}+${row.project_manager?.lastname}`}
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
                      row.project_manager?.name +
                      " " +
                      row.project_manager?.lastname
                    }
                    src={`https://ui-avatars.com/api/?name=${row.assigned_to?.name}+${row.assigned_to?.lastname}`}
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
              <TableCell align="left" className={styles.icon}>
                <MoreVertIcon
                  aria-describedby={id}
                  onClick={(event) => handleClick(event, row.id)}
                />
                <Popover
                  id={id}
                  open={open && selectedRowId === row.id}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Link href={`/edit/${row.id}`}>
                    <EditCalendarIcon />
                    <p>Edit</p>
                  </Link>
                  <div>
                    <Link href={`/${row.id}`}>
                      <DeleteOutlineIcon />
                      <p>Delete</p>
                    </Link>
                  </div>
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
