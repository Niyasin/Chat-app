import { useState ,useEffect } from "react";
import Login from "./Login.js";
import ContactList from "./ContactList.js";
// import Chat from "./Chat.js";
const Container=()=>{
    let [user,setUser]=useState({
        username:'Niyas',
        displayname:'Niyas',
        profilePic:'./images/unknown.jpg',
    });    
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
            <div>Chat Component</div>
        </div>}
        </>
    );
}
export default Container;
