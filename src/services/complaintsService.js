import api from "./api";

// POST /complaints - submit a new inquiry or complaint
export const createComplaint = async (complaint) => {
  const { data } = await api.post("/complaints", complaint);
  return data;
};
