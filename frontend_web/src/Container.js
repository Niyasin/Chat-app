import { useState ,useEffect } from "react";
import Login from "./Login.js";
const Container=()=>{
    let [user,setUser]=useState(false);    
    return(
        <>
        {!user?<Login/>:
        <div className="container">
        </div>}
        </>
    );
}
export default Container;
