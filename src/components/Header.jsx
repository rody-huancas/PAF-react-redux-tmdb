import { useState } from "react";
import {
  RiHome3Line,
  RiLayoutGridLine,
  RiMenu3Fill,
  RiCloseLine,
  RiSearchLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="bg-[#141414]">
        <div
          className={`fixed top-0 w-80 h-full overflow-y-hidden border-r border-gray-800 p-8 flex flex-col justify-between bg-[#141414] transition-all lg:left-0 z-50 ${
            showMenu ? "left-0" : "-left-full"
          }`}
        >
          <div>
            <Link
              to={"/"}
              className="text-gray-300 uppercase font-extrabold text-2xl tracking-[5px] mb-10"
            >
              MIS <span className="text-[#eb6d6d]">PELICULAS</span>
            </Link>
            <ul className="mt-5">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 flex items-center gap-4 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors"
                >
                  <RiHome3Line />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-300 flex items-center gap-4 hover:bg-[#232323] py-3 px-4 rounded-xl transition-colors"
                >
                  <RiLayoutGridLine />
                  Mis Favoritos
                </Link>
              </li>
            </ul>
          </div>
          {/* BOTON PARA MOBIL */}
          <button
            onClick={toggleMenu}
            className="lg:hidden bg-blue-600 text-white fixed bottom-8 right-6 p-2 text-lg rounded-full z-50"
          >
            {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </div>

        {/* HEADER */}
        <header className="fixed lg:pl-[340px] w-full flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-[#141414] z-40">
          <form className="relative w-full xl:w-1/3 flex items-center gap-5">
            <RiSearchLine className="text-gray-500 absolute top-3 left-2" />
            <input
              type="text"
              className="bg-[#232323] outline-none text-gray-300 py-2 pl-8 pr-4 rounded-2xl w-full"
              placeholder="Buscar Película"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-1.5 px-5 rounded-2xl hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </header>
        {/* FIN HEADER */}
      </div>
    </>
  );
};
