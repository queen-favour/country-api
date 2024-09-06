import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../redux/countriesSlice";
import SearchFilter from "../components/SearchFilter";
import { Link } from "react-router-dom";
import Card from "../components/Card";


const Home = () => {
  const dispatch = useDispatch();
  const { allCountries, region, searchQuery, loading, error } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  // Filter countries based on region and search query
  const filteredCountries = allCountries.filter((country) => {
    const matchesRegion = region === "all" || country.region === region;
    const matchesSearchQuery = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearchQuery;
  });

  if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full light:bg-Lighter-gray h-full md:p-8 p-2 dark:bg-darker-blue1 dark:text-white ">
      <div className="justify-between  flex flex-col px-10">
        <SearchFilter />
      </div>
      <div className="grid lg:grid-cols-4 w-full md:grid-cols-2 ">
        {filteredCountries.map((country) => (
          <Card 
          key={country.cca3}
          flag={country.flags.png}
          name={country.name.common}
          population={country.population}
          region={country.region}
          capital={country.capital}
          link={`/country/${country.cca3}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
