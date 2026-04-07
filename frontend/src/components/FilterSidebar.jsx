const FilterSidebar = ({ categories = [], filters, onChange }) => {
  return (
    <aside className="max-h-screen w-full space-y-8 overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:w-72">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Category</h4>

        <div className="space-y-2">
          <button
            onClick={() => onChange({ category: "" })}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
              !filters.category ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All styles
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onChange({ category: category.name })}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                filters.category === category.name ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Price</h4>

        <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
          <label className="flex flex-col">
            <span className="text-slate-500">Min</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(event) => onChange({ minPrice: event.target.value })}
              placeholder="0"
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-slate-900 focus:outline-none"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-slate-500">Max</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(event) => onChange({ maxPrice: event.target.value })}
              placeholder="500"
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 focus:border-slate-900 focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rating</h4>

        <div className="flex flex-wrap gap-2">
          {[4, 3, 2, 1].map((level) => (
            <button
              key={level}
              onClick={() => onChange({ rating: filters.rating === level ? "" : level })}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                filters.rating === level ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {level}{"\u2605"} & up
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          onChange({
            category: "",
            minPrice: "",
            maxPrice: "",
            rating: "",
            sort: "newest",
            search: "",
          })
        }
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
