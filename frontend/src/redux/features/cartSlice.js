import { createSlice } from "@reduxjs/toolkit";
const initialState =  {
    cartItems:[],
    totalItems:0,
     totalPrice:0,
      tax : 0,
      taxRate:0.15,
      grandTotal:0,
      

}

const cartSlices = createSlice({

    name:'cart',
    initialState,
    reducers:{
        addToCart : (state,action)=>{
            console.log("add to cart",action.payload);
           
            const isexist = state.cartItems.find((item)=>item._id===action.payload._id);
            if(!isexist){
                const  tempProduct = {...action.payload,quantity:1};
                state.cartItems.push(tempProduct);
            }
            else{
                console.log("already add in cart");
            }
            updateCart(state);

          
        },
        removeFromCart :(state,action)=>{
            state.cartItems = state.cartItems.filter((item)=>item._id!==action.payload._id);
            updateCart(state);
        },
        clearCart : (state)=>{
            
            state.cartItems=[],
            state.totalItems= 0,
             state.totalPrice=0,
              state.tax = 0,
              state.taxRate=0,
              state.grandTotal=0
            
        },
        increaseQuantity:(state,action)=>{
         const item = state.cartItems.find((item)=>item._id===action.payload._id);
         if(item){
            item.quantity = item.quantity+1;
            updateCart(state);
         }
        },
        decreaseQuantity:(state,action)=>{
            const item = state.cartItems.find((item)=>item._id=== action.payload._id);
            if(item && item.quantity>1){
               item.quantity = item.quantity-1;
               updateCart(state);
            }
           },
           //or we can use this method
        //    updateQuantity : (state,action)=>{
        //     const item = state.cartItems.find((item)=>item._id===action.payload._id);
        //     if(action.payload.type==="increment"){
        //         item.quantity = item.quantity+1;
        //     }else if(action.payload.type==="decrement"){
        //         if(item.quantity>1){
        //             item.quantity-=1;
        //         }
        //     }
        //     updateCart(state);
        //    }
        

    }

});
export const {addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
updateQuantity} = cartSlices.actions;
export default cartSlices.reducer;

function updateCart(state){
     //update cart 
     state.totalItems = state.cartItems.reduce((total,item)=>{
        return total+item.quantity

    },0)
    //update price 
    state.totalPrice  = state.cartItems.reduce((total,item)=>total+item.price*item.quantity,0);
     state.taxRate = 0.15;
     state.tax =  state.totalPrice*state.taxRate;
     state.grandTotal = state.totalPrice+state.tax;
     console.log("total Price",state.grandTotal);
}

