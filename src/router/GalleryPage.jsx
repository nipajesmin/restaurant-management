import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import img1 from "../../public/img1 (1).jpg";
import img2 from "../../public/img1 (2).jpg";
import img3 from "../../public/img1 (3).jpg";
import img4 from "../../public/img1 (4).jpg";
import img5 from "../../public/img1 (5).jpg";
import img6 from "../../public/img1 (6).jpg";
import img7 from "../../public/img1 (7).jpg";
import img8 from "../../public/img1 (8).jpg";
import img9 from "../../public/img1 (9).jpg";
import img10 from "../../public/img1 (10).jpg";
import img12 from "../../public/img1 (12).jpg";
import img13 from "../../public/img1 (13).jpg";

const GalleryPage = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of images with names and sources
  const images = [
    { src: img1, alt: "Image 1" },
    { src: img2, alt: "Image 2" },
    { src: img3, alt: "Image 3" },
    { src: img4, alt: "Image 4" },
    { src: img5, alt: "Image 5" },
    { src: img6, alt: "Image 6" },
    { src: img7, alt: "Image 7" },
    { src: img8, alt: "Image 8" },
    { src: img9, alt: "Image 9" },
    { src: img10, alt: "Image 10" },
    { src: img12, alt: "Image 12" },
    { src: img13, alt: "Image 13" },
  ];

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Page Title */}
      <div className="bg-slate-400 py-10 text-center">
        <h1 className="text-white text-4xl font-bold">Gallery Page</h1>
        <p className="text-lg md:text-xl leading-relaxed p-12">
          Welcome to our restaurant’s gallery, where every snapshot reflects the essence of exceptional dining. Immerse yourself in a visual feast of our signature dishes, artfully prepared with the freshest ingredients and a passion for flavor. Experience the warmth of our inviting ambiance, the joy of shared moments, and the energy of our lively events. From elegantly plated meals to cozy dining spaces, our gallery brings to life the magic of every visit. Let these images inspire your next culinary adventure with us, where taste, elegance, and hospitality blend seamlessly.</p>
      </div>

      {/* Gallery Section */}
      <div className="container mx-auto mt-10 px-6 md:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>



      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={currentIndex}
      />
    </div>
  );
};

export default GalleryPage;