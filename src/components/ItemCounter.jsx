const ItemCounter = ({
  max,
  min=1,
  setCount,
  count,
  buttonTitle,
  handleButtonTitle,
}) => {

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > min) {
      setCount(count - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;

    if (value >= min && value <= max) {
      setCount(value);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center border border-gray-300 rounded-md w-fit">
        <button
          onClick={decrement}
          disabled={count <= min}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          type="button"
        >
          -
        </button>
        <input
          type="number"
          value={count}
          onChange={handleChange}
          className="w-12 text-center border-x border-gray-300 py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min={min}
          max={max}
        />
        <button
          onClick={increment}
          disabled={count >= max}
          className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          type="button"
        >
          +
        </button>
      </div>
      {buttonTitle && (
        <button
          onClick={handleButtonTitle}
          disabled={max === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium cursor-pointer"
        >
          {buttonTitle}
        </button>
      )}
    </div>
  );
};

export default ItemCounter;
