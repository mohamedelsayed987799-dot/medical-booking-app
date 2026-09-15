import api from "./api";

// GET /doctors - all doctors
export const getDoctors = async () => {
  const { data } = await api.get("/doctors");
  return data;
};

// GET /doctors/:id - single doctor
export const getDoctorById = async (id) => {
  const { data } = await api.get(`/doctors/${id}`);
  return data;
};
