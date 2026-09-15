import { create } from "zustand";
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentsService";

const useAppointmentsStore = create((set, get) => ({
  appointments: [],
  status: "idle", // idle | loading | success | error
  error: null,

  fetchAppointments: async () => {
    set({ status: "loading", error: null });
    try {
      const appointments = await getAppointments();
      set({ appointments, status: "success" });
    } catch (err) {
      set({
        status: "error",
        error: "Could not load appointments. Please make sure the API server (json-server) is running.",
      });
    }
  },

  addAppointment: async (appointment) => {
    const created = await createAppointment(appointment);
    set({ appointments: [...get().appointments, created] });
    return created;
  },

  editAppointment: async (id, updates) => {
    const updated = await updateAppointment(id, updates);
    set({
      appointments: get().appointments.map((a) => (a.id === id ? updated : a)),
    });
    return updated;
  },

  removeAppointment: async (id) => {
    await deleteAppointment(id);
    set({ appointments: get().appointments.filter((a) => a.id !== id) });
  },
}));

export default useAppointmentsStore;
