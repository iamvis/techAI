import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

const useProducts = (params) => {
  const [state, setState] = useState({
    products: [],
    page: 1,
    totalPages: 1,
    total: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const getProducts = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const data = await fetchProducts(params);
        if (!mounted) return;
        setState({
          products: data.products,
          page: data.page,
          totalPages: data.totalPages,
          total: data.total,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!mounted) return;
        setState((prev) => ({ ...prev, loading: false, error: error.message || "Unable to load products" }));
      }
    };

    getProducts();

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(params)]);

  return state;
};

export default useProducts;
