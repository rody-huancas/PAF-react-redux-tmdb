export const Footer = () => {
  return (
    <>
      <footer className="lg:pl-[340px] bg-[#232323] text-white flex flex-col xl:flex-row justify-center items-center gap-4 xl:gap-0 xl:justify-evenly w-full p-4">
        <div>
          <p className="text-gray-100 text-center md:text-left">
            &copy; 2023
            <span className="text-gray-100 font-bold"> Rody</span> Todos los
            derechos reservados.
          </p>
        </div>
        <div className="flex flex-col xl:flex-row items-center gap-2">
          <a
            href="https://github.com/rody-huancas/"
            target="_blank"
            className="text-gray-100 hover:text-gray-200 transition-colors hover:decoration-slice"
          >
            Ir a GitHub
          </a>
        </div>
      </footer>
    </>
  );
};
