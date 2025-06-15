import React from "react";
import toast from "react-hot-toast";
const Shopfilter = ({
  filterOption,
  filterState,
  setFilterState,
  clearFilter,
}) => {
  return (
    <div className="space-y-5 bg-white p-4 rounded-lg shadow-lg">
      {/* Header with Clear Filter Button */}
      <div className="p-4 bg-gray-100 rounded-md shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        {/* Filter Title */}
        <h3 className="text-lg font-semibold text-gray-700 text-center sm:text-left">
          Filters
        </h3>

        {/* Clear Filter Button */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-200 w-full sm:w-auto"
          onClick={clearFilter}
        >
          Clear Filters
        </button>
      </div>

      {/* Search Input */}
      <div className="flex items-center space-x-2">
        <input
          value={filterState.searchInput}
          onChange={(e) =>
            setFilterState({ ...filterState, searchInput: e.target.value })
          }
          className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search products..."
        />
        {filterState.searchInput && (
          <button
            onClick={() => {
              toast.success("Search input cleared.");
              setFilterState({ ...filterState, searchInput: " " });
            }}
            className="text-gray-500 cursor-pointer hover:text-gray-700 transition"
          >
            ✖
          </button>
        )}
      </div>

      {/* Sorting Dropdown */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Sort By</label>
        <select
          className="border p-2 rounded-md w-full "
          value={filterState.sort}
          onChange={(e) => {
            toast.success(`sort selected: ${e.target.value}`);
            setFilterState({ ...filterState, sort: e.target.value });
          }}
        >
          <option value="Default">Select</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="ratingHighToLow">Rating: High to Low</option>
          <option value="nameAZ">A to Z</option>
          <option value="nameZA">Z to A</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Category</h4>
        <div className="flex flex-wrap gap-2">
          {filterOption.categories.map((cat) => (
            <label
              key={cat}
              className="capitalize cursor-pointer flex items-center space-x-2"
            >
              <input
                type="radio"
                value={cat}
                checked={filterState.categories === cat}
                onChange={(e) => {
                  toast.success(`Category selected: ${e.target.value}`);
                  setFilterState({
                    ...filterState,
                    categories: e.target.value,
                  });
                }}
                className="accent-blue-500"
              />
              <span className="text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {filterOption.priceRange.map((pric) => (
            <label
              key={pric.label}
              className="capitalize cursor-pointer flex items-center space-x-2"
            >
              <input
                type="radio"
                name="price"
                value={pric.label}
                checked={filterState.priceRange?.label === pric.label}
                onChange={() => {
                  toast.success(`Price Range selected: ${pric.label}`);
                  setFilterState({ ...filterState, priceRange: pric });
                }}
                className="accent-blue-500"
              />
              <span className="text-gray-700">{pric.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Brands</h4>

        {/* Scrollable Brands List */}
        <div className="max-h-48 overflow-y-auto border scrollbar-hide p-2 rounded-lg shadow-sm bg-gray-50">
          <div className="flex flex-col space-y-2">
            {filterOption.brands.map((brand) => (
              <label
                key={brand}
                className="capitalize cursor-pointer flex items-center space-x-2"
              >
                <input
                  type="radio"
                  value={brand}
                  checked={filterState.brands === brand}
                  onChange={(e) => {
                    toast.success(`Brand selected: ${e.target.value}`);
                    setFilterState({ ...filterState, brands: e.target.value });
                  }}
                  className="accent-green-500"
                />
                <span className="text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Colors Filter */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {filterOption.colors.map((color) => (
            <label
              key={color}
              className="capitalize cursor-pointer flex items-center space-x-2"
            >
              <input
                type="radio"
                value={color}
                checked={filterState.colors === color}
                onChange={(e) =>{
                  toast.success(`Color selected: ${e.target.value}`);
                  setFilterState({ ...filterState, colors: e.target.value })
                }}
                className="accent-red-500"
              />
              <span className="text-gray-700">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium">Ratings</h4>
        <div className="flex flex-wrap gap-2">
          {filterOption.ratings.map((rate) => (
            <label
              key={rate}
              className="cursor-pointer flex items-center space-x-2"
            >
              <input
                type="radio"
                value={rate}
                checked={filterState.ratings === rate}
                onChange={(e) =>{
                  toast.success(`Rating selected: ${e.target.value}`);
                  setFilterState({ ...filterState, ratings: e.target.value })
                }}
                className=""
              />
              <Ratingstar ratings={rate} />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shopfilter;
function Ratingstar({ ratings }) {
  const getStarColor = (ratings) => {
    if (ratings <= 2) return "text-red-500";
    if (ratings === 3) return "text-yellow-500";
    return "text-green-500";
  };

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i}>
        <i
          className={
            i < ratings
              ? `fa-solid fa-star ${getStarColor(ratings)} text-lg`
              : "fa-regular fa-star text-lg text-gray-400"
          }
        ></i>
        {/* <i className={`fa-star ${i < ratings ? `fa-solid ${getStarColor(ratings)}` : "fa-regular text-gray-400"} text-lg`}></i> */}
      </span>
    );
  }

  return <div>{stars}</div>;
}
