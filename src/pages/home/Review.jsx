import React from 'react';
import pic1 from '../../../public/pic1.png'
import pic3 from '../../../public/pic3.png'
import pic4 from '../../../public/pic4.png'
import pic2 from '../../../public/pic2.png'
import pic5 from '../../../public/pic5.png'
import pic6 from '../../../public/pic6.png'

const Review = () => {
    return (
        <section className="w-11/12 mx-auto mt-5 py-16">
            <div className="container mx-auto">
                {/* Header */}
                <h2 className="text-4xl font-extrabold text-center text-black mb-10">
                    What Our Customers Say
                </h2>
                <p className="text-center text-gray-600 text-lg mb-10">
                    Here’s what our customers have to say about their experience with our sports equipment.
                </p>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Review 1 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic1}
                            alt="Sharmin"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Sharmin</h3>
                        <p className="text-gray-600 mt-4">
                        The food was absolutely delicious! The honey-glazed chicken wings were perfectly cooked, and the presentation was stunning. Highly recommended!
                        </p>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic2}
                            alt="Ahmed"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Ahmed</h3>
                        <p className="text-gray-600 mt-4">
                        The seafood platter was fresh and flavorful. The service was quick, and the staff was friendly. This is now my favorite restaurant in town!
                        </p>
                    </div>

                    {/* Review 3 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic3}
                            alt="Sanju"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Sanju</h3>
                        <p className="text-gray-600 mt-4">
                        I loved the pasta Alfredo! The creamy sauce and perfectly cooked pasta were heavenly. Can’t wait to visit again.
                        </p>
                    </div>

                    {/* Review 4 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic4}
                            alt="Nayem"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Nayem</h3>
                        <p className="text-gray-600 mt-4">
                        The steak was cooked to perfection, and the sides were just as amazing. The ambiance of the restaurant made the experience even better.
                        </p>
                    </div>

                    {/* Review 5 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic5}
                            alt="Tasfia"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Tasfia</h3>
                        <p className="text-gray-600 mt-4">
                        The desserts here are to die for! The chocolate lava cake was rich and decadent. A perfect end to a wonderful meal.
                        </p>
                    </div>

                    {/* Review 6 */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
                        <img
                            src={pic6}
                            alt="Eshika"
                            className="h-20 w-20 rounded-full mb-4 border-4 border-blue-100"
                        />
                        <h3 className="text-xl font-semibold text-gray-800">Eshika</h3>
                        <p className="text-gray-600 mt-4">
                        I was blown away by the flavors of the biryani! The spices were perfectly balanced, and the portion size was generous. A must-visit for food lovers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default Review;