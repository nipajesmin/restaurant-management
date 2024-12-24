import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles (updated path)


import header from '../../../public/img1.jpg';

import header2 from '../../../public/img2.jpg';
import header3 from '../../../public/img3.jpg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="w-11/12 mx-auto">
            <div className="w-11/12 mx-auto">
                <div className="bg-gray-100 text-gray-900 p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto text-center mt-5">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Welcome to FeastFusion
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed mb-6">
                        Indulge in a culinary adventure at FeastFusion, where flavors from around the world come together to create unforgettable dining experiences. Whether you're craving a cozy family dinner, a romantic evening, or a festive celebration, our exquisite dishes and warm ambiance promise to delight every guest.
                    </p>
                    <h5 className="text-lg md:text-2xl font-semibold text-gray-700">
                        Savor the Taste of Perfection. Reserve Your Table Today.
                    </h5>
                    <Link
                        to="/allFood"
                        className="btn btn-primary text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg mt-3"
                    >
                        Reserve Now

                    </Link>
                </div>
            </div>



            <div className="pt-5">
                {/* Swiper Slider */}
                <Swiper
                    spaceBetween={50} // Space between slides
                    slidesPerView={1} // Number of slides to show at once
                    loop={true} // Infinite loop
                    autoplay={{ delay: 3000 }} // Autoplay with a delay of 3 seconds
                    pagination={{ clickable: true }} // Pagination bullets
                    navigation={{ clickable: true }} // Navigation arrows
                    className="swiper-container"
                >
                    <Swiper>
                        <SwiperSlide>
                            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src={header}
                                    className="w-full h-full object-cover"
                                    alt="Slide 1"
                                />
                            </div>
                        </SwiperSlide>

                        {/* Slide 2 */}
                        <SwiperSlide>
                            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src={header2}
                                    className="w-full h-full object-cover"
                                    alt="Slide 2"
                                />
                            </div>
                        </SwiperSlide>

                        {/* Slide 3 */}
                        <SwiperSlide>
                            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src={header3}
                                    className="w-full h-full object-cover"
                                    alt="Slide 3"
                                />
                            </div>
                        </SwiperSlide>

                        {/* Slide 4 */}
                        <SwiperSlide>
                            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                    src={header2}
                                    className="w-full h-full object-cover"
                                    alt="Slide 4"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </Swiper>
            </div>
        </div>
    );

};

export default Header;