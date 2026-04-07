import axiosInstance from "./axios";

export const getCart = async () => {
  const response = await axiosInstance.get("/api/cart");
  return response.data;
};

export const addToCart = async (productId, quantity) => {
  const response = await axiosInstance.post("/api/cart", { productId, quantity });
  return response.data;
};

export const updateCartItem = async (id, quantity) => {
  const response = await axiosInstance.put(`/api/cart/${id}`, { quantity });
  return response.data;
};

export const removeCartItem = async (id) => {
  const response = await axiosInstance.delete(`/api/cart/${id}`);
  return response.data;
};
