import React from 'react';
import img1 from '../../../public/step-1.jpg';
import img2 from '../../../public/step-2.jpg';
import img3 from '../../../public/step-3.jpg';
import img4 from '../../../public/step-4.jpg';

const FoodDeliver = () => {
    const steps = [
        {
            id: 1,
            image: img1, // Replace with actual image URL
            title: "Choose your favorite food",
        },
        {
            id: 2,
            image: img2, // Replace with actual image URL
            title: "Free and fast delivery",
        },
        {
            id: 3,
            image: img3, // Replace with actual image URL
            title: "Easy payment methods",
        },
        {
            id: 4,
            image: img4, // Replace with actual image URL
            title: "And finally, enjoy your food",
        },
    ];
    return (
        <div className="bg-gray-100 py-12 w-11/12 mx-auto mt-8 rounded-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                How it <span className="text-red-500">Works</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-11/12 mx-auto">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        <img
                            src={step.image}
                            alt={step.title}
                            className="w-20 h-20 mb-4 rounded-full border-4 border-red-200"
                        />
                        <p className="text-gray-800 font-semibold">{step.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default FoodDeliver;