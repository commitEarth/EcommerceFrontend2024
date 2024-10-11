import { useEffect, useState } from 'react';
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/cart-items';
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../redux/reducer/cartReducer';
import { CartReducerInitialState } from '../types/reducer-types';

import toast from 'react-hot-toast';
import { CartItem } from "../types/types";
import axios from 'axios';
import { server } from '../redux/store';

const Cart = () => {


  const dispatch = useDispatch();
  const { cartItems, subtotal, tax, total, shippingCharges, discount } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

  const [couponCode, setcouponCode] = useState("");
  const [isValidcouponCode, setisValidcouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    // if(cartItem.stock<1)return 
    if (cartItem.quantity >= cartItem.stock) return toast.error(`Only ${cartItem.quantity} stocks were available`) // so badhe na *
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return toast.error(`Select atleast 1 quantity`)
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {

    dispatch(removeCartItem(productId))
  };


  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();


    const timeoutId = setTimeout(() => {

      // localhost:4000/api/v1/payment/discount?coupon=new

      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken})
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setisValidcouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setisValidcouponCode(false);
          dispatch(calculatePrice());
        })

    }, 1000);

    return () => {
      clearTimeout(timeoutId); 
      cancel();
      setisValidcouponCode(false);
    }
  }, [couponCode])

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems])



  return (
    <div className="cart">

      <main>
        {
          cartItems.length > 0 ? (
            cartItems.map((i, idx) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={idx} cartItem={i} />
            ))
          )
            :
            (<h1>Your Cart is Empty </h1>)
        }
      </main>


      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: - <em className='red'> ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>
        <input type="text" placeholder='Coupon Code' value={couponCode} onChange={(e) => setcouponCode(e.target.value)} />
        {
          couponCode && (
            isValidcouponCode ? (<span className='green'>
              ₹{discount} off using the code "<code>{couponCode}</code>"
            </span>)
              :
              (<span className='red'>Invalid coupon <VscError /></span>)
          )
        }
        {
          cartItems.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  )
}

export default Cart

// ₹