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

  const inputStyle = "w-full px-4 py-3 bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] text-slate-900 dark:text-[#e0e0e0] font-bold transition-all outline-none text-sm disabled:opacity-60 disabled:cursor-not-allowed";
  const textareaStyle = "w-full px-4 py-3 bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] rounded-xl focus:border-[#6db70e] dark:focus:border-[#7ecf55] text-slate-900 dark:text-[#e0e0e0] font-bold transition-all outline-none text-sm resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600";

  return (
    <div className="max-w-md mx-auto p-8 mb-10 bg-white dark:bg-[#111111] shadow-[0_10px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] border border-slate-100 dark:border-[#242424] dark:border-[0.5px] transition-colors duration-500 mt-20">
      <title>LocalChefBazaar || Order</title>
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
          className={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Price
        </label>
        <input
          type="text"
          value={`$${meal.price}`}
          disabled
          className={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Chef ID
        </label>
        <input
          type="text"
          value={meal.chefId}
          disabled
          className={inputStyle}
        />
      </div>

      <div className="mb-4">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Your Email
        </label>
        <input
          type="text"
          value={user?.email}
          disabled
          className={inputStyle}
        />
      </div>

      <div className="mb-6">
        <label className="text-[10px] font-black text-slate-400 dark:text-[#888888] uppercase tracking-[0.2em] mb-1.5 ml-1 block">
          Delivery Address <span className="text-[#6db70e] dark:text-[#7ecf55] font-bold">*</span>
        </label>
        <textarea
          className={textareaStyle}
          placeholder="Enter your full delivery address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          rows={3}
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-slate-100 dark:bg-[#0f0f0f] hover:bg-slate-200 dark:hover:bg-[#161616] text-slate-700 dark:text-[#e0e0e0] border border-slate-200 dark:border-[#242424] dark:border-[0.5px] font-black rounded-xl py-3.5 text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer active:scale-[0.98]"
        >
          Back
        </button>

        <button
          onClick={handleConfirmOrder}
          className="flex-1 bg-[#6db70e] dark:bg-[#7ecf55] hover:bg-[#5aa30b] dark:hover:bg-[#6db70e] text-white dark:text-[#0f0f0f] font-black rounded-xl py-3.5 text-xs uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer active:scale-[0.98]"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
