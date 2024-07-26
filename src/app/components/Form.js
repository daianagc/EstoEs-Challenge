"use client";

import {
  Select,
  TextField,
  MenuItem,
  Card,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../styles/form.module.css";
import { useRouter, usePathname } from "next/navigation";
import { updateProject, addProject, getProject } from "../utils/projects";
import { PROJECT_MANAGERS } from "../mock/projectManagers";
import { USERS } from "../mock/users";
import { STATUSES } from "../mock/statuses";

export const CustomForm = ({ isEdit = false }) => {
  const [project, setProject] = useState({
    id: "",
    created_at: "",
    name: "",
    description: "",
    project_manager: 0,
    assigned_to: 0,
    status: 0,
  });
  const [errors, setErrors] = useState({
    name: false,
    project_manager: false,
    assigned_to: false,
    status: false,
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isEdit) {
      const id = pathname.split("/")[2];
      const project = getProject(id);

      setProject(project);
      console.log("EDICION", project);
    }
  }, [isEdit, pathname]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(project);

    const newErrors = {
      name: project.name === "",
      project_manager: project.project_manager == "",
      assigned_to: project.assigned_to == "",
      status: project.status == "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      isEdit ? updateProject(project) : addProject(project);

      router.push("/", { scroll: false });

      setProject({
        id: "",
        created_at: "",
        name: "",
        description: "",
        project_manager: "",
        assigned_to: "",
        status: "",
      });
    }
  };

  return (
    <Card className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormControl>
          <label>Project Name</label>
          <TextField
            error={errors.name}
            helperText={errors.name ? "This field is required" : ""}
            name="name"
            value={project.name}
            onChange={handleChange}
            variant="outlined"
            /*className={styles.input}*/
          />
        </FormControl>
        <FormControl>
          <label>Description</label>
          <TextField
            name="description"
            value={project.description}
            onChange={handleChange}
            variant="outlined"
            /*className={styles.input}*/
          />
        </FormControl>
        <FormControl>
          <label>Project Manager</label>
          <Select
            error={errors.project_manager}
            name="project_manager"
            value={project.project_manager}
            onChange={handleChange}
            variant="outlined"
            /*className={classes.input}*/
          >
            {PROJECT_MANAGERS.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} {user.lastname}
              </MenuItem>
            ))}
            <MenuItem value={0}>Select a project manager</MenuItem>
          </Select>
          {errors.project_manager && (
            <FormHelperText error={errors.project_manager}>
              This field is required
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <label>Assigned to</label>
          <Select
            error={errors.assigned_to}
            name="assigned_to"
            value={project.assigned_to}
            onChange={handleChange}
            variant="outlined"
            /*className={classes.input}*/
          >
            {USERS.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name} {user.lastname}
              </MenuItem>
            ))}
            <MenuItem value={0}>Select a user</MenuItem>
          </Select>
          {errors.assigned_to && (
            <FormHelperText error={errors.assigned_to}>
              This field is required
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <label>Status</label>
          <Select
            error={errors.status}
            name="status"
            value={project.status}
            onChange={handleChange}
            variant="outlined"
            /*className={classes.input}*/
          >
            {STATUSES.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                {status.name}
              </MenuItem>
            ))}
            <MenuItem value={0}>Select a status</MenuItem>
          </Select>
          {errors.status && (
            <FormHelperText error={errors.status}>
              This field is required
            </FormHelperText>
          )}
        </FormControl>
        <button type="submit" className={styles.button}>
          {isEdit ? "Save changes" : "Create project"}
        </button>
      </form>
    </Card>
  );
};
