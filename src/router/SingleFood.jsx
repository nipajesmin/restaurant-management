import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleFood = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`http://localhost:3000/foods/${id}`);
        if (!response.ok) {
          throw new Error('Food not found');
        }
        const data = await response.json();
        setFood(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFood();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!food) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-center text-4xl font-bold my-6 text-blue-600">
        {food.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex justify-center">
          <img
            src={food.image}
            alt={food.name}
            className="rounded-lg shadow-lg max-w-full h-auto object-cover"
            style={{ maxHeight: '400px' }}
          />
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Category:</strong> {food.categoryname}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Price:</strong> ${food.price}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Rating:</strong> {food.rating} ⭐
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Customization:</strong> {food.customization}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Processing Time:</strong> {food.processingTime}
          </p>
          <p className="text-lg font-semibold text-gray-700 mb-2">
            <strong>Stock Status:</strong> {food.stockStatus} in stock
          </p>
          <p className="text-lg text-gray-600 mt-4">
            <strong>Description:</strong> {food.description}
          </p>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/allFoods"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition mb-6"
        >
          ← Go Back
        </Link>
      </div>
    </div>
  );
};

export default SingleFood;

