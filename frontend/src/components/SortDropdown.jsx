const SortDropdown = ({ sort, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h4 className="text-sm font-semibold text-slate-900">Sort by</h4>
        <p className="text-sm text-slate-500">Choose a product order</p>
      </div>
      <select
        value={sort}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-slate-900 focus:outline-none"
      >
        <option value="newest">Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortDropdown;
