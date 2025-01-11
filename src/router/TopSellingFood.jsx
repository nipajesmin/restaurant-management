import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopSellingFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch top-selling foods
  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const response = await fetch('https://restaurant-management-server-tawny.vercel.app/foods');
        const data = await response.json();
        // Sort by purchase count and select top 6
        const sortedFoods = data.sort((a, b) => b.purchase - a.purchase).slice(0, 6);
        setTopFoods(sortedFoods);
      } catch (error) {
        console.error('Error fetching top-selling foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopFoods();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading top-selling foods...</p>;
  }

  return (
    <div className="w-11/12 mx-auto mt-10 py-16">
      <h2 className="text-4xl font-extrabold text-center text-black mb-10">Top Selling Foods</h2>
      <p className="text-center text-gray-600 text-lg mb-10">
        You can explore our top food.This foods are purchased maximum time by our customers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topFoods.map((food) => (
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
            <p className="text-gray-600 line-clamp-2">{food.description}</p>
            <p className="text-lg font-semibold mt-2">
              Price: ${Number(food.price).toFixed(2)}
            </p>
            <p className="text-gray-700">Purchased: {food.purchase} times</p>
            <button
              className="mt-4 bg-emerald-700 text-white py-2 px-4 rounded hover:bg-green-500"
              onClick={() => navigate(`/allFoods/${food._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-emerald-700 text-slate-50 px-4 py-2 rounded-md hover:bg-green-500 transition pr-5 pl-5"
          onClick={() => navigate('/allFoods')}
        >
          See All
        </button>
      </div>
    </div>
  );
};

export default TopSellingFoods;

