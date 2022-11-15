import { useEffect, useState } from "react";
const ContactList=(prop)=>{
    const[search,setSearch]=useState(false);
    const[contacts,setContacts]=useState([]);
    return(
        <div className="contactContainer">
        <div className="nav_contacts">
            <h1>Contacts</h1>
            <input className="input2" placeholder="Search"></input>
        </div>
        <div className="listItems">
            {!search?contacts.map((C)=>{
                return(
                    <ContactListItem
                                key={C.username}
                                contact={C}
                                onClick={()=>{
                                }}/>
                );
            }):search.map((C)=>{
                return(
                    <ContactListItem 
                                contact={C}
                                onClick={(e)=>{}}
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