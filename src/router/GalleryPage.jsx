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
        </div>
  
        {/* Gallery Section */}
        <div className="container mx-auto mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
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