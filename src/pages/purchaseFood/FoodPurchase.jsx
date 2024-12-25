import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Authcontext from '../../context/Authcontext';
import Swal from 'sweetalert2';

const FoodPurchase = () => {
  const { id } = useParams();
  const { user } = useContext(Authcontext); // Get logged-in user details
  const [food, setFood] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handlePurchase = async (event) => {
    event.preventDefault();
    const quantityToPurchase = parseInt(event.target.quantity.value);

    // Check if the requested quantity exceeds the available quantity
    if (quantityToPurchase > food.quantity) {
      Swal.fire(
        'Insufficient Quantity',
        `You can only purchase up to ${food.quantity} items.`,
        'warning'
      );
      return;
    }

    const purchaseDetails = {
      foodName: food.name,
      price: food.price,
      quantity: quantityToPurchase,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      purchaseDate: new Date().toISOString(), // Automatically set the purchase date
    };

    try {
      const response = await fetch('http://localhost:3000/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseDetails),
      });

      if (response.ok) {
        Swal.fire('Success!', 'Purchase completed successfully!', 'success');
        navigate('/allFoods'); // Redirect after successful purchase
      } else {
        throw new Error('Failed to complete the purchase.');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!food) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Prevent the user who added the food from purchasing it
  if (food.addedBy?.email === user?.email) {
    return (
      <div className="w-11/12 mx-auto mt-10 text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-6">
          You cannot purchase this food item.
        </h2>
        <p className="text-lg text-gray-700">
          This item was added by you. Please explore other items.
        </p>
        <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={() => navigate('/allFoods')}
        >
          Go Back to All Foods
        </button>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-center text-4xl font-bold my-6 text-blue-600">
        Purchase {food.name}
      </h2>

      <form
        onSubmit={handlePurchase}
        className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto"
      >
        <p className="text-lg font-semibold text-gray-700 mb-2">
          <strong>Food Name:</strong> {food.name}
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          <strong>Price:</strong> ${food.price}
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          <strong>Buyer Name:</strong> {user?.displayName || 'N/A'}
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          <strong>Buyer Email:</strong> {user?.email || 'N/A'}
        </p>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 font-semibold mb-2"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="w-full px-3 py-2 border rounded-md"
            placeholder={`Enter quantity (Max: ${food.quantity})`}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default FoodPurchase;

