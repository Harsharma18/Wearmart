import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cartSlice';

function Ordersummary() {
    const product = useSelector((state)=>state.cart.cartItems);
    // console.log("order summary",product);
    const {  totalItems,
        totalPrice,
         tax ,
         taxRate,
         grandTotal} = useSelector((state)=>state.cart);
       //?  console.log( useSelector((state)=>state.cart))
          const dispatch = useDispatch();
          const handleClearCart = ()=>{
            dispatch(clearCart());
          }
  return (
    <div className='bg-pink-100 rounded  text-base mt-5 '>
        <div className='px-6 py-4 space-y-5'>
            <h1 className='text-xl text-black font-bold'>Order Summary</h1>
            <p className='mt-2 text-black text-sm'>Selected items : {totalItems}</p>
             <p>Total Price: ${totalPrice}</p>
             <p>Tax ({taxRate*100}%) : ${tax.toFixed(2)} </p>
             <h3 className='font-bold'>Grand Total : ${grandTotal.toFixed(2)}</h3>
             <div className='px-4 mb-6'>
                <button onClick={handleClearCart} className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex items-center justify-center mb-4' >Clear Cart <span><i className="ml-2 fa-solid  fa-trash"></i></span></button>
                <button className='bg-green-700 px-3 py-1.5 text-white mt-2 rounded-md flex items-center justify-center mb-4'>Proceed Checkout <span className='ml-2'><i className="fa-solid fa-money-check-dollar"></i></span></button>
             </div>
        </div>

    </div>

  )
}

export default Ordersummary