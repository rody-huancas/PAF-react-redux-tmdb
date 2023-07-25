import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { getImageUrl } from "../api/api";
import { BsLink45Deg, BsFillPlayCircleFill } from "react-icons/bs";
import { BiMessageSquareAdd } from "react-icons/bi";

export const MovieCard = ({ movie }) => {
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is already in favorites on component mount
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(movie.id));

    // Fetch the movie details and trailer when the component mounts
    fetchMovieTrailer(movie.id)
      .then((data) => {
        if (
          data.videos &&
          data.videos.results &&
          data.videos.results.length > 0
        ) {
          const trailer = data.videos.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
          setTrailer(trailer ? trailer : data.videos.results[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [movie.id]);

  const fetchMovieTrailer = async (id) => {
    const API_URL = "https://api.themoviedb.org/3/";
    const API_KEY = "4b33bcae448525d328a121527e3d878f";

    const response = await fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    return response.json();
  };

  const playTrailer = () => {
    setPlaying(true);
  };

  const closeTrailer = () => {
    setPlaying(false);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((id) => id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, movie.id])
      );
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="w-[270px] h-[450px] bg-[#141414] p-5 rounded-lg flex flex-col justify-between items-center gap-2 overflow-hidden relative">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full h-[300px] object-cover rounded-lg"
      />
      <h2 className="text-center font-bold">{movie.title}</h2>
      <div className="w-full flex justify-between">
        <p className="flex items-center gap-2">
          {movie.vote_average} <span className="text-yellow-500">★</span>
        </p>
        <p>{movie.release_date}</p>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 opacity-0 bg-black/50 transition-all duration-75">
        <Link
          to={`/detail/${movie.id}`}
          className="w-3/4 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          <BsLink45Deg />
          Ver detalles
        </Link>
        <button
          onClick={playTrailer}
          className="w-3/4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          <BsFillPlayCircleFill />
          Ver trailer
        </button>
        <button
          onClick={toggleFavorite}
          className={`w-3/4 flex items-center justify-center gap-2 px-4 py-2 ${
            isFavorite ? "bg-orange-700" : "bg-green-700"
          } text-white rounded-lg`}
        >
          <BiMessageSquareAdd />
          {isFavorite ? "Quitar de Favoritos" : "Agregar a Favoritos"}
        </button>
      </div>
      {playing && trailer && (
        <div className="contener_trailer absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/50">
          <YouTube
            videoId={trailer.key}
            className="w-[700px] h-[600px] object-cover rounded-lg"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
          <button
            onClick={closeTrailer}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cerrar trailer
          </button>
        </div>
      )}
    </div>
  );
};
