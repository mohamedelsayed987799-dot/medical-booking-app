import { useEffect, useMemo, useState } from "react";
import useDoctorsStore from "../store/useDoctorsStore";
import useDebounce from "../hooks/useDebounce";
import DoctorCard from "../components/DoctorCard";
import SearchBar from "../components/SearchBar";
import FilterChips from "../components/FilterChips";
import Pagination from "../components/Pagination";
import { DoctorGridSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";

const PAGE_SIZE = 6;

export default function Doctors() {
  const { doctors, status, error, fetchDoctors } = useDoctorsStore();
  const [searchInput, setSearchInput] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput, 350);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, specialty]);

  const specialties = useMemo(() => {
    const unique = Array.from(new Set(doctors.map((d) => d.specialty)));
    return ["All", ...unique];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSearch = doc.name
        .toLowerCase()
        .includes(debouncedSearch.trim().toLowerCase());
      const matchesSpecialty = specialty === "All" || doc.specialty === specialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, debouncedSearch, specialty]);

  const totalPages = Math.max(1, Math.ceil(filteredDoctors.length / PAGE_SIZE));
  const paginatedDoctors = filteredDoctors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-semibold text-heading dark:text-white mb-2">
        Find a Doctor
      </h1>
      <p className="text-muted text-sm mb-6">
        Search by name or filter by specialty to find the right specialist.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-80">
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>
        <FilterChips
          options={specialties}
          active={specialty}
          onSelect={setSpecialty}
        />
      </div>

      {status === "loading" && <DoctorGridSkeleton />}
      {status === "error" && <ErrorMessage message={error} onRetry={fetchDoctors} />}

      {status === "success" && filteredDoctors.length === 0 && (
        <EmptyState
          icon="🔍"
          title="No doctors found"
          description="Try a different search term or reset the specialty filter."
        />
      )}

      {status === "success" && filteredDoctors.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
