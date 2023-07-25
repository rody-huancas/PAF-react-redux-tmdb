import { Link } from "react-router-dom";
import { getImageUrl } from "../api/api";

export const MovieCard = ({ movie }) => {
  return (
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
          {movie.vote_average} <span className="text-yellow-500">★</span>
        </p>
        <p>{movie.release_date}</p>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 opacity-0 bg-black/50 transition-all duration-75">
        <Link
          to={`/detail/${movie.id}`}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Ver detalles
        </Link>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Ver trailer
        </button>
      </div>
    </div>
  );
};
