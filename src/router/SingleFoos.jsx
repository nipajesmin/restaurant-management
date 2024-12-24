import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleFoos = () => {
    const { id } = useParams(); // Get food ID from URL
    const [food, setFood] = useState(null); // State to store food details
    const [loading, setLoading] = useState(true); // State for loading
    const navigate = useNavigate();

    // Fetch food details from the API
    // useEffect(() => {
    //     fetch(`http://localhost:3000/foods/${id}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setFood(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching food details:', error);
    //             setLoading(false);
    //         });
    // }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!food) {
        return <div>Food not found!</div>;
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <div className="bg-gray-100 text-gray-900 p-8 md:p-12 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{food.name}</h1>
                <img
                    src={food.image}
                    alt={food.name}
                    className="w-full md:w-1/2 mx-auto rounded-lg mb-4"
                />
                <p className="text-lg md:text-xl leading-relaxed mb-6">{food.description}</p>
                <p className="text-lg font-semibold">Price: ${food.price.toFixed(2)}</p>
                <p className="text-lg font-semibold">
                    Available Quantity: {food.quantity > 0 ? food.quantity : 'Out of Stock'}
                </p>
                <p className="text-lg font-semibold">
                    Purchase Count: {food.purchaseCount || 0}
                </p>

                {food.quantity === 0 ? (
                    <p className="text-red-500 font-semibold mt-4">
                        This item is currently out of stock.
                    </p>
                ) : (
                    <button
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => navigate(`/purchase/${food._id}`)}
                    >
                        Purchase Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default SingleFoos;

