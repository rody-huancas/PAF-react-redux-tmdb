import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../api/api";
import { actions } from "../features/dataSlice";
import { MovieCard } from "../components";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export const MoreMoviePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.datos);
  const [currentPage, setCurrentPage] = useState(1);

  window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => {
    fetchDataFromAPI();
  }, [currentPage]);

  const fetchDataFromAPI = async () => {
    try {
      const apiData = await fetchData(currentPage, "es-MX");
      dispatch(actions.actualizarDatos(apiData));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      const scrollOptions = {
        top: 0,
        behavior: "smooth",
      };
      window.scrollTo(scrollOptions);
    }
  };

  const goToNextPage = () => {
    if (data?.total_pages && currentPage < data.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
      const scrollOptions = {
        top: 0,
        behavior: "smooth",
      };
      window.scrollTo(scrollOptions);
    }
  };

  return (
    <>
      <div className="smooth-scroll">
        <h2 className="text-4xl font-bold capitalize mb-10">
          Nuestras <span className="text-[#eb6d6d]">películas</span>
        </h2>
        <div className="w-[100%] grid grid-cols-4 place-items-center mx-auto gap-5">
          {data?.results?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-3"
            style={{ display: currentPage === 1 ? "none" : "inline-block" }}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            onClick={goToNextPage}
            disabled={data?.total_pages && currentPage === data.total_pages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </>
  );
};
