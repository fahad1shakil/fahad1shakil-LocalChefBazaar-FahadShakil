import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Order = () => {
  const { user } = useContext(AuthContext);
  const loaderData = useLoaderData();
  const meal = loaderData?.data || loaderData || {};
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState('');

  const handleConfirmOrder = async () => {
     
    if (!userAddress.trim()) {
      Swal.fire('Warning!', 'Please enter your delivery address', 'warning');
      return;
    }

    const totalPrice = meal.price * quantity;

    Swal.fire({
      title: `Confirm Order for "${meal.mealName || meal.foodName}"?`,
      text: `Your total price is $${totalPrice}. Do you want to confirm the order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderInfo = {
          foodId: meal._id,
          mealName: meal.mealName || meal.foodName,
          chefName: meal.chefName,
          price: meal.price,
          quantity,
          totalPrice,
          chefId: meal.chefId,
          paymentStatus: 'Pending',
          userEmail: user?.email,
          userAddress,
          deliveryTime: meal.estimatedDeliveryTime,
          orderStatus: 'pending',
          orderTime: new Date().toISOString(),
        };

        try {
          await axios.post(
            `${import.meta.env.VITE_BACKEND_API}
/orders`,
            orderInfo
          );
          Swal.fire('Success!', 'Order placed successfully!', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to place order', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-md sm:max-w-sm mx-auto p-8 mb-10 bg-white dark:bg-[#111111] shadow-2xl rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] transition-colors duration-500 mt-20">
      <title>LocalChefBazaar || order</title>
      <h2 className="text-xl sm:text-2xl font-black text-center text-slate-900 dark:text-[#e0e0e0] mb-8 tracking-tighter uppercase">
        Confirm <span className="text-[#6db70e] dark:text-[#7ecf55]">Bazaar</span> Order
      </h2>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Meal Name
        </label>
        <input
          type="text"
          value={meal.mealName || meal.foodName}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Price
        </label>
        <input
          type="text"
          value={`$${meal.price}`}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Chef ID
        </label>
        <input
          type="text"
          value={meal.chefId}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold text-orange-700 mb-1 block">
          Your Email
        </label>
        <input
          type="text"
          value={user?.email}
          disabled
          className="input input-bordered w-full border border-orange-400 rounded-lg text-black p-2 text-sm sm:text-base"
        />
      </div>

      <div className="mb-5">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full border border-orange-400 rounded-lg p-2 text-sm sm:text-base resize-none placeholder:text-black"
          placeholder="Enter your address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg py-2 text-sm sm:text-base order-1 sm:order-1 cursor-pointer"
        >
          Back
        </button>

        <button
          onClick={handleConfirmOrder}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 text-sm sm:text-base order-2 sm:order-2 cursor-pointer"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
