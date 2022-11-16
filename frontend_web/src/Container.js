import { useState ,useEffect } from "react";
import Login from "./Login.js";
import Chat from "./Chat.js";
import ContactList from "./ContactList.js";

const Container=()=>{
    let [user,setUser]=useState(null);
    let [selected,setSelected]=useState(null);
    
    const onLogin=(username)=>{
        let xhr=new XMLHttpRequest();
        xhr.open('POST','/getUserData');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(JSON.stringify({username}));
        xhr.onload=()=>{
            setUser(JSON.parse(xhr.responseText));
        }
    }

    const logout=()=>{
        document.cookie='token=';
        setUser(null);
        setSelected(null);
    }

    useEffect(()=>{
        const xhr = new XMLHttpRequest();
        xhr.open('POST','/authToken');
        xhr.send();
        xhr.onload=()=>{
            let res=JSON.parse(xhr.responseText);
            if(res.validity){
                onLogin(res.username);
            }
        }
    },[]);

    return(
        <>
        {!user?<Login onLogin={(u)=>{onLogin(u)}}/>:
        <div className="container">
            <ContactList user={user}/>
            <div className="userInfo">
            <img className="profile1x1"
                     src={user.profilePic}
                     onClick={''}
                     />
            <h2>{user.displayname}</h2>
            <div className="btn" onClick={logout}>Logout</div>
        </div>
            <Chat user={user} contact={selected}/>
        </div>}
        </>
    );
}
export default Container;
