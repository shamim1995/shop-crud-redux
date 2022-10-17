import Skeleton from "react-loading-skeleton";

export const BlogPost = (props)=>{
  return (
    <>
      
         <>
            <h1>{props.title || <Skeleton />}</h1>
            {props.body || <Skeleton count={10} />}
        </>
      
    </>
  );
}