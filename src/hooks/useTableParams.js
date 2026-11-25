import { useState, useEffect } from "react";

function readParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    page: Math.max(1, Number(params.get("page")) || 1),
    pageSize: [10, 20, 50].includes(Number(params.get("pageSize")))
      ? Number(params.get("pageSize"))
      : 10,
    sortBy: params.get("sortBy") || "",
    order: params.get("order") || "asc",
    q: params.get("q") || "",
    gender: params.get("gender") || "",
  };
}

export function useTableParams() {
  const [params, setParams] = useState(readParams);

  useEffect(() => {
    function handlePopState() {
      setParams(readParams());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function update(changes) {
    setParams((current) => {
      const isPageChange = Object.keys(changes).every(
        (key) => key === "page"
      );

      const next = {
        ...current,
        ...changes,
        ...(isPageChange ? {} : { page: 1 }),
      };

      const searchParams = new URLSearchParams();

      if (next.page !== 1) searchParams.set("page", next.page);
      if (next.pageSize !== 10)
        searchParams.set("pageSize", next.pageSize);
      if (next.sortBy) searchParams.set("sortBy", next.sortBy);
      if (next.order !== "asc") searchParams.set("order", next.order);
      if (next.q) searchParams.set("q", next.q);
      if (next.gender) searchParams.set("gender", next.gender);

      const queryString = searchParams.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.pushState(null, "", newUrl);

      return next;
    });
  }

  return { params, update };
}