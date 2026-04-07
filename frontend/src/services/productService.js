import api from "./api";

export const fetchProducts = async (params) => {
  const response = await api.get("/api/products", { params });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get("/api/categories");
  return response.data;
};

export const subscribeNewsletter = async (email) => {
  const response = await api.post("/api/newsletter", { email });
  return response.data;
};
