import api from "./axios";

export const fetchVacations = async (status) => {
  const query = status ? `?status=${status}` : "";
  const res = await api.get(`/vacations${query}`);
  return res.data;
};

export const getVacationsByUser = async (userId) => {
  const res = await api.get(`/vacations/user/${userId}`);
  return res.data;
};

export const createVacation = async (vacationData) => {
  const res = await api.post("/vacations", vacationData);
  return res.data;
};

export const updateVacationStatus = async (id, status, comments = "") => {
  const res = await api.patch(`/vacations/${id}/status`, { status, comments });
  return res.data;
};

export const getApprovedVacations = async () => {
  const res = await api.get("/vacations");
  return res.data.filter(v => v.status === "Approved");
};