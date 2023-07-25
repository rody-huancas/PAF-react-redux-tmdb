import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../api/api";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchFavoriteMovies = async () => {
      const API_URL = "https://api.themoviedb.org/3/";
      const API_KEY = "4b33bcae448525d328a121527e3d878f";

      const favoriteMovies = await Promise.all(
        favoriteIds.map(async (id) => {
          const response = await fetch(
            `${API_URL}/movie/${id}?api_key=${API_KEY}`
          );
          return response.json();
        })
      );

      setFavorites(favoriteMovies);
    };

    fetchFavoriteMovies();
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-4 uppercase">
        Mis peli<span className="text-[#eb6d6d]">culas Favoritas</span>
      </h1>
      {favorites.length > 0 ? (
        <ul key={favorites.id} className="grid grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <li className="bg-gray-800 p-5 rounded-lg" key={fav.id}>
              <Link to={`/detail/${fav.id}`}>
                <div className="flex flex-col gap-5">
                  <img
                    src={getImageUrl(fav.poster_path)}
                    alt={fav.title}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                  <p className="text-center font-bold text-xl">{fav.title}</p>
                </div>
              </Link>
              <button
                onClick={() => removeFavorite(fav.id)}
                className="block mt-5 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Eliminar de Favoritos
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-orange-500 text-4xl font-extrabold text-center">
          Aún no has agregado ninguna película a favoritos.
        </p>
      )}
    </div>
  );
};
