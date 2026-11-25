
import SortableHeader from "./SortableHeader";

function UsersTable({ users, params, update }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e2e8df] bg-white shadow-[0_3px_15px_rgba(24,61,43,0.04)]">
      <table className="min-w-full divide-y divide-[#edf0eb] text-sm">
        <thead className="bg-[#f2f6f0]">
          <tr>
            <SortableHeader label="Name" column="firstName" params={params} update={update} />
            <SortableHeader label="Age" column="age" params={params} update={update} />

            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]">
              Gender
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]">
              Email
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]">
              Phone
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]">
              Company
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#52705b]">
              Location
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-[#edf0eb]">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors duration-150 hover:bg-[#f7faf6]">
              <td className="whitespace-nowrap px-6 py-4 font-semibold text-[#254b33]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e8f0e6] text-xs font-bold uppercase text-[#47745b]">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
              </td>

              <td className="px-6 py-4 text-slate-600">{user.age}</td>

              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    user.gender === "female"
                      ? "bg-[#e6f0df] text-[#527a3e]"
                      : "bg-[#b9d2bd] text-[#28543a]"
                  }`}
                >
                  {user.gender}
                </span>
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-slate-600">{user.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-slate-600">{user.phone}</td>
              <td className="px-6 py-4 text-slate-600">{user.company?.name || "N/A"}</td>
              <td className="px-6 py-4 text-slate-600">{user.address?.city || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
