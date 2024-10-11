import { MessageResponse } from "../types/api-types"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import {  SerializedError} from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResType= {
    data: MessageResponse;
} | {
    error: FetchBaseQueryError | SerializedError;
}


export const responseToast=(res:ResType,navigate:NavigateFunction|null,url:string)=>{

    if("data" in res){
        toast.success(res.data.message)
        if(navigate)navigate(url)
           
    }
    else{
        const error =res.error as FetchBaseQueryError;
        const MessageResponse=error.data as MessageResponse;

        toast.error(MessageResponse.message);
    }


}


export const getLastMonths=()=>{
    const currentdate=moment();
    currentdate.date(1);

    const last6month:string[]=[];
    const last12month:string[]=[];

    for(let i =0;i<6;i++){
            const monthDate=currentdate.clone().subtract(i,"months");
            const  monthName=monthDate.format("MMMM");
            last6month.unshift(monthName);
    }
    for(let i =0;i<12;i++){
            const monthDate=currentdate.clone().subtract(i,"months");
            const  monthName=monthDate.format("MMMM");
            last12month.unshift(monthName);
    }
    return {
        last12month,last6month
    }
}