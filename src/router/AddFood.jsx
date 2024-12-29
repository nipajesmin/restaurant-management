import React, { useContext } from 'react';
import Swal from 'sweetalert2';

import Authcontext from '../context/Authcontext';




const AddFood = () => {
    const { user } = useContext(Authcontext);

    const handleAddFood = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const origin = form.origin.value;
        const description = form.description.value;
        const userEmail = user?.email || '';
        const userName = user?.displayName || '';

        const newFood = {
            name,
            image,
            category,
            quantity,
            price,
            origin,
            description,
            addedBy: {
                name: userName,
                email: userEmail,
            },
            purchase: 0 ,
        };

      //  console.log(newFood);

        // Send data to the server
        fetch('https://restaurant-management-server-tawny.vercel.app/foods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFood),
        })

            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Food Item Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                    form.reset();
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            });
    };

    return (
        <div>

            <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-base-100 shadow-xl rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Food Item</h2>
                <form onSubmit={handleAddFood} className="space-y-4">
                    {/* Food Name */}
                    <div className="form-control">
                        <label className="label font-semibold">Food Name</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered"
                            placeholder="Enter food name"
                            required
                        />
                    </div>

                    {/* Food Image */}
                    <div className="form-control">
                        <label className="label font-semibold">Food Image (URL)</label>
                        <input
                            type="text"
                            name="image"
                            className="input input-bordered"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    {/* Food Category */}
                    <div className="form-control">
                        <label className="label font-semibold">Food Category</label>
                        <input
                            type="text"
                            name="category"
                            className="input input-bordered"
                            placeholder="Enter food category"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className="form-control">
                        <label className="label font-semibold">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            className="input input-bordered"
                            placeholder="Enter quantity"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="form-control">
                        <label className="label font-semibold">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            className="input input-bordered"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    {/* Food Origin */}
                    <div className="form-control">
                        <label className="label font-semibold">Food Origin (Country)</label>
                        <input
                            type="text"
                            name="origin"
                            className="input input-bordered"
                            placeholder="Enter food origin"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label font-semibold">Description</label>
                        <textarea
                            name="description"
                            className="textarea textarea-bordered"
                            placeholder="Enter description (e.g., ingredients, making procedure, etc.)"
                            required
                        ></textarea>
                    </div>

                    {/* User Email (Read-Only) */}
                    <div className="form-control">
                        <label className="label font-semibold">User Email</label>
                        <input
                            type="email"
                            name="userEmail"
                            className="input input-bordered bg-gray-100"
                            defaultValue={user?.email || ''}
                            readOnly
                        />
                    </div>

                    {/* User Name (Read-Only) */}
                    <div className="form-control">
                        <label className="label font-semibold">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            className="input input-bordered bg-gray-100"
                            defaultValue={user?.displayName || ''}
                            readOnly
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full">
                            Add Food Item
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddFood;
