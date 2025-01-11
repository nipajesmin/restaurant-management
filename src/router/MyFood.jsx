import React, { useContext, useEffect, useState } from 'react';
import Authcontext from '../context/Authcontext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyFood = () => {
  const { user } = useContext(Authcontext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user?.email) {
  //     // fetch(`http://localhost:3000/foods?email=${user.email}`)
  //     fetch(`http://localhost:3000/food/${user.email}`)

  //       .then((res) => res.json())
  //       .then((data) => {
  //         setFoods(data);
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         setLoading(false);
  //       });
  //   }
  // }, [user]);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://restaurant-management-server-tawny.vercel.app/food/${user.email}`, {
          withCredentials: true, // Include cookies in the request
        })
        .then((response) => {
          setFoods(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          const errorMessage =
            error.response?.data?.message || 'Failed to fetch foods';
          Swal.fire('Error', errorMessage, 'error'); // Display an error alert
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
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 flex justify-center items-center">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  {/* <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover rounded-lg"
                  /> */}
                </td>
                <td className="border border-gray-300 px-4 py-2">{food.name}</td>
                <td className="border border-gray-300 px-4 py-2">${food.price}</td>
                <td className="border border-gray-300 px-4 py-2">{food.category}</td>
                <td className="border border-gray-300 px-4 py-2">{food.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    to={`/updateFood/${food._id}`}
                    className="text-emerald-700 hover:underline"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFood;
