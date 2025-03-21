import { useState, useEffect } from "react";
import { Link } from "wouter";
import { slides } from "@/data/slides";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto-rotate slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-primary overflow-hidden h-[450px] md:h-[600px]">
      {/* Main Slider */}
      <div className="h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full bg-cover bg-center transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? "opacity-100 z-10 scale-100" 
                : "opacity-0 z-0 scale-105"
            }`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-black/40"></div>
            <div className="container mx-auto px-4 h-full flex items-center relative">
              <div className="max-w-2xl text-white relative z-10 animate-fadeIn">
                <div className="w-20 h-1 bg-[#F7941D] mb-6 rounded-full"></div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-md">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow">{slide.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={slide.buttonLink}
                    className="bg-[#F7941D] hover:bg-[#F7941D]/90 text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {slide.buttonText}
                    <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link
                    href="/news"
                    className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-3 px-8 rounded-md inline-flex items-center transition-all duration-300"
                  >
                    Berita Terkini
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-primary/30 to-transparent"></div>
            <div className="absolute -bottom-10 right-0 w-72 h-72 bg-[#F7941D]/20 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
          </div>
        ))}
      </div>
      
      {/* Slider Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
              index === currentSlide 
                ? "bg-[#F7941D] w-10" 
                : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none transition-all duration-300 z-20 border border-white/30"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none transition-all duration-300 z-20 border border-white/30"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </section>
  );
};

export default HeroSlider;
