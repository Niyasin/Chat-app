import { useState ,useEffect } from "react";
import Login from "./Login.js";
import ContactList from "./ContactList.js";
// import Chat from "./Chat.js";
const Container=()=>{
    let [user,setUser]=useState(true);    
    return(
        <>
        {!user?<Login/>:
        <div className="container">
            <div>User info</div>
            <ContactList/>
            <div>Chat Component</div>
        </div>}
        </>
    );
}
export default Container;
