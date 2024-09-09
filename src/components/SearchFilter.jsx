import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByRegion, setSearchQuery } from "../redux/countriesSlice";
import { FaChevronDown } from "react-icons/fa"; // Importing a dropdown icon

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { region, searchQuery } = useSelector((state) => state.countries);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Array of regions, with Americas changed to display "America"
  const regions = [
    { displayName: "Africa", value: "Africa" },
    { displayName: "America", value: "Americas" }, // Display "America" but use "Americas" as the value
    { displayName: "Asia", value: "Asia" },
    { displayName: "Europe", value: "Europe" },
    { displayName: "Oceania", value: "Oceania" },
  ];

  // Find the selected region based on the region value from Redux store
  const selectedRegion = regions.find((r) => r.value === region);

  const handleRegionChange = (selectedRegionValue) => {
    dispatch(filterByRegion(selectedRegionValue));
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex flex-col gap-5 w-full lg:flex-row justify-between py-3">
      {/* Search Input */}
      <input
        className="p-4 pr-2 lg:pr-48 shadow-md dark:bg-dark-blue rounded-md"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by country name..."
      />

      {/* Custom Dropdown */}
      <div className="relative md:w-64">
        {" "}
        {/* Set a fixed width for the dropdown */}
        <button
          className="p-4 shadow-md rounded-md dark:bg-dark-blue flex justify-between items-center w-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>
            {selectedRegion ? selectedRegion.displayName : "Filter by Region"}
          </span>
          <FaChevronDown className="ml-2" /> {/* Dropdown icon */}
        </button>
        {isDropdownOpen && (
          <ul className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-dark-blue shadow-md rounded-md z-10">
            {regions.map(({ displayName, value }) => (
              <li
                key={value}
                onClick={() => handleRegionChange(value)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-dark-gray cursor-pointer"
              >
                {displayName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
