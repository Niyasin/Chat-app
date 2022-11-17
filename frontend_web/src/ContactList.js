import { useEffect, useState } from "react";
const ContactList=(prop)=>{
    const[search,setSearch]=useState(false);
    const[contacts,setContacts]=useState([]);

    const handleSearch=(e)=>{
        if(e.target.value.length>2){
            let xhr=new XMLHttpRequest();
            xhr.open('POST',`/search?q=${e.target.value}`);
            xhr.send();
            xhr.onload=()=>{
                setSearch(JSON.parse(xhr.responseText));
            }
        }else{
            setSearch(false);
        }
    }
    const handleAddContact=(contact)=>{
        setSearch(false);
        let xhr=new XMLHttpRequest();
            xhr.open('POST',`/addContact`);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                contact
            }));
            xhr.onload=()=>{
                if(xhr.responseText=='contact added'){
                    loadContacts();
                }
            }
    }
    const loadContacts=()=>{
        let xhr=new XMLHttpRequest();
        xhr.open('POST','/getContacts');
        xhr.send();
        xhr.onload=()=>{
            let res=JSON.parse(xhr.responseText);
            setContacts(res);console.log('loaded');
        }
    }
    useEffect(loadContacts,[]);

    return(
        <div className="contactContainer">
        <div className="nav_contacts">
            <h1>Contacts</h1>
            <input className="input2" placeholder="Search" onChange={(e)=>{handleSearch(e)}}></input>
        </div>
        <div className="listItems">
            {!search?contacts.map((C)=>{
                return(
                    <ContactListItem
                                key={C.username}
                                contact={C}
                                onClick={()=>{
                                    prop.setSelected(C);
                                }}/>
                );
            }):search.map((C)=>{
                return(
                    <ContactListItem 
                                contact={C}
                                onClick={(e)=>{handleAddContact(C.username)}}
                                />
                )
            })}

        </div>
        </div>
    );
}
const ContactListItem=(props)=>{
    return(
        <div className="ContactListItem" onClick={props.onClick}>
            <img className="profile1x1" src={props.contact.profilePic} draggable='false'/>
            <h3>{props.contact.displayname}</h3>
            <span>@{props.contact.username}</span>
        </div>
    );
}

export default ContactList;