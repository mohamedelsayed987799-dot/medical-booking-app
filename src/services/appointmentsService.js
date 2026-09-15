import api from "./api";

// GET /appointments - all appointments
export const getAppointments = async () => {
  const { data } = await api.get("/appointments");
  return data;
};

// POST /appointments - create a new appointment
export const createAppointment = async (appointment) => {
  const { data } = await api.post("/appointments", appointment);
  return data;
};

// PUT /appointments/:id - update / reschedule an appointment
export const updateAppointment = async (id, updates) => {
  const { data } = await api.put(`/appointments/${id}`, updates);
  return data;
};

// DELETE /appointments/:id - cancel an appointment
export const deleteAppointment = async (id) => {
  await api.delete(`/appointments/${id}`);
  return id;
};
