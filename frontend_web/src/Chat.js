import React, { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';

const Chat=(props)=>{
    const [data,setData]=useState([]);
    const [inputData,setInputData]=useState('');
    const [fileIn,setFileIn]=useState(false);
    const [file,setFile]=useState(false);
    
    const inputField=useRef(null);
    const messages=useRef(null);
    const bottomRef=useRef(null);

    useEffect(()=>{
        if(props.contact){
            let xhr=new XMLHttpRequest();
            xhr.open('POST','/getMessages');
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({contact:props.contact.username}));
            xhr.onload=()=>{
                setData(JSON.parse(xhr.responseText));
            }
        }
    },[props.contact]);
    
    const token = document.cookie.split('=')[1];
    const socket = io({auth:{token}});
    useEffect(()=>{
        socket.emit('setOnline');
    });
    socket.on('incomingMessage',(m)=>{
        console.log(m);
        if(props.contact.username==m.from){
            setData(data.concat(m));
        }
    })
    const send=()=>{
        let m={
            type:'text',
            to:props.contact.username,
            data:inputData,
        }
        socket.emit('privateMessage',m);
        m.from=props.user.username;
        setData(data.concat(m));
        inputField.current.value='';
    }
    return(
        <div className="chatContainer">
        {props.contact?<> 
        <div className="nav_chat">
            <img className="profile1x1" src={props.contact.profilePic}></img>
            <h2>{props.contact.displayname}</h2>
        </div>
        <div ref={messages} className="messages">
            {
                data.map(m=>{
                    return(
                        <Message
                            type={m.type}
                            user={m.from==props.user.username?'send':'recieved'}
                            data={m.data} 
                            text={m.text?m.text:''}
                            />
                    )
                })
            }
            <span ref={bottomRef}></span>
        </div>

        <div className="chatInput">
            <input 
                ref={inputField}
                className="input3"
                onInput={(e)=>{setInputData(e.target.value)}}
                onKeyDown={(e)=>{if(e.key==='Enter'){send()}}}
                />
            <div className="btn2"  onClick={()=>{send()}}>&#10148;</div>
            <div className="btn2" onClick={()=>{
                                                    setFile(null);
                                                    fileIn?setFileIn(false):setFileIn(true)
                                                    }}
                                                    >&#10064;</div>
        </div>
        </>:<>
        <img src="images/blank.png" className="chatAltImage" draggable='false'/>
        </>}
        </div>
    );
}
export default Chat;

const Message=(props)=>{
    if(props.type=='text'){
        let cls='message '+props.user;
        return(
            <div className={cls}>
                {props.data}
            </div>
    );
    }else if(props.type=='image'){
        let cls='message '+props.user;
        return(
            <div className={cls}>
                <img src={props.data}
                onClick={()=>{
                    props.previewImage(props.data);
                }}                
                className='image1x1'/>
                {props.text}
            </div>
            )
    }
}
