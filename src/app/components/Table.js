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
import {
  deleteProject,
  getProjectByQuery,
  getProjects,
} from "../utils/projects";
import Link from "next/link";
import { CustomModal } from "./Modal";
import { useSearchParams } from "next/navigation";
import { CustomCards } from "./Cards";

const CustomTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;
  const searchParams = useSearchParams();

  useEffect(() => {
    setRows(getProjects());
  }, []);

  useEffect(() => {
    const query = searchParams.get("query");
    setRows(getProjectByQuery(query));
  }, [searchParams]);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  const handleCloseModal = () => setOpenModal(false);

  const deleteRow = () => {
    deleteProject(selectedRowId);
    setRows(getProjects());
    setOpenModal(false);
  };

  return (
    <>
      <TableContainer
        className={styles.container + " " + styles.hiddenMobile}
        component={Paper}
      >
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
                  <div className={styles.contenedor}>
                    <p className={styles.names}>{row.name}</p>
                    <p className={styles.created}>
                      Creation date: {row.created_at}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="left" className={styles.cell}>
                  <div className={styles.avatar}>
                    <Avatar
                      className={styles.avatarImg}
                      alt={
                        row.project_manager?.name +
                        " " +
                        row.project_manager?.lastname
                      }
                      src={
                        row.project_manager.image ??
                        `https://ui-avatars.com/api/?name=${row.project_manager?.name}+${row.project_manager?.lastname}`
                      }
                    />
                    <p>
                      {row.project_manager?.name}{" "}
                      {row.project_manager?.lastname}
                    </p>
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className={styles.cellAssigned}>
                    <Avatar
                      className={styles.avatarImg}
                      alt={
                        row.assigned_to?.name + " " + row.assigned_to?.lastname
                      }
                      src={
                        row.assigned_to.image ??
                        `https://ui-avatars.com/api/?name=${row.assigned_to?.name}+${row.assigned_to?.lastname}`
                      }
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
                    variant={row.status.id === 1 ? "" : "outlined"}
                  />
                </TableCell>
                <TableCell align="left" className={styles.icon}>
                  <MoreVertIcon
                    aria-describedby={id}
                    onClick={(event) => handleClick(event, row.id)}
                  />
                  <Popover
                    id={id}
                    open={openPopover && selectedRowId === row.id}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <div className={styles.popover}>
                      <Link href={`/edit/${row.id}`} className={styles.list}>
                        <EditCalendarIcon />
                        <p>Edit</p>
                      </Link>
                      <div onClick={handleOpenModal} className={styles.list}>
                        <DeleteOutlineIcon />
                        <p>Delete</p>
                      </div>
                    </div>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomCards rows={rows} handleClick={handleClick} id={id}></CustomCards>
      <CustomModal
        text={"Are you sure to delete this project?"}
        open={openModal}
        close={handleCloseModal}
        onCancel={handleCloseModal}
        onAction={deleteRow}
      />
    </>
  );
};

export default CustomTable;
