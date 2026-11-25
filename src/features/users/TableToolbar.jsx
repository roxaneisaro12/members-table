
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

function TableToolbar({ params, update, total }) {
  const [search, setSearch] = useState(params.q);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (debouncedSearch !== params.q) {
      update({ q: debouncedSearch, gender: "" });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearch(params.q);
  }, [params.q]);

  function handleGenderChange(event) {
    const gender = event.target.value;
    setSearch("");
    update({ gender, q: "" });
  }

  function handlePageSizeChange(event) {
    update({ pageSize: Number(event.target.value) });
  }

  return (
    <section className="mb-6 rounded-2xl border border-[#e2e8df] bg-white p-4 shadow-[0_3px_15px_rgba(24,61,43,0.04)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-4 top-3.5 text-[#78917e]">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search members..."
              aria-label="Search members"
              className="w-full rounded-xl border border-[#dce5da] bg-[#fafbf9] py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#47745b] focus:bg-white focus:ring-2 focus:ring-[#47745b]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-slate-400 transition hover:text-red-500"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={params.gender}
            onChange={handleGenderChange}
            className="w-full rounded-xl border border-[#dce5da] bg-[#fafbf9] px-4 py-3 text-sm text-[#345b43] outline-none transition focus:border-[#47745b] focus:ring-2 focus:ring-[#47745b]/10 sm:w-auto"
            aria-label="Filter by gender"
          >
            <option value="">All genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="pageSize" className="text-sm text-slate-500">
            Rows per page:
          </label>

          <select
            id="pageSize"
            value={params.pageSize}
            onChange={handlePageSizeChange}
            className="rounded-xl border border-[#dce5da] bg-[#fafbf9] px-3 py-3 text-sm text-[#345b43] outline-none focus:border-[#47745b]"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-[#edf0eb] pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-slate-500">
          Showing{" "}
          <span className="font-semibold text-[#315d40]">{total}</span>{" "}
          members found
          {params.q && ` for "${params.q}"`}
          {params.gender && ` (${params.gender})`}
        </p>

        <p className="text-xs text-[#8b9b8e]">
          Search updates automatically after 400ms
        </p>
      </div>
    </section>
  );
}

export default TableToolbar;
