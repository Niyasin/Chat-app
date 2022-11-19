import { useState ,useEffect } from "react";
import Login from "./Login.js";
import Chat from "./Chat.js";
import ContactList from "./ContactList.js";

const Container=()=>{
    let [user,setUser]=useState(null);
    let [selected,setSelected]=useState(null);
    let [imagePreview,setImagePreview]=useState(null);
    
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
    const saveImage=(data)=>{
        var link=document.createElement('a');
        link.download=new Date().toLocaleTimeString().replace(' ','').replace(':','').replace(':','');
        link.href=data;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        window.addEventListener('keydown',(e)=>{
            if(e.key==='Escape'){
                setImagePreview(null);
            }
        })
    },[]);

    return(
        <>
        {!user?<Login onLogin={(u)=>{onLogin(u)}}/>:
        <>
        {imagePreview?<div className="imagePreview">
            <img src={imagePreview}></img>
            <div className="horizontal">
                <div className="btn" onClick={()=>{setImagePreview(null)}}>Cancel</div>
                <div className="btn" onClick={()=>{saveImage(imagePreview)}}>Save</div>
            </div>
        </div>:<></>}
        <div className="container">
            <ContactList user={user} setSelected={setSelected}/>
            <div className="userInfo">
            <img className="profile1x1"
                     src={user.profilePic}
                     onClick={()=>{}}
                     />
            <h2>{user.displayname}</h2>
            <div className="btn" onClick={logout}>Logout</div>
        </div>
            <Chat user={user} contact={selected} setImagePreview={setImagePreview}/>
        </div>
        </>
        }
        </>
    );
}
export default Container;
