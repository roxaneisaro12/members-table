function EmptyState({ onClear }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
      <div className="mb-4 text-5xl">🔍</div>

      <h2 className="text-xl font-bold text-slate-800">
        No members found
      </h2>

      <p className="mt-2 text-slate-500">
        Try changing your search or filters.
      </p>

      <button
        onClick={onClear}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
      >
        Clear search and filters
      </button>
    </div>
  );
}

export default EmptyState;