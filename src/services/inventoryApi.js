const API = "http://localhost:3000";

export const getInventory = () =>
  fetch(`${API}/inventory`).then((r) => r.json());

export const getItem = (id) =>
  fetch(`${API}/inventory/${id}`).then((r) => r.json());

export const createItem = (formData) =>
  fetch(`${API}/register`, {
    method: "POST",
    body: formData,
  });

export const updateItem = (id, data) =>
  fetch(`${API}/inventory/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updatePhoto = (id, formData) =>
  fetch(`${API}/inventory/${id}/photo`, {
    method: "PUT",
    body: formData,
  });

export const deleteItem = (id) =>
  fetch(`${API}/inventory/${id}`, {
    method: "DELETE",
  });
