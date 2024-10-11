import { ReactElement,useState ,useEffect} from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {  useMyOrdersQuery } from "../redux/api/orderAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/loader";
import { RootState } from "../redux/store";

type DataType={
    _id :string;
    amount:number;
    quantity:number;
    discount:number;
    status:ReactElement;
    action :ReactElement;

};


const column:Column<DataType>[]=[
    {
    Header:"ID",
    accessor:"_id"
    },
    {
    Header:"Quantity",
    accessor:"quantity"

    },{
    Header:"Discount",
    accessor:"discount"

    },
    {
        Header:"Amount",
        accessor:"amount"
    
    },
    {
        Header:"Status",
        accessor:"status"
    
    },
    {
        Header:"Action",
        accessor:"action"
    
        },


]

// import React from 'react'
// const table= TableHOC<DataType>(column,[],"dasboard-product-box","Orders",true)();

const Orders = () => {

    const { user } = useSelector((state: RootState) => state.userReducer)

    const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

    const [rows,setRows] = useState<DataType[]>([]);

    if (isError) toast.error((error as CustomError).data.message);


    useEffect(() => {
      if (data) setRows(
        data?.orders.map((i) => ({
          _id: i.user.name,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: <span className={i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>{i.status}</span>,
          action: <Link to={`/admin/transaction/${i._id}`}> Manage</Link>
  
  
        }))
      );
  
  
    }, [data])

const table= TableHOC<DataType>(column,rows,"dasboard-product-box","Orders" ,rows.length>6)();

  return (
    <div className="container">
        <h1>My Orders</h1>
        {isLoading ? (<Skeleton length={20} />  ) : (table)}
       { !table?<h1>NO ORDERS YET</h1>:<h1></h1>
       }
    </div>
  )
}

export default Orders