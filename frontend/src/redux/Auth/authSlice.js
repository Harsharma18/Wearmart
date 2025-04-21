import { createSlice } from "@reduxjs/toolkit";
const loadFromLocalStorage = ()=>{
    try{
        const serialState = localStorage.getItem("user");
        if(serialState==null) return {user:null}
        return { user: JSON.parse(serialState) }; 

    }catch(err){
        return {user:null}

    }
}
const initialState = loadFromLocalStorage();
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser : (state,action)=>{
            // console.log("action.payload",action.payload);
            // console.log("action.payload",action.payload.user);
            state.user = action.payload.user;
            localStorage.setItem("user",JSON.stringify(state.user));
        },
        logout : (state)=>{
            state.user=null;
            localStorage.removeItem("user");
        }

    }
});
export const {setUser,logout} = authSlice.actions;
export default authSlice.reducer;