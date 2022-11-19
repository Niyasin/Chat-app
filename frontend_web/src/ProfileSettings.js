import { useEffect, useState } from "react";

 const ProfilSettings=(props)=>{
    const [editPW,setEditPW]=useState(false);
    const [editDN,setEditDN]=useState(false);
    const [file,setFile]=useState(null);
    const [imageURL,setImageURL]=useState(null);
    const [err,setErr]=useState('');
    const [data,setdata]=useState({
        cp:'',
        np1:'',
        np2:'',
        displayname:props.user.name,
    });
    
    useEffect(()=>{
        if(file){

            let rd = new FileReader();
            rd.onload=()=>{
                setImageURL(rd.result);
            }
            rd.readAsDataURL(file);
        } 
    },[file]);
    
    
    const UpdateDN=()=>{
        let xhr=new XMLHttpRequest();
            xhr.open('POST',`/updateDisplayName`);
            xhr.setRequestHeader('Content-Type','application/json');
            xhr.send(JSON.stringify({
                displayname:data.displayname,
                }));
            xhr.onload=()=>{
                    props.reload();
                    setEditDN(false);
            }
    }
    const UpdatePW=()=>{
        console.log(data);
        if(data.np1==data.np2){
            if(data.np1.length>=6){
                let xhr=new XMLHttpRequest();
                xhr.open('POST',`/changePassword`);
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send(JSON.stringify({
                    oldPassword:data.cp,
                    newPassword:data.np1,
                }));
            xhr.onload=()=>{
                if(xhr.responseText=='success'){
                    setEditPW(false);

                }else{
                    setErr('Something went wrong');
                }
            }
                
            }else{
                setErr('Password Must Be 6 Long');
            }
        }else{
            setErr('New Password Is Not Correct');
        }

    }
    const UpdateImage=()=>{
        if(file){
            let xhr=new XMLHttpRequest();
            xhr.open('POST',`/updateProfilePic`);
            let form=new FormData();
            form.append('data',file);
            console.log(form);
            xhr.send(form);
        xhr.onload=()=>{
            if(xhr.responseText=='success'){
                setFile(false);
                setErr('');
                props.reload();
            }else{
                setErr('Something went wrong');
            }
        }
        }
    }
    const handleOpenFile =()=>{
        let input = document.createElement('input');
        input.type='file';
        input.onchange=()=>{
            if(input.files[0].type.substring(0,5)=='image'){
                setFile(input.files[0]);
            }
        }
        input.click();
    }

        return(
        <div className="settingsContainer" >    
             <img className="profile2x2" src={props.user.profilePic} onClick={handleOpenFile}/>
            
                <h1>
                    {props.user.displayname}
                </h1>
                <h3>
                    @{props.user.username}
                </h3> 
                <div className="horizontal">
                    <div className="link" onClick={()=>{setEditPW(false);setEditDN(true);}}>Change Name</div>
                    <div className="link" onClick={()=>{setEditPW(true);setEditDN(false);}}>Change Password</div>
                </div>
            {editPW?<div className="popupBackdrop">
                <div className="popup">
                    <h3>Change Password</h3>
                    <input className="input1" type="password" placeholder="Current Password" onChange={(e)=>{setdata({cp:e.target.value,np1:data.np1,np2:data.np2})}}/>
                    <input className="input1" type="password" placeholder="New Password"onChange={(e)=>{setdata({np1:e.target.value,cp:data.cp,np2:data.np2})}}/>
                    <input className="input1" type="password" placeholder="Confirm New Password" onChange={(e)=>{setdata({np2:e.target.value,cp:data.cp,np1:data.np1})}}/>
                    <span className="error">{err}</span>
                    <div className="horizontal">
                        <div className="btn"onClick={UpdatePW}>Apply</div>
                        <div className="btn" onClick={()=>{setEditPW(false);setErr('');}}>Cancel</div>
                    </div>

                </div>
            </div>
            :<>
            </>
            }

            {editDN?<div className="popupBackdrop">
                <div className="popup">
                <h3>Change Display Name</h3>
                <input className="input1" onChange={(e)=>{setdata({displayname:e.target.value});}} placeholder='Display Name'/>
                <div className="horizontal">
                    <div className="btn" onClick={UpdateDN}>Apply</div>
                    <div className="btn" onClick={()=>{setEditDN(false)}}>Cancel</div>
                </div>
            </div>
            </div>
            :<></>
            }
            {file?
            <div className="popupBackdrop">
            <div className="popup">
                <h3>Change Profile Picture</h3>
                <img className="profile2x2" src={imageURL}  onClick={handleOpenFile}/>
                <div className="horizontal">
                    <div className="btn"onClick={()=>{UpdateImage()}}>Update Image</div>
                    <div className="btn" onClick={()=>{setFile(false);setErr('');}}>Cancel</div>
                </div>
            </div>
            </div>
            :<></>
            }
            </div>     
        );
}

export default ProfilSettings;

