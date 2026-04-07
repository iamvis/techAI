const ReviewCard = ({ review }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-4 text-4xl leading-none text-amber-400">“</div>
      <p className="text-slate-700">{review.comment}</p>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span>{review.name}</span>
        <span className="font-semibold text-slate-900">{review.rating} ★</span>
      </div>
    </div>
  );
};

export default ReviewCard;
