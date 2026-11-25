
function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e2e8df] bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-[#f2f6f0]">
          <tr>
            {["Name", "Age", "Gender", "Email", "Phone", "Company", "Location"].map(
              (heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]"
                >
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="animate-pulse border-t border-[#edf0eb]">
              {Array.from({ length: 7 }).map((_, cell) => (
                <td key={cell} className="px-6 py-5">
                  <div className="h-4 rounded-full bg-[#e8f0e6]" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSkeleton;
