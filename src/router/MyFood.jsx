import React, { useContext, useEffect, useState } from 'react';
import Authcontext from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyFood = () => {
  const { user } = useContext(Authcontext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
     // fetch(`http://localhost:3000/foods?email=${user.email}`)
     fetch(`http://localhost:3000/food/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (foods.length === 0) {
    return <p className="text-center text-gray-500">No foods added by you yet.</p>;
  }

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Foods</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="card bg-base-100 shadow-xl p-4">
            <img
              src={food.image}
              alt={food.name}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-bold">{food.name}</h3>
            <p className="text-gray-600">Price: ${food.price}</p>
            <p className="text-gray-600">Category: {food.category}</p>
            <p className="text-gray-600">Quantity: {food.quantity}</p>
            <div className="flex gap-4 mt-4">
              <Link
                to={`/updateFood/${food._id}`}
                className="btn btn-sm btn-primary"
              >
                Update
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFood;
