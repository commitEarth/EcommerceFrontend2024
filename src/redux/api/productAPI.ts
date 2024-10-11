import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AllproductsResponse, categoriesResponse, DeleteProductResponse, MessageResponse, NewProductResponse, ProductResponse, SearchProductRequest, SearchProductResponse, UpdateProductResponse } from '../../types/api-types'

export const productAPI = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }),
    tagTypes:["product"],
    endpoints: (builder) => ({
        latestProducts: builder.query<AllproductsResponse,string>({ query: () => "latest",  providesTags:["product"]}),

        allProducts: builder.query<AllproductsResponse,string>({ query: (id) => `admin-products?id=${id}`, providesTags:["product"]}),

        categories: builder.query<categoriesResponse,string>({ query: () => `categories`, providesTags:["product"]}),

        searchProducts: builder.query<SearchProductResponse,SearchProductRequest>({ query: ({price,search,sort,page,category}) => {

            let baseQueri=`all?search=${search}&page=${page}`;

            if(price)baseQueri+=`&price=${price}`;
            if(sort)baseQueri+=`&sort=${sort}`;
            if(category)baseQueri+=`&category=${category}`; 

            return baseQueri;
        },
         providesTags:["product"]
    }),

    productDetails: builder.query<ProductResponse,string>({ query: (id) => id,  providesTags:["product"]}),


    newProduct: builder.mutation<MessageResponse,NewProductResponse>({ query: ({formData,id}) => ({
            url:`new?id=${id}`,
             method:"POST",
             body:formData,

        }) ,
        invalidatesTags:["product"]
    }),


    updateProduct: builder.mutation<MessageResponse,UpdateProductResponse>({ query: ({formData,userId,productId}) => ({
        url:`${productId}?id=${userId}`,
         method:"PUT",
         body:formData,

    }) ,
    invalidatesTags:["product"]
    }),

    
   deleteProduct: builder.mutation<MessageResponse,DeleteProductResponse>({ query: ({userId,productId}) => ({
        url:`${productId}?id=${userId}`,
         method:"DELETE",
        
    }) ,
    invalidatesTags:["product"]
    }),

    })
})




export const {useLatestProductsQuery,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery ,useUpdateProductMutation,useDeleteProductMutation }=productAPI 