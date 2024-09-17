import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../redux/slices/productSlice'
import Header from '../components/Header'

const Home = () => {
  const dispatch = useDispatch()
  const {allProducts,error,loading} = useSelector(state=>state.productReducer)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  return (
    <>
    <Header insideHome={true}/>
      <div style={{marginTop:'80px'}} className='container mx-auto px-4'>
        {
          loading ?
          <div className="flex justify-center items-center  font-bold" >
              <img width={'70px'} className='me-4' src="https://shortpixel.com/img/spinner2.gif" alt="" />
              Loading...
          </div>
          :
          <div className="grid grid-cols-4 gap-4">
            {
              allProducts.length>0 ?
                allProducts?.map((product)=>(
                  <div key={product?.id} className='rounded border p-2'>
                    <img width={'100%'} src={product?.thumbnail} alt="" />
                    <div className='text-center'>
                      <h3>{product?.title.slice(0,20)}...</h3>
                      <Link to={`/${product?.id}/view`} className='underline hover:underline-offset-4 text-blue-400'>View More..</Link>
                    </div>
                  </div>
                ))
              :
              <div className="font-bold text-center mt-5 mb-5 text-red-500">
                Product Not found!!!!
              </div>
            }
          </div>
        }
      </div>
    </>
   
  )
}

export default Home