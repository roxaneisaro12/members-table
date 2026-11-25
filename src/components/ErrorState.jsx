function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-200 bg-white px-6 py-16 text-center">
      <div className="mb-4 text-5xl">⚠️</div>

      <h2 className="text-xl font-bold text-slate-800">
        Something went wrong
      </h2>

      <p className="mt-2 text-slate-500">
        {message || "Unable to load members. Please try again."}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorState;