import React, { useEffect, useState, useContext } from 'react';
import Authcontext from '../context/Authcontext';


const MyOrders = () => {
    const { user } = useContext(Authcontext);
    const [orders, setOrders] = useState([]);
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
            } catch (err) {
                setError(err.message);
            }
        };

        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

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
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
                    >
                        
                        <h3 className="text-xl font-semibold text-gray-800">{order.foodName}</h3>
                        <p className="text-gray-700">
                            <strong>Price:</strong> ${order.price}
                        </p>
                        <p className="text-gray-700">
                            <strong>purchase:</strong> {order.quantity}
                        </p>
                        <p className="text-gray-700">
                            <strong>Order Date:</strong>{' '}
                            {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
