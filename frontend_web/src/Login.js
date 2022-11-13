import { useEffect, useState } from "react";

const Login=(prop)=>{
    const [lg,setlg]=useState(true);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');

    useEffect(()=>{
        document.querySelectorAll('h1,.btn,.link').forEach(e=>{
            e.animate([
                {transform:'translateX(-5px)'},
                {transform:'translateX(5px)',filter:'blur(2px)'},
                {transform:'translateX(-10px)'},
                {transform:'translateX(5px)'},
                {transform:'translateX(-5px)'},
                {transform:'translateX(-10px)',filter:'blur(0px)'},
                {transform:'translateX(0px)'},
            ],{duration:100})
        })
    },[lg]);
    
    if(lg){
        return(
            <div className="login_container">
                
                <h1>Login</h1>
                <input  className="input1"
                        type="username" 
                        id="username" 
                        placeholder="Username"
                        onChange={(e)=>{setUsername(e.target.value)}}
                />
                <input  className="input1" 
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                />
                <span className="error">{error}</span>
                <div className="btn"
                                onClick={()=>{}}
                                >Login</div>
                <span className="link"
                                onClick={()=>{lg?setlg(false):setlg(true);}}
                                >Dont have anaccount?</span>
                </div>
            );
    }else{
        return(
            <div className="login_container">
                <h1>Signup</h1>
                <input  className="input1"
                        type="username" 
                        id="username" 
                        placeholder="Username"
                        onChange={(e)=>{setUsername(e.target.value)}}
                />
                <input  className="input1" 
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e)=>{setPassword(e.target.value)}}
                />
                <span className="error">{error}</span>
                <div className="btn" onClick={()=>{}}>Signup</div>
                <span className="link"onClick={()=>{lg?setlg(false):setlg(true);}}
                >Already have anaccount?</span>
                </div>
            );
    }
    
}


export default Login;
