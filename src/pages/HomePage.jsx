import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getImageUrl } from "../api/api";
import { actions } from "../features/dataSlice";

export const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.datos);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiData = await fetchData(currentPage, "en-US");
        dispatch(actions.actualizarDatos(apiData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [dispatch, currentPage]);

  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h1>Listado de películas</h1>
      {data?.results?.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <img
            width={"100px"}
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
          />
        </div>
      ))}
      <button onClick={loadMoreMovies}>Cargar más películas</button>
    </>
  );
};
