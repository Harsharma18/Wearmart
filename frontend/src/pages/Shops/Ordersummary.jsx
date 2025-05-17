import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cartSlice';
import {loadStripe} from '@stripe/stripe-js';

function Ordersummary() {
    const product = useSelector((state)=>state.cart.cartItems);
    const {user} = useSelector((state)=>state.auth);
    console.log("order summer user",user);
     console.log("order summary",product);
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
          //payment integeration 
          const makePayment = async(e)=>{
             const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
               console.log("order f",stripe);
               const body = {
                items:product,
                userId : user?.id,

               }
               const header = {
                "Content-Type" : "application/json"
               }
               const response = await fetch("http://localhost:8080/api/order/create-checkout-session",{
                method:"POST",
                headers:header,
                body:JSON.stringify(body)
               });
               console.log("response",response);
               const session = await response.json();
               console.log("session api",session);
               const  result = stripe.redirectToCheckout({sessionId:session.id});
               console.log("result of session ",result);``


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
                <button 
                onClick={(e)=>{
                  e.preventDefault();
                  makePayment()

                }}
                className='bg-green-700 px-3 py-1.5 text-white mt-2 rounded-md flex items-center justify-center mb-4'>Proceed Checkout <span className='ml-2'><i className="fa-solid fa-money-check-dollar"></i></span></button>
             </div>
        </div>

    </div>

  )
}

export default Ordersummary