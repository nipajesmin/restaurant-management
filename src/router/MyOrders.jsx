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
                const response = await fetch(`https://restaurant-management-server-tawny.vercel.app/orders/${user?.email}`, {
                    credentials: 'include', // Include cookies in the request
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch orders.');
                }

                const data = await response.json();
                setOrders(data.orders);

                // Fetch food details for each order
                const foodPromises = data.orders.map(order =>
                    fetch(`https://restaurant-management-server-tawny.vercel.app/foods/${order.foodId}`)
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
                Swal.fire('Error', err.message, 'error'); // Display an error alert
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
                    const response = await fetch(`https://restaurant-management-server-tawny.vercel.app/orders/${orderId}`, {
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
        <h2 className="text-4xl font-bold text-black text-center mb-6">My Orders</h2>

        <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Food Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Order Date</th>
                        <th className="border border-gray-300 px-4 py-2">Owner Name</th>
                        <th className="border border-gray-300 px-4 py-2">Owner Email</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const food = foodDetails[order.foodId] || {};
                        return (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {food.image && (
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className="w-16 h-16 object-cover rounded-md mx-auto"
                                        />
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{order.foodName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">${order.price}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{order.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{food.addedBy?.name || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{food.addedBy?.email || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-green-500 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);
};

export default MyOrders;



