
import { useQueryClient } from "@tanstack/react-query";

import UsersTable from "./features/users/UsersTable";
import TableToolbar from "./features/users/TableToolbar";
import TablePagination from "./features/users/TablePagination";
import TableSkeleton from "./features/users/TableSkeleton";

import EmptyState from "./components/EmptyState";
import ErrorState from "./components/ErrorState";

import { useTableParams } from "./hooks/useTableParams";
import { useUsers, userKeys } from "./features/users/queries";
import { fetchUsers } from "./api/users";

function App() {
  const { params, update } = useTableParams();
  const queryClient = useQueryClient();

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
    isPlaceholderData,
  } = useUsers(params);

  const prefetchNext = () => {
    if (!data || params.page >= Math.ceil(data.total / params.pageSize)) {
      return;
    }

    const nextParams = {
      ...params,
      page: params.page + 1,
    };

    queryClient.prefetchQuery({
      queryKey: userKeys.list(nextParams),
      queryFn: () => fetchUsers(nextParams),
      staleTime: 1000 * 60 * 5,
    });
  };

  function clearFilters() {
    update({ page: 1, q: "", gender: "" });
  }

  return (
    <main className="min-h-screen bg-[#f7f8f4] px-3 py-8 text-slate-800 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-[#e2e8df] pb-6">
          

          <h1 className="text-3xl font-bold tracking-tight text-[#183d2b] sm:text-4xl">
            Abanyamuryango
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Members Directory
          </p>
        </header>

        <TableToolbar
          params={params}
          update={update}
          total={data?.total || 0}
        />

        {isFetching && !isPending && (
          <p className="mb-3 text-sm font-medium text-[#47745b]" role="status">
            Updating members...
          </p>
        )}

        {isPending && <TableSkeleton />}

        {isError && (
          <ErrorState message={error.message} onRetry={() => refetch()} />
        )}

        {data && !isError && (
          <>
            {data.users.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <>
                <div className={isPlaceholderData ? "opacity-50" : ""}>
                  <UsersTable
                    users={data.users}
                    params={params}
                    update={update}
                  />
                </div>

                <TablePagination
                  page={params.page}
                  pageSize={params.pageSize}
                  total={data.total}
                  update={update}
                  prefetchNext={prefetchNext}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
