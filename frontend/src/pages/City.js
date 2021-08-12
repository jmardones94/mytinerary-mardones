import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchError from "../components/FetchError";
import Loading from "../components/Loading";

export default function City({ id }) {
  const [city, setCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchOk, setFetchOk] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`http://localhost:4000/api/city/${id}`)
      .then((res) => {
        setCity(res.data.response);
        setFetchOk(true);
      })
      .catch((err) => setFetchOk(false))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <Loading />;
  if (!fetchOk) return <FetchError />;
  return (
    <main className="px-5 flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-900 bg-gray-100">
      <div
        className="h-56 md:h-96 rounded shadow-3xl"
        style={{
          backgroundImage: `url("${city.src}")`,
          backgroundPositionY: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <h1 className="p-5 tracking-wide font-semibold text-xl md:text-3xl text-center uppercase dark:text-gray-200">
        {city.name}{" "}
        <span className="tracking-wider normal-case font-silt">
          MyTineraries
        </span>
      </h1>
      <p className="text-center text-gray-900 dark:text-gray-100 mt-5">
        Site under construction
      </p>

      <Link className="flex w-full justify-center m-3" to="/cities">
        <button className="text-center text-gray-900 dark:text-gray-100 px-3 py-2 bg-red-500 rounded">
          Back to Cities
        </button>
      </Link>
    </main>
  );
}
