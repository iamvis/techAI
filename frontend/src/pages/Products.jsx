import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import ProductCard from "../components/ProductCard";
import { fetchCategories } from "../services/productService";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const createFiltersFromParams = () => ({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    rating: searchParams.has("rating") ? Number(searchParams.get("rating")) : "",
    sort: searchParams.get("sort") || "newest",
    page: searchParams.has("page") ? Number(searchParams.get("page")) : 1,
    search: searchParams.get("search") || "",
  });

  const [filters, setFilters] = useState(createFiltersFromParams());
  const [searchInput, setSearchInput] = useState(createFiltersFromParams().search);

  const { products, page, totalPages, total, loading, error } = useProducts(filters);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const params = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    setSearchParams(params);
  }, [filters, setSearchParams]);

  useEffect(() => {
    const nextFilters = createFiltersFromParams();
    const hasChanged =
      nextFilters.category !== filters.category ||
      nextFilters.minPrice !== filters.minPrice ||
      nextFilters.maxPrice !== filters.maxPrice ||
      nextFilters.rating !== filters.rating ||
      nextFilters.sort !== filters.sort ||
      nextFilters.page !== filters.page ||
      nextFilters.search !== filters.search;

    if (hasChanged) {
      setFilters(nextFilters);
    }

    setSearchInput(nextFilters.search);
  }, [searchParams]);

  const handleFilterChange = (updates) => {
    setFilters((current) => ({
      ...current,
      ...updates,
      page: updates.page || 1,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setFilters((current) => ({ ...current, search: searchInput.trim(), page: 1 }));
  };

  const paginationItems = useMemo(() => Array.from({ length: totalPages }, (_, index) => index + 1), [totalPages]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Shop</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">All Products</h1>
          <p className="mt-2 text-slate-600">Discover the latest styles, select your favorites and add them to the cart.</p>
        </div>
        <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center gap-3 md:w-auto">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search products"
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 focus:border-slate-900 focus:outline-none"
          />
          <button className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <FilterSidebar categories={categories} filters={filters} onChange={handleFilterChange} />
        <section className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SortDropdown sort={filters.sort} onChange={(value) => handleFilterChange({ sort: value })} />
            <p className="text-sm text-slate-500">
              {total} product{total === 1 ? "" : "s"} found
            </p>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 xl:hidden"
            >
              Filters
            </button>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              Loading products...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
              No products matched this search. Try a different keyword or clear the filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {paginationItems.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handleFilterChange({ page: pageNumber })}
                  className={`rounded-3xl px-4 py-3 text-sm ${pageNumber === Number(page) ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          ) : null}
        </section>
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="fixed inset-0 bg-slate-900/50" onClick={() => setIsFilterOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600">
                X
              </button>
            </div>
            <div className="p-6">
              <FilterSidebar
                categories={categories}
                filters={filters}
                onChange={(updates) => {
                  handleFilterChange(updates);
                  setIsFilterOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Products;
