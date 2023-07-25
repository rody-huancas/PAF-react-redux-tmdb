import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { fetchData, fetchMovieDetails, getImageUrl } from "../api/api";
import { Link } from "react-router-dom";

const SLIDE_DURATION = 5000;

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [overview, setOverview] = useState("");

  const fetchDataFromAPI = useCallback(async () => {
    try {
      const apiData = await fetchData(1, "en-US");
      const first7Movies = apiData.results.slice(0, 7);
      setMovies(first7Movies);
      setOverview(first7Movies?.[0]?.overview || "");
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchDataFromAPI();
  }, [fetchDataFromAPI]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [movies.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const currentMovie = movies[currentIndex] || {};

  return (
    <div className="h-[700px] w-full m-auto relative mb-10 group">
      <div
        style={{
          backgroundImage: `url(${getImageUrl(currentMovie.poster_path)})`,
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 grayscale"
      ></div>

      <div className="absolute left-40 bottom-10 flex items-center gap-10">
        <img
          src={`${getImageUrl(currentMovie.poster_path)}`}
          className="w-[400px] h-[550px] mx-auto rounded-lg hover:scale-110 transition-all duration-100"
          alt=""
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <button className="2xl:w-1/5 w-1/3 flex items-center gap-2 bg-red-600 px-5 py-3 rounded-xl uppercase font-medium text-lg hover:bg-red-900 transition-colors">
              <BsFillPlayCircleFill />
              Ver trailer
            </button>
            <Link
              to={`/detail/${currentMovie.id}`}
              className="2xl:w-1/5 w-1/3 flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl uppercase font-medium text-lg hover:bg-blue-900 transition-colors"
            >
              <BiLinkExternal />
              Ver detalles
            </Link>
          </div>
          <p className="w-10/12 bg-gray-900 p-2 rounded-lg text-gray-100 ">
            {overview}
          </p>
        </div>
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-white text-black cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {movies.map((movie, slideIndex) => (
          <div
            key={movie.id}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};
