import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByRegion, setSearchQuery } from "../redux/countriesSlice";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const { region, searchQuery } = useSelector((state) => state.countries);

  const handleRegionChange = (e) => {
    dispatch(filterByRegion(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className=" justify-between flex py-3 ">
        <input
          className="p-4 pr-48 shadow-md dark:bg-dark-blue rounded-md"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by country name..."
        />

      <select
        className="p-4 shadow-md rounded-md dark:bg-dark-blue"
        value={region}
        onChange={handleRegionChange}
      >
        <option value="all" disabled hidden>Filter by Regions</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default SearchFilter;
