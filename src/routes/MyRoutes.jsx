import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import {
  HomePage,
  FavoritesPage,
  DetailMoviePage,
  MoreMoviePage,
} from "../pages";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/more" element={<MoreMoviePage />} />
          <Route path="/detail/:id" element={<DetailMoviePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
