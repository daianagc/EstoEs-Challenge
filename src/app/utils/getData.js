import { PROJECT_MANAGERS } from "../mock/projectManagers";
import { USERS } from "../mock/users";
import { STATUSES } from "../mock/statuses";

export const getProjectManager = (id) =>
  PROJECT_MANAGERS.find((item) => item.id === id);

export const getUser = (id) => USERS.find((item) => item.id === id);

export const getStatus = (id) => STATUSES.find((item) => item.id === id);
