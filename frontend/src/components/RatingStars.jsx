const RatingStars = ({ rating = 0, showValue = true, size = "sm" }) => {
  const roundedRating = Math.round(Number(rating) || 0);
  const sizeClass =
    {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    }[size] || "text-sm";

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-0.5 ${sizeClass}`} aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} className={index < roundedRating ? "text-amber-500" : "text-slate-300"}>
            {"\u2605"}
          </span>
        ))}
      </div>
      {showValue ? <span className="text-sm font-semibold text-slate-700">{Number(rating).toFixed(1)}</span> : null}
    </div>
  );
};

export default RatingStars;
