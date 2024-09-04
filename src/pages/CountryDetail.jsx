const CountryDetail = ({ pickedCountry }) => {
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
    if (pickedCountry.borders && pickedCountry.borders.length > 0) {
      // Fetch border countries details
      const fetchBorderCountries = async () => {
        const responses = await Promise.all(
          pickedCountry.borders.map((border) =>
            axios.get(`https://restcountries.com/v3.1/alpha/${border}`)
          )
        );
        setBorderCountries(
          responses.map((response) => response.data[0].name.common)
        );
      };

      fetchBorderCountries();
    }
  }, [pickedCountry.borders]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col bg-Lighter-gray h-screen p-16">
      <button
        className="flex justify-start items-center gap-2 rounded-lg border border-gray-200 w-fit px-6 py-1"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong />
        Back
      </button>
      {selectedCountry ? (
        <div className="grid md:grid-cols-2 gap-10 justify-between py-12">
          <div className="w-full">
            <img
              className="w-full h-full"
              src={selectedCountry.flags.png}
              alt={selectedCountry.name.common}
            />
          </div>
          <div className="w-full h-full grid grid-cols-2">
            <div>
              <p className="capitalize font-bold text-2xl pb-3">
                {selectedCountry.name.common}
              </p>
              <p className="font-semibold">
                Native Name:
                <span className="font-normal">
                  {selectedCountry.name.nativeName.eng.common}
                </span>
              </p>
              <p className="font-semibold">
                Population:
                <span className="font-normal">
                  {selectedCountry.population}
                </span>
              </p>
              <p className="font-semibold">
                Region:
                <span className="font-normal">{selectedCountry.region}</span>
              </p>
              <p className="font-semibold">
                Subregion:
                <span className="font-normal">{selectedCountry.subregion}</span>
              </p>
              <p className="font-semibold">
                Capital:
                <span className="font-normal">{selectedCountry.capital}</span>
              </p>
            </div>
            <div>
              <p className="font-semibold">
                Top Level Domain:
                <span className="font-normal">{selectedCountry.tld[0]}</span>
              </p>
              <p className="font-semibold">
                Currencies:
                <span className="font-normal">
                  {selectedCountry.currencies.SHP.name}
                </span>
              </p>
              <p className="font-semibold">
                Languages:
                <span className="font-normal">
                  {Object.values(selectedCountry.languages).join(", ")}
                </span>
              </p>
            </div>
            <p className="font-semibold">
              Border Countries:
              <span className="font-normal">
                {borderCountries.length > 0 ? (
                  <ul>
                    {borderCountries.map((country) => (
                      <li key={country}>{country}</li>
                    ))}
                  </ul>
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
