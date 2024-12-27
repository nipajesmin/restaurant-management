import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Authcontext from '../../context/Authcontext';


const UpdateFood = () => {
    const { id } = useParams(); // Get the food ID from the URL
    const { user } = useContext(Authcontext);
    const [food, setFood] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/foods/${id}`)
            .then((res) => res.json())
            .then((data) => setFood(data))
            .catch((err) => console.error(err));
    }, [id]);

    // console.log(food)
    const handleUpdate = (e) => {
      e.preventDefault();
      const form = e.target;
      const updatedFood = {
        name: form.name.value,
        image: form.image.value,
        price: parseFloat(form.price.value),
        category: form.category.value,
        origin: form.origin.value,
        description: form.description.value,
        quantity: parseInt(form.quantity.value, 10),
       // email: user.email, // Add user's email for authorization
      };

      fetch(`http://localhost:3000/foods/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'Food updated successfully') {
            Swal.fire('Success!', 'Food updated successfully!', 'success');
            navigate('/myFood'); // Redirect to My Foods page
          } else {
            Swal.fire('Error!', data.message || 'Failed to update food.', 'error');
          }
        })
        .catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Something went wrong!', 'error');
        });
    };

    if (!food) {
      return <p className="text-center text-gray-500">Loading food details...</p>;
    }
    return (
        <div className="w-11/12 mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Update Food</h2>
            <form
                  onSubmit={handleUpdate} 
                className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block font-bold mb-2">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        defaultValue={food.image}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={food.name}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={food.price}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        defaultValue={food.category}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        defaultValue={food.quantity}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Origin</label>
                    <input
                        type="text"
                        name="origin"
                        defaultValue={food.origin}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        defaultValue={food.description}
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                    Update Food
                </button>
            </form>
        </div>
    );
};
export default UpdateFood;