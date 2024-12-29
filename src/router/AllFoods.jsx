import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AllFoods = () => {
    const [foods, setFoods] = useState([]); // State to store the food data
    const [searchQuery, setSearchQuery] = useState(''); // State to handle search input
    const [loading, setLoading] = useState(true); // State to handle loading
    const userEmail = 'user@example.com'; // Replace with the logged-in user's email
    const navigate = useNavigate();

    // Fetch data from the API
    useEffect(() => {
        fetch('https://restaurant-management-server-tawny.vercel.app/foods') 
            .then(response => response.json())
            .then(data => {
                setFoods(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching food data:', error);
                setLoading(false);
            });
    }, []);

    // Filter foods based on the search query
    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-11/12 mx-auto">
            {/* Page Title */}
            <div className="bg-gray-100 text-gray-900 p-8 md:p-12 rounded-lg shadow-lg text-center my-5">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">All Foods</h1>
                <p className="text-lg md:text-xl leading-relaxed">
                    Browse our delicious food items and find your favorites!
                </p>
            </div>

            {/* Search Bar */}
            <div className="my-5 text-center">
                <input
                    type="text"
                    placeholder="Search foods by name..."
                    className="border border-gray-300 rounded-lg p-2 w-1/2"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFoods.map(food => (
                    <div
                        key={food._id}
                        className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow"
                    >
                        <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-bold">{food.name}</h2>
                        <p className="text-gray-600">{food.description}</p>
                        <p className="text-lg font-semibold mt-2">
                        Price: ${Number(food.price).toFixed(2) || '0.00'}
                        </p>
                        <p className="text-gray-700">
                            Available Quantity: {food.quantity > 0 ? food.quantity : 'Out of Stock'}
                        </p>
                        {food.quantity === 0 && (
                            <p className="text-red-500 font-semibold mt-2">
                                This item is not available for purchase.
                            </p>
                        )}
                        {food.addedBy === userEmail && (
                            <p className="text-red-500 font-semibold mt-2">
                                You cannot purchase your own food item.
                            </p>
                        )}
                        {/* <button
                            className={`mt-4 py-2 px-4 rounded ${food.quantity === 0 || food.addedBy === userEmail
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            disabled={food.quantity === 0 || food.addedBy === userEmail}
                        >
                            Add to Cart
                        </button> */}
                        <button
                            className="mt-4 ml-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            onClick={() => navigate(`/allFoods/${food._id}`)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFoods;

