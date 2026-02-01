

const DetailReview = ({review}) => {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{review.user}</span>
          <span className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</span>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < review.stars ? 'fill-current' : 'text-gray-300 fill-current'}`}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
    </div>
  )
}

export default DetailReview;