import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getImageUrl } from "../api/api";
import { actions } from "../features/dataSlice";
import { Slider } from "../components";
import { AiFillStar } from "react-icons/ai";

export const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.datos);
  const overview = useSelector((state) => state.data.overview);
  const [currentPage, setCurrentPage] = useState(1);
  const [movieImages, setMovieImages] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiData = await fetchData(currentPage, "en-US");
        dispatch(actions.actualizarDatos(apiData));

        const images = apiData.results.map((movie) =>
          getImageUrl(movie.poster_path)
        );

        shuffleArray(images);
        setMovieImages(images.slice(0, 5));
        dispatch(actions.setOverview(apiData?.results?.[0]?.overview || ""));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromAPI();
  }, [dispatch, currentPage]);

  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  return (
    <>
      <Slider images={movieImages} overview={overview} />
      <h2 className="text-gray-100 text-4xl font-bold capitalize mt-20 mb-10">
        Nuestras películas
      </h2>
      <div className="w-[100%] grid grid-cols-4 place-items-center mx-auto gap-5">
        {data?.results?.map((movie) => (
          <div
            key={movie.id}
            className="w-[270px] h-[450px] bg-[#141414] p-5 rounded-lg flex flex-col justify-between items-center gap-2 overflow-hidden relative"
          >
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <h2 className="text-center font-bold">{movie.title}</h2>
            <div className="w-full flex justify-between">
              <p className="flex items-center gap-2">
                {movie.vote_average} <AiFillStar className="text-yellow-500" />
              </p>
              <p>{movie.release_date}</p>
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 opacity-0 bg-black/50 transition-all duration-75">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Ver detalles
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Ver trailer
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={loadMoreMovies}>Cargar más películas</button>
    </>
  );
};
