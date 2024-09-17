import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCart } from '../redux/slices/cartSlice'
import { addToWishlist } from '../redux/slices/wishlistSlice'
import Header from '../components/Header'

const View = () => {
  const [product,setProduct] = useState({})
  const {id} = useParams()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  const dispatch = useDispatch()
  const yourCart = useSelector(state=>state.cartReducer)
  console.log(id);
  
  useEffect(()=>{
    if(localStorage.getItem("allProducts")){
      const allProducts = JSON.parse(localStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
  },[])

  const handleWishlist = ()=>{
    if(userWishlist?.includes(product)){
      alert("Item already in your wishlist!!!!")
    }else{
      dispatch(addToWishlist(product))
    }
  }
  
  const handleCart = ()=>{
    const existingProduct = yourCart?.find(item=>item.id==product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("Product quantity is Incrementing!!!")
    }else{
      dispatch(addToCart(product))
    }
  }
  return (
    <>
          <Header/>
      <div  style={{height:'100vh'}} className='flex justify-center items-center mx-5'>
          <div className='grid grid-cols-2 items-center '>
              <img  src={product?.thumbnail}  alt="" />
              <div>
                  <h3>PID: {product?.id}</h3>
                  <h1 className='text-3xl font-bold'>{product?.title}</h1>
                  <h4>$ {product?.price}</h4>
                  <p><span className='font-bold'>Description</span> : {product?.description}</p>
                  <div className="flex justify-between mt-3">
                      <button onClick={handleWishlist} className='bg-blue-600 text-white p-2 rounded'>Add to Wishlist</button>
                      <button onClick={handleCart} className='bg-green-600 text-white p-2 rounded'>Add To Cart</button>
                  </div>
              </div>
          </div>
      </div>
    </>
   
  )
}

export default View