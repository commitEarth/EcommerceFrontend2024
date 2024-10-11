import { useState } from 'react'
import ProductCard from '../components/product-card';
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI';
import { CustomError } from '../types/api-types';
import { toast } from "react-hot-toast";
import { Skeleton } from '../components/loader';
import { CartItem } from '../types/types';
import { addToCart } from '../redux/reducer/cartReducer';
import { useDispatch } from 'react-redux';

const Search = () => {

  const { data: categoriesResponse, isLoading: loadingCategories, isError, error } = useCategoriesQuery("");


  const [search, setsearch] = useState("");
  const [sort, setsort] = useState("");
  const [maxPrice, setmaxPrice] = useState(1000000);
  const [category, setcategory] = useState("");
  const [page, setpage] = useState(1);


  const { 
    isLoading: productLoading, 
    data: searchedData,isError:productIsError,error: productError} = 
  useSearchProductsQuery({
     search, 
     sort,
     category, 
     page, 
     price: maxPrice,
     
    });
    
    const dispatch=useDispatch();
    
    const addToCartHandler = (cartItem:CartItem) => {
      if(cartItem.stock<1)return toast.error("Out Of Stock") ;
      dispatch(addToCart(cartItem));
      toast.success("Item added to Cart")
     };

  const isNextPage = page < 4;
  const isPrevPage = page > 1;


  if (isError) toast.error((error as CustomError).data.message)
  if (productIsError) toast.error((productError as CustomError).data.message)


  return (
    <div className='product-search-page'>
      <aside>
        <h2>Filter</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setsort(e.target.value)}>
            <option value=""> None</option>
            <option value="asc"> Price (Low to High)</option>
            <option value="dsc"> Price (High to Low)</option>

          </select>

        </div>



        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setcategory(e.target.value)}>
            <option value=""> All</option>

            {
              !loadingCategories && categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>{i.toLocaleUpperCase()}</option>
              ))
            }



          </select>

        </div>


        <div>
          <h4> Max Price: {maxPrice || ""}</h4>
          <input type="range" min={100} max={1000000} value={maxPrice} onChange={(e) => setmaxPrice(Number(e.target.value))} ></input>
        </div>

      </aside>

      <main>
        <h1>Products</h1>
        <input type="text" className="text" placeholder='Search by Name...' value={search} onChange={(e) => setsearch(e.target.value)} />
          
        {
          productLoading ? <Skeleton/> :(
            <div className="search-product-list">
            {
             searchedData?.products.map((i)=>(
               <ProductCard
               key={i._id}
               productId={i._id}
               name={i.name} 
               price={i.price}
               handler={addToCartHandler}
               photo={i.photo}
               stock={i.stock}
             />
   
             ))
            }
           </div>
          )
        }
        
       
       {
        searchedData && searchedData.totalPage >1 && (
          <article>
          <button disabled={!isPrevPage} onClick={() => setpage((prev) => prev - 1)}>Prev</button>
          <span>{page} of {searchedData.totalPage}</span>
          <button disabled={!isNextPage} onClick={() => setpage((prev) => prev + 1)}>Next</button>
        </article>
        )
       }


      </main>

    </div>
  )
}

export default Search