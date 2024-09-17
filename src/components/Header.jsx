import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const yourWishlist = useSelector(state=>state.wishlistReducer)
  const yourCart = useSelector(state=>state.cartReducer)
  return (
    <nav class="flex fixed w-full top-0 items-center bg-black p-5">
            <Link to={'/'} className='text-white font-semibold'><i className="fa-solid fa-truck-fast"></i> E Cart</Link>
            <ul class="flex-1 text-right">
                { insideHome && <li class="list-none inline-block px-5">
                    <input onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}  style={{width:'300px'}} type="text" className='w-full rounded p-1'  placeholder='Search products here'/>
                </li>}
                <li class="list-none inline-block px-5"><Link to={'/wishlist'} class="text-white px-2" ><i className="fa-solid text-red-600 fa-heart me-1"></i>Wishlist <span className='rounded px-1 bg-yellow-500'>{yourWishlist?.length}</span> </Link></li>
                <li class="list-none inline-block px-5"><Link to={'/cart'} class="text-white px-2" ><i className="fa-solid text-green-600 fa-cart-shopping"></i> Cart <span className='rounded px-1 bg-yellow-500'>{yourCart?.length}</span> </Link></li>
            </ul>
    </nav>
  )
}

export default Header