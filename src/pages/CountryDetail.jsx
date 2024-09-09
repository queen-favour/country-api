import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { getCountryById } from "../redux/countriesSlice";
import Loader from "../components/Loader";

const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [borderCountries, setBorderCountries] = useState([]);
  const { selectedCountry, loading, error } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCountry?.borders?.length > 0) {
      const fetchBorderCountries = async () => {
        try {
          const responses = await Promise.all(
            selectedCountry.borders.map((border) =>
              axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
            )
          );
          setBorderCountries(
            responses.map((response) => response.data[0]?.name?.common || "N/A")
          );
        } catch (error) {
          console.error("Failed to fetch border countries:", error);
        }
      };
      fetchBorderCountries();
    }
  }, [selectedCountry?.borders]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Something went wrong... {error}</div>;

  return (
    <div className="bg-Lighter-gray dark:bg-darker-blue1 dark:text-white min-h-screen px-6 sm:px-12 lg:px-16 py-8">
      <button
        className="flex  items-center gap-2 rounded-lg shadow-md dark:shadow-lg bg-white dark:bg-dark-blue px-6 py-2 mb-8"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong className="text-lg" />
        <span className="text-sm">Back</span>
      </button>
      {selectedCountry ? (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Flag Section */}
          <div className="w-full lg:w-1/2">
            <img
              className="w-full h-full object-cover rounded-md"
              src={selectedCountry.flags.png}
              alt={selectedCountry.name.common}
            />
          </div>
          {/* Details Section */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="">
              <h1 className="text-2xl font-extrabold pb-4">
                {selectedCountry.name.common}
              </h1>
              <p className="font-semibold">
                Native Name:
                <span className="font-normal">
                  {selectedCountry.name.nativeName
                    ? Object.values(selectedCountry.name.nativeName)[0].common
                    : "N/A"}
                </span>
              </p>
              <p className="font-semibold">
                Population:
                <span className="font-normal">
                  {selectedCountry.population.toLocaleString()}
                </span>
              </p>
              <p className="font-semibold">
                Region:
                <span className="font-normal">{selectedCountry.region}</span>
              </p>
              <p className="font-semibold">
                Sub Region:
                <span className="font-normal">{selectedCountry.subregion}</span>
              </p>
              <p className="font-semibold">
                Capital:
                <span className="font-normal">
                  {selectedCountry.capital?.join(", ") || "N/A"}
                </span>
              </p>
              <div className="pt-12 hidden sm:block">
                <p className="font-semibold">
                  Border Countries:
                  <span className="font-normal inline-block">
                    {borderCountries.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {borderCountries.map((country) => (
                          <span
                            key={country}
                            className="inline-block px-3 py-1 bg-white dark:bg-dark-blue dark:text-white shadow-md rounded-md text-sm"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div>No border countries found</div>
                    )}
                  </span>
                </p>
              </div>
            </div>
            <div className="">
              <p className="font-semibold">
                Top Level Domain:
                <span className="font-normal">{selectedCountry.tld[0]}</span>
              </p>
              <p className="font-semibold">
                Currencies:
                <span className="font-normal">
                  {selectedCountry.currencies
                    ? Object.values(selectedCountry.currencies)
                        .map((currency) => currency.name)
                        .join(", ")
                    : "N/A"}
                </span>
              </p>
              <p className="font-semibold">
                Languages:
                <span className="font-normal">
                  {Object.values(selectedCountry.languages || {}).join(", ")}
                </span>
              </p>
            </div>
          </div>

          <div className=" block lg:hidden">
            <p className="font-semibold">
              Border Countries:
              <span className="font-normal inline-block">
                {borderCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map((country) => (
                      <span
                        key={country}
                        className="inline-block px-3 py-1 bg-white dark:bg-dark-element shadow-md rounded-md text-sm"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div>No border countries found</div>
                )}
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CountryDetail;
