import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";

export const Slider = ({ images, overview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="h-[700px] w-full m-auto relative mb-10 group">
      <div
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 grayscale"
      ></div>

      <div className="absolute left-40 bottom-10 flex items-center gap-10">
        <img
          src={`${images[currentIndex]}`}
          className="w-[400px] h-[550px] mx-auto rounded-lg hover:scale-110 transition-all duration-100"
          alt=""
        />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <button className="2xl:w-1/5 w-1/3 flex items-center gap-2 bg-red-600 px-5 py-3 rounded-xl uppercase font-medium text-lg hover:bg-red-900 transition-colors">
              <BsFillPlayCircleFill />
              Ver trailer
            </button>
            <button className="2xl:w-1/5 w-1/3 flex items-center gap-2 bg-blue-600 px-5 py-3 rounded-xl uppercase font-medium text-lg hover:bg-blue-900 transition-colors">
              <BiLinkExternal />
              Ver detalles
            </button>
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
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
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
