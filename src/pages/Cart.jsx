import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../redux/slices/cartSlice'
import Payment from '../components/Payment'


const Cart = () => {
  const ourCart = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal]=useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [checkoutStatus,setCheckoutStatus] = useState(false)

  useEffect(()=>{
    if(ourCart?.length>0){
      setCartTotal(ourCart?.map(item=>item.totalPrice).reduce((t1,t2)=>t1+t2))
    }else{
      setCartTotal(0)
    }
  },[ourCart])

  const handleDecrement = (product)=>{
    if(product.quantity>1){
      dispatch(decQuantity(product.id))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const checkout = ()=>{
    setCheckoutStatus(true)
    // dispatch(emptyCart())
    // alert("Order placed successfully. Thank you for purchasing with us!!!")
    // navigate('/')
  }

  return (
    <>
          <Header/>
      <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
       { 
        ourCart?.length>0 ?
        <>
            <h1 className="text-red-600 font-bold text-4xl mb-5">Cart Summary</h1>
            <div className='grid grid-cols-3 gap-4'>
            <div class="col-span-2 border rounded p-5 shadow">
            <table className='table-auto w-full '>
                  <thead>
                    <tr>
                      <td className='font-semibold'>No</td>
                      <td className='font-semibold'>Name</td>
                      <td className='font-semibold'>Image</td>
                      <td className='font-semibold'>Quantity</td>
                      <td className='font-semibold'>Price</td>
                      <td className='font-semibold'>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    ourCart?.map((product,index)=>(
                      <tr key={product?.id}>
                        <td>{index+1}</td>
                        <td>{product?.title}</td>
                        <td>
                          {" "}
                          <img
                            width={"70px"}
                            height={"70px"}
                            src={product?.thumbnail}
                            alt=""
                          />{" "}
                        </td>
                        <td>
                        <div className="flex">
                        <button onClick={()=>handleDecrement(product)} className='btn font-bold'>-</button>
                        <input value={product?.quantity} style={{width:'40px'}} className='font-bold border rounded p-1 me-2 ms-2' type="text" readOnly />
                        <button onClick={()=>dispatch(incQuantity(product?.id))} className='btn font-bold'>+</button>
                      </div>
                        </td>
                        <td>$ {product?.totalPrice}</td>
                        <td>
                          {" "}
                          <button onClick={()=>dispatch(removeCartItem(product?.id))} className="fa-solid fa-trash text-red-500"></button>{" "}
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
                <div className="float-right mt-4">
                  <button onClick={()=>dispatch(emptyCart())} className='bg-blue-500 text-white rounded p-3 me-3'>EMPTY CART</button>
                  <Link to={'/'} className='bg-orange-500 text-white rounded p-3 me-3'>Shop More</Link>
                </div>
            </div>
            <div >
              { !checkoutStatus ?
                <div className="border rounded p-5 shadow">
                <h1 className="text-2xl font-bold">Total Amount : <span className='text-red-500'>$ {cartTotal}</span></h1>
                <hr />
                <button onClick={checkout} className='w-full bg-green-500 rounded p-5 text-white font-bold mt-5'>
                  Checkout
                </button>
                </div>
                :
                <Payment cartTotal={JSON.stringify(cartTotal)}/>
                }  
            </div>
            </div>
        </>
        :
        <div style={{height:'100vh'}} className="flex flex-col items-center justify-center w-full">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7236766-5875081.png" alt="" />
          <h1 className='text-3xl text-blue-500 font-bold'>Your Cart is Empty</h1>
        </div>
        }
      </div>
    </>
   
  )
}

export default Cart