
function SortableHeader({ label, column, params, update }) {
  const isActive = params.sortBy === column;

  const nextOrder =
    isActive && params.order === "asc" ? "desc" : "asc";

  return (
    <th
      scope="col"
      aria-sort={
        isActive
          ? params.order === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]"
    >
      <button
        type="button"
        onClick={() =>
          update({
            sortBy: column,
            order: nextOrder,
          })
        }
        className="flex items-center gap-2 rounded-md transition hover:text-[#183d2b] focus:outline-none focus:ring-2 focus:ring-[#47745b] focus:ring-offset-2"
      >
        {label}

        <span
          aria-hidden="true"
          className={`text-base ${
            isActive ? "font-bold text-[#315d40]" : "text-[#9aaa9c]"
          }`}
        >
          {isActive
            ? params.order === "asc"
              ? "↑"
              : "↓"
            : "↕"}
        </span>
      </button>
    </th>
  );
}

export default SortableHeader;
