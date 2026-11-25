import { apiFetch } from "./client";

const FIELDS =
  "firstName,lastName,email,phone,age,gender,company,address";

export async function fetchUsers({
  page,
  pageSize,
  sortBy,
  order,
  q,
  gender,
}) {
  const skip = (page - 1) * pageSize;

  const params = new URLSearchParams({
    limit: String(pageSize),
    skip: String(skip),
    select: FIELDS,
  });

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  let endpoint;

  if (q) {
    endpoint = `/users/search?q=${encodeURIComponent(q)}&${params}`;
  } else if (gender) {
    endpoint = `/users/filter?key=gender&value=${encodeURIComponent(gender)}&${params}`;
  } else {
    endpoint = `/users?${params}`;
  }

  return apiFetch(endpoint);
}