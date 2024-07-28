import { PROJECTS } from "../mock/projects.js";
import { formatDate } from "./formatDate.js";
import { getProjectManager, getUser, getStatus } from "./getData.js";

export function getProjects() {
  if (typeof window !== "undefined") {
    let projects = localStorage.getItem("projects");

    if (!projects) {
      localStorage.setItem("projects", JSON.stringify(PROJECTS));
      return PROJECTS;
    }

    return JSON.parse(projects);
  }
}

export function getProject(id) {
  if (typeof window !== "undefined") {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const project = projects.find((project) => project.id == id);

    project.project_manager = project.project_manager.id;
    project.assigned_to = project.assigned_to.id;
    project.status = project.status.id;

    return project;
  }
}

export function addProject(project) {
  if (typeof window !== "undefined") {
    let projects = JSON.parse(localStorage.getItem("projects"));
    const date = new Date();

    project.created_at = formatDate(date);
    project.project_manager = getProjectManager(project.project_manager);
    project.assigned_to = getUser(project.assigned_to);
    project.status = getStatus(project.status);
    project.id = projects.length + 1;
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

export function getProjectByQuery(query) {
  if (typeof window !== "undefined") {
    let projects = JSON.parse(localStorage.getItem("projects"));

    if (!projects) projects = PROJECTS;

    if (!query) return projects;

    return projects.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export function deleteProject(id) {
  if (typeof window !== "undefined") {
    let projects = JSON.parse(localStorage.getItem("projects"));
    let filteredProjects = projects.filter((project) => project.id !== id);
    localStorage.setItem("projects", JSON.stringify(filteredProjects));
  }
}

export function updateProject(project) {
  if (typeof window !== "undefined") {
    let projects = JSON.parse(localStorage.getItem("projects"));
    let updatedProjects = projects.map((p) => {
      if (p.id === project.id) {
        project.project_manager = getProjectManager(project.project_manager);
        project.assigned_to = getUser(project.assigned_to);
        project.status = getStatus(project.status);

        return project;
      }
      return p;
    });
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }
}
