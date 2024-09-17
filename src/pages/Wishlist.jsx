import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch,useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {
  const ourWishlist = useSelector(state=>state.wishlistReducer)
  const ourCart = useSelector(state=>state.cartReducer)
  const dispatch = useDispatch()

  const handelCart = (product)=>{
    const existingProduct = ourCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
      alert("Product quantity is Incrementing!!!")
    }
    else{
      dispatch(addToCart(product))
      dispatch(removeWishlistItem(product.id))
    }
  }
  return (
    <>
      <Header/>
      <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
        {
          ourWishlist?.length>0 ?
          <>
            <h1 className="text-red-600 font-bold text-4xl mb-5">Your Wishlist</h1>
            <div className="grid grid-cols-4 gap-4">
              {
                ourWishlist?.map(product=>(
                  <div key={product?.id} className='rounded border p-2'>
                      <img width={'100%'} src={product?.thumbnail} alt="" />
                      <div className='text-center'>
                        <h3>{product?.title}</h3>
                        <div className='d-flex justify-around  mt-3'>
                          <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className='me-5'> <i className="fa-solid fa-heart-circle-xmark text-red-500"></i> </button>
                          <button onClick={()=>handelCart(product)} className='ms-5'> <i className="fa-solid fa-cart-plus text-green-500"></i> </button>
                        </div>
                      </div>
                  </div>
                ))
              }
            </div>
        </>
        :
        <div style={{height:'100vh'}} className="flex flex-col items-center justify-center w-full">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7236766-5875081.png" alt="" />
          <h1 className='text-3xl text-blue-500 font-bold'>Your Wishlist is Empty</h1>
        </div>}
      </div>
    </>
  )
}

export default Wishlist