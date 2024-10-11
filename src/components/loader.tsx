
const Loader = () => {
  return (
    
    <div className="loadmeparent">

      <div className="loadme">
        
        </div>
    </div>
    
  )
}

export default Loader


export const Skeleton=({width="unset",length=3}:{width?:string,length?:number})=>{
 
  
    const skeletonArray= Array.from({length},(_,idx)=>(
      <div key={idx} className="skeleton-shape" style={{width}}> </div>
      )
    )
    return(
      <div className="skeleton-loader">
        {skeletonArray}
        </div>

    )

}