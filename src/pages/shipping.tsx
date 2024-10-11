import {ChangeEvent, FormEvent, useState} from 'react'
import {BiArrowBack}from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { CartReducerInitialState } from '../types/reducer-types';
import { useEffect } from 'react';
import axios from 'axios';
import { RootState, server } from '../redux/store';
import toast from 'react-hot-toast';
import { saveShippingInfo } from '../redux/reducer/cartReducer';

const Shipping = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { cartItems,total} = useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [shippingInfo, setshippingInfo] = useState({
        address:"",
        city:"",
        state:"",
        country:"", 
        pinCode:"",
    });


    const changeHandler = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setshippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    useEffect(() => {
      if(cartItems.length<=0)return navigate("/cart");

    }, [cartItems])
    
    const submitHandler=async(e:FormEvent<HTMLFormElement>)=>{

      e.preventDefault();

      dispatch(saveShippingInfo(shippingInfo));
       
      try{
        const {data}=await axios.post(`${server}/api/v1/payment/create?id=${user?._id}`,{
          amount:total
          
        },{
          headers:{
            "Content-Type":"application/json"
          }
        });

        navigate("/pay",{
          state:data.ClientSecret
        })

      }
      catch(error){
        console.log(error);
        toast.error("Something Went Wrong");
        
      }
    }


  return (
    <div className="shipping">

      <button className='back-btn' onClick={()=>navigate("/cart")}>
        <BiArrowBack/>
      </button>
      <form onSubmit={submitHandler}>
        <h1>Shipping Adress</h1> 
        <input required type="text"  placeholder='Adress' name="address" value={shippingInfo.address} onChange={changeHandler}/>
        <input required type="text"  placeholder='City' name="city" value={shippingInfo.city} onChange={changeHandler}/>
        <input required type="text"  placeholder='State' name="state" value={shippingInfo.state} onChange={changeHandler}/>

        <select name='country' required value={shippingInfo.country} onChange={changeHandler}> 
          <option value="" >Choose Country</option>
          <option value="india" >India</option>
          <option value="unitedKingdom" >Uinted Kingdom</option>
          <option value="usa" >USA</option>
          
        </select>

        <input required type="number"  placeholder='Pin Code' name="pinCode" value={shippingInfo.pinCode} onChange={changeHandler}/>
        <button>pay now</button>
      </form>

      

    </div>
  )
}

export default Shipping






