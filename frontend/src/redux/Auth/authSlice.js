// import { createSlice } from "@reduxjs/toolkit";
// const loadFromLocalStorage = ()=>{
//     try{
//         const serialState = localStorage.getItem("user");
//         if(serialState==null) return {user:null}
//         return { user: JSON.parse(serialState) };

//     }catch(err){
//         return {user:null}

//     }
// }
// const initialState = loadFromLocalStorage();
// const authSlice = createSlice({
//     name:'auth',
//     initialState,
//     reducers:{
//         setUser : (state,action)=>{
//             // console.log("action.payload",action.payload);
//             // console.log("action.payload",action.payload.user);
//             state.user = action.payload.user;
//             localStorage.setItem("user",JSON.stringify(state.user));
//         },
//         logout : (state)=>{
//             state.user=null;
//             localStorage.removeItem("user");
//         }
//     }
// });
// export const {setUser,logout} = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serialState = localStorage.getItem("auth");
    if (serialState === null) return { user: null, token: null };
    const parsedState = JSON.parse(serialState);
    return {
      user: parsedState.user,
      token: parsedState.token,
    };
  } catch (err) {
    console.error("Error loading auth state:", err);
    return { user: null, token: null };
  }
};

const initialState = loadFromLocalStorage();
// console.log("Initial state from localStorage", initialState);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      try {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: state.user,
            token: state.token,
          })
        );
      } catch (err) {
        console.error("Error saving auth state:", err);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      try {
        localStorage.removeItem("auth");
      } catch (err) {
        console.error("Error removing auth state:", err);
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
