import React, { useEffect, useState, useContext } from 'react';
import Authcontext from '../context/Authcontext';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { user } = useContext(Authcontext);
    const [orders, setOrders] = useState([]);
    const [foodDetails, setFoodDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3000/orders/${user?.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders.');
                }
                const data = await response.json();
                setOrders(data.orders);

                // Fetch food details for each order
                const foodPromises = data.orders.map(order =>
                    fetch(`http://localhost:3000/foods/${order.foodId}`)
                        .then(res => res.json())
                        .catch(() => null) // Ignore errors for individual fetches
                );
                const foodData = await Promise.all(foodPromises);

                // Map food details by foodId
                const foodMap = {};
                foodData.forEach(food => {
                    if (food && food._id) {
                        foodMap[food._id] = food;
                    }
                });
                setFoodDetails(foodMap);
            } catch (err) {
                setError(err.message);
            }
        };

        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

    const deleteOrder = async (orderId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete order.');
                    }

                    // Remove deleted order from the local state
                    setOrders(orders.filter(order => order._id !== orderId));

                    Swal.fire(
                        'Deleted!',
                        'Your order has been deleted.',
                        'success'
                    );
                } catch (err) {
                    Swal.fire('Error!', 'Failed to delete the order.', 'error');
                    setError(err.message);
                }
            }
        });
    };
    

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    if (orders.length === 0) {
        return <p className="text-center text-gray-500">You have not placed any orders yet.</p>;
    }

    return (
        <div className="w-11/12 mx-auto mt-10">
            <h2 className="text-4xl font-bold text-blue-600 text-center mb-6">My Orders</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map(order => {
                    const food = foodDetails[order.foodId] || {};
                    return (
                        <div
                            key={order._id}
                            className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            {food.image && (
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                            )}
                            <h3 className="text-xl font-semibold text-gray-800">{order.foodName}</h3>
                            <p className="text-gray-700">
                                <strong>Price:</strong> ${order.price}
                            </p>
                            <p className="text-gray-700">
                                <strong>Quantity:</strong> {order.quantity}
                            </p>
                            <p className="text-gray-700">
                                <strong>Order Date:</strong>{' '}
                                {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            {food.addedBy?.name && (
                                <p className="text-gray-700">
                                    <strong>Owner Name:</strong> {food.addedBy.name}
                                </p>
                            )}
                            {food.addedBy?.email && (
                                <p className="text-gray-700">
                                    <strong>Owner Email:</strong> {food.addedBy.email}
                                </p>
                            )}
                            <button
                                onClick={() => deleteOrder(order._id)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                            >
                                Delete Order
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;



