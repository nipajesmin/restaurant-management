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
                const response = await fetch(`https://restaurant-management-server-tawny.vercel.app/foods/${id}`);
                if (!response.ok) {
                    throw new Error('Food not found');
                }
                const data = await response.json();
                data.quantity = parseInt(data.quantity); // Ensure quantity is a number
                setFood(data);
                //console.log(data)
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

    // Handle purchase submission
    const handlePurchase = async (event) => {
        event.preventDefault();
        const quantityToPurchase = parseInt(event.target.quantity.value);

        if (quantityToPurchase > food.quantity) {
            Swal.fire(
                'Insufficient Quantity',
                `You can only purchase up to ${food.quantity} items.`,
                'warning'
            );
            return;
        }

        const orderDetails = {
            foodId: food._id,
            foodName: food.name,
            foodImage: food.image,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            price: food.price,
            quantity: quantityToPurchase,
            orderDate: new Date().toISOString(),
        };

        try {
            // Save the order in the database
            const orderResponse = await fetch(`https://restaurant-management-server-tawny.vercel.app/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to place order.');
            }

            Swal.fire('Success!', 'Your order has been placed successfully!', 'success');
            navigate('/myOrders'); // Redirect to MyOrders route
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };




    return (
        <div className="w-11/12 mx-auto mt-10">
            <h2 className="text-center text-4xl font-bold my-6 text-blue-600">
                Purchase {food.name}
            </h2>


            {/* If quantity is 0, show a message and disable the purchase form */}
            {food.quantity === 0 ? (
                <div className="bg-red-100 p-6 rounded-lg shadow-md max-w-lg mx-auto text-center">
                    <h3 className="text-2xl font-bold text-red-500 mb-4">
                        This item is currently out of stock!
                    </h3>
                    <p className="text-lg text-gray-700">
                        Sorry, this food item is not available for purchase right now.
                    </p>
                    <button
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        onClick={() => navigate('/allFoods')}
                    >
                        Go Back to All Foods
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    );
};

export default FoodPurchase;



