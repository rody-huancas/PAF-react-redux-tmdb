import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../api/api";
import { AiFillStar } from "react-icons/ai";

export const DetailMoviePage = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetailsById = async () => {
      try {
        const movieDetailsData = await fetchMovieDetails(id, "es-MX");
        setMovieDetails(movieDetailsData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchMovieDetailsById();
  }, [id]);

  if (!movieDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-center gap-10">
      <img
        src={getImageUrl(movieDetails.poster_path)}
        alt={movieDetails.title}
        className="w-1/3 h-4/5 rounded-2xl shadow-lg"
      />
      <div className="w-3/10 flex flex-col gap-10">
        <h3 className="text-[#eb6d6d] text-5xl font-extrabold">
          {movieDetails.title}
        </h3>
        <p className="text-lg text-justify">{movieDetails.overview}</p>

        <div className="flex flex-col gap-5 text-lg">
          <p>
            <strong className="text-xl text-red-500">Popularidad: </strong>
            {movieDetails.popularity}
          </p>
          <p>
            <strong className="text-xl text-red-500">Fecha de estreno: </strong>
            {movieDetails.release_date}
          </p>
          <p className="flex items-center gap-2">
            <strong className="text-xl text-red-500">Valoración: </strong>
            {movieDetails.vote_average}{" "}
            <AiFillStar className="text-yellow-500" />
          </p>
          <p>
            <strong className="text-xl text-red-500">Votos: </strong>
            {movieDetails.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
};