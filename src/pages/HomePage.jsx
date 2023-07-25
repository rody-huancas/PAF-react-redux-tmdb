import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getImageUrl } from "../api/api";
import { actions } from "../features/dataSlice";
import { Slider } from "../components";
import { MovieCard } from "../components/MovieCard";

export const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.datos);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiData = await fetchData(currentPage, "en-US");
        dispatch(actions.actualizarDatos(apiData));

        const images = [...apiData.results].map((movie) =>
          getImageUrl(movie.poster_path)
        );

        for (let i = images.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [images[i], images[j]] = [images[j], images[i]];
        }

        dispatch(actions.setOverview(apiData?.results?.[0]?.overview || ""));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDataFromAPI();
  }, [dispatch, currentPage]);

  return (
    <>
      <Slider />
      <h2 className="text-gray-100 text-4xl font-bold capitalize mt-20 mb-10">
        Nuestras películas
      </h2>
      <div className="w-[100%] grid grid-cols-4 place-items-center mx-auto gap-5">
        {data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
