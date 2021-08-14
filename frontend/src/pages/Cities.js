import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import SearchSection from "../components/SearchSection";
import FetchError from "../components/FetchError";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  showCloseButton: true,
});

const Cities = (props) => {
  const [citiesData, setCitiesData] = useState([]);
  const [renderedCities, setRenderedCities] = useState([]);
  const searchInput = useRef("");
  const [loading, setLoading] = useState(true);
  const [fetchOk, setFetchOk] = useState(null);

  const handleSearch = () => {
    const searchedCity = searchInput.current.value.toLowerCase().trim();
    setRenderedCities(
      searchedCity
        ? citiesData.filter((city) =>
            city.name.toLowerCase().startsWith(searchedCity)
          )
        : citiesData
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:4000/api/cities")
      .then((res) => {
        if (res.data.success) {
          // Controller did communicate with the database.
          setRenderedCities(res.data.response);
          setCitiesData(res.data.response);
          setFetchOk(true);
        } else {
          throw new Error("We lost connection with the database.");
        }
      })
      .catch((err) => {
        // No pudimos comunicarnos con el backend.
        setFetchOk(false);
        const e = err.message || "Server stops responding.";
        console.error(e);
        Toast.fire({
          title: "Something went wrong.",
          icon: "error",
          text: e,
        }).then(() => props.history.push("/"));
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading />;
  if (!fetchOk) return <FetchError />;
  if (!citiesData.length) return <NoCitiesFounded />;
  return (
    <main className="transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow">
      <SearchSection handleSearch={handleSearch} searchInput={searchInput} />
      <section className="flex flex-wrap gap-3 justify-center py-5 px-2 xs:px-10 md:px-20">
        {renderedCities.length === 0 ? (
          <h1 className="text-center text-3xl text-gray-900 dark:text-gray-100">
            No cities matching selected criteria.
          </h1>
        ) : (
          renderedCities.map((city, index) => (
            <div
              key={city._id}
              className={`rounded flex-grow transform hover:scale-102 relative inline-block w-full sm:w-4/5 md:w-${
                index % 3 === 0 ? "full" : "1/4"
              } h-40 xs:h-64`}
              style={{
                backgroundImage: `url("${city.src}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Link to={`/itineraries/${city._id}`}>
                <div className="opacity-50 md:opacity-0 md:hover:opacity-40 sm:hover:opacity-40 flex flex-col items-center justify-center absolute bg-black w-full h-full">
                  <p className="uppercase font-semibold text-white text-center text-2xl md:text-4xl">
                    {city.name}
                  </p>
                  <p className="uppercase font-medium text-white text-center text-md md:text-lg">
                    {city.country}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

const NoCitiesFounded = () => {
  return (
    <main className="flex-col gap-3 transition duration-1000 bg-gray-100 dark:bg-gray-900 flex-grow flex items-center justify-center">
      <h1 className="text-center text-3xl text-gray-900 dark:text-gray-100">
        There are no cities in the database yet.
      </h1>
      <p className="text-center text-gray-900 dark:text-gray-100">
        Do you want to
        <Link className="font-medium mx-1 text-green-500" to="/form/add">
          add
        </Link>
        some cities?
      </p>
    </main>
  );
};

export default Cities;
