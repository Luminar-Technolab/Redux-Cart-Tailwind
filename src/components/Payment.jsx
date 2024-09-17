import React,{useRef,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { emptyCart } from '../redux/slices/cartSlice'

const Payment = ({cartTotal}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const paypal = useRef()

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder: (data,actions,error)=>{
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units :[{
                        amount: {
                            currency_code: 'USD',
                            value: cartTotal
                        }
                    }]
                })
            },
            onApprove :async (data,actions)=>{
                const order = await actions.order.capture()
                console.log(order);                
                dispatch(emptyCart())
                alert("Order placed successfully. Thank you for purchasing with us!!!")
                navigate('/')
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                alert("Transaction has been Cancelled!!!")
            },
            onError: err => {
                console.log('OnError', err);
                alert("Transaction has been Failed... Please try after sometime!!!")
            }
        }).render(paypal.current)
    },[])

  return (
    <div ref={paypal}></div>
  )
}

export default Payment