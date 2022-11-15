import { useState ,useEffect } from "react";
import Login from "./Login.js";
import Chat from "./Chat.js";
import ContactList from "./ContactList.js";

const Container=()=>{
    let [user,setUser]=useState(null);
    let [selected,setSelected]=useState(null) 
    return(
        <>
        {!user?<Login/>:
        <div className="container">
            <ContactList/>
            <div className="userInfo">
            <img className="profile1x1"
                     src={user.profilePic}
                     onClick={''}
                     />
            <h2>{user.displayname}</h2>
            <div className="btn" onClick={()=>{}}>Logout</div>
        </div>
            <Chat user={user} contact={selected}/>
        </div>}
        </>
    );
}
export default Container;
