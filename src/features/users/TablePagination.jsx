
function TablePagination({
  page,
  pageSize,
  total,
  update,
  prefetchNext,
}) {
  const totalPages = Math.ceil(total / pageSize);

  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (page > 3) pages.push("...");

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);
  }

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const buttonStyle =
    "rounded-lg border border-[#dce5da] px-3 py-2 text-sm font-medium text-[#345b43] transition hover:bg-[#edf4eb] focus:outline-none focus:ring-2 focus:ring-[#47745b] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#e2e8df] bg-white p-4 shadow-[0_3px_15px_rgba(24,61,43,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <strong className="text-[#315d40]">{start}–{end}</strong>{" "}
        of <strong className="text-[#315d40]">{total}</strong> members
      </p>

      <nav
        aria-label="Table pagination"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          disabled={page === 1}
          onClick={() => update({ page: page - 1 })}
          className={buttonStyle}
        >
          Previous
        </button>

        {pages.map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="px-1 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={page === item ? "page" : undefined}
              onClick={() => update({ page: item })}
              onMouseEnter={() => {
                if (item === page + 1) prefetchNext();
              }}
              className={`rounded-lg border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#47745b] ${
                page === item
                  ? "border-[#28543a] bg-[#28543a] text-white shadow-sm"
                  : "border-[#dce5da] text-[#345b43] hover:bg-[#edf4eb]"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => update({ page: page + 1 })}
          onMouseEnter={() => {
            if (page < totalPages) prefetchNext();
          }}
          className={buttonStyle}
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default TablePagination;
