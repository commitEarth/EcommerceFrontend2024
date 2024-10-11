import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError={
    status:number;
    data:{
        message:string;
        success:boolean;
    }
}

export type MessageResponse= {
    success:boolean;
    message:string;
}

export type UserResponse={
    success:boolean;
    user:User;
}
export type AllUserResponse={
    success:boolean;
    user:User[];
}

export type AllproductsResponse={
    success:boolean;
    products:Product[];
}

export type categoriesResponse={
    success:boolean;
    categories:string[];
}

export type SearchProductResponse={
    success:boolean;
    products:Product[];
    totalPage:number;
}
export type SearchProductRequest={
   price:number;
   page:number;
   category:string;
   sort:string ;
   search:string ;
}


export type NewProductResponse= {
    id:string;
    formData:FormData;
} 

export type ProductResponse={
    success:true;
    products:Product;
}
export type UpdateProductResponse={
    userId:string;
   productId:string;
    formData:FormData;
}
export type DeleteProductResponse={
    userId:string;
   productId:string;
   
}


export type NewOrderRequest={
    shippingInfo:ShippingInfo;
   orderItems:CartItem[];
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    user:string;
}

export type AllOrdersResponse={
    success:boolean;
    orders:Order[];
}
export type OrderDetailResponse={
    success:boolean;
    order:Order;
}
export type updateOrderRequest={
    userId:string;
    orderId:string;
    
}

export type DeleteUserRequest={
    userId:string,
    adminUserId:string;
    
}



//stats


export type StatsResponse={
    success:boolean,
    stats:Stats,
    
}
export type PieResponse={
    success:boolean,
    charts:Pie,
    
}
export type BarResponse={
    success:boolean,
    charts:Bar,
    
}
export type LineResponse={
    success:boolean,
    charts:Line,
    
}
