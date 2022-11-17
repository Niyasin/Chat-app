import React, { useEffect, useRef, useState } from "react";


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
                onKeyDown={(e)=>{if(e.key==='Enter'){}}}
                />
            <div className="btn2"  onClick={()=>{}}>&#10148;</div>
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
