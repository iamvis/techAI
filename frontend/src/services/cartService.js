import api from "./api";

export const getCart = async () => {
  const response = await api.get("/api/cart");
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await api.post("/api/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async (id, quantity) => {
  const response = await api.put(`/api/cart/${id}`, { quantity });
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await api.delete(`/api/cart/${id}`);
  return response.data;
};
