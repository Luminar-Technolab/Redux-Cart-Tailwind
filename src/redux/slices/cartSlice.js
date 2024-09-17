import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cartItems',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const exisitingProduct = state.find(item=>item.id==action.payload.id)
            if(exisitingProduct){
                const remaingProducts = state.filter(item=>item.id!=exisitingProduct.id)
                exisitingProduct.quantity++
                exisitingProduct.totalPrice = exisitingProduct.price * exisitingProduct.quantity
                state = [...remaingProducts,exisitingProduct]
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removeCartItem:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        incQuantity:(state,action)=>{
            const existingProduct = state.find(item=>item.id==action.payload)
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            const remaingProducts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remaingProducts,existingProduct]
        },
        decQuantity:(state,action)=>{
            const existingProduct = state.find(item=>item.id==action.payload)
            existingProduct.quantity--
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity
            const remaingProducts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remaingProducts,existingProduct]
        },
        emptyCart: (state)=>{
           return state = []
        }
    }
})

export const {addToCart,removeCartItem,incQuantity,decQuantity,emptyCart}  = cartSlice.actions
export default cartSlice.reducer