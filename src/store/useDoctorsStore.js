import { create } from "zustand";
import { getDoctors } from "../services/doctorsService";

const useDoctorsStore = create((set, get) => ({
  doctors: [],
  status: "idle", // idle | loading | success | error
  error: null,
  searchTerm: "",
  specialty: "All",

  fetchDoctors: async () => {
    set({ status: "loading", error: null });
    try {
      const doctors = await getDoctors();
      set({ doctors, status: "success" });
    } catch (err) {
      set({
        status: "error",
        error: "Could not load doctors. Please make sure the API server (json-server) is running.",
      });
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSpecialty: (specialty) => set({ specialty }),

  // Derived, filtered list based on search term + specialty
  getFilteredDoctors: () => {
    const { doctors, searchTerm, specialty } = get();
    return doctors.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
      const matchesSpecialty = specialty === "All" || doc.specialty === specialty;
      return matchesSearch && matchesSpecialty;
    });
  },
}));

export default useDoctorsStore;
