import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Signup(props) {

    const [credentials, setCredentials] = useState({email:"",password:"",name:"",cpassword:""})
    let navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password,name:credentials.name})
          });
          const json = await response.json();
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            console.log(json);
            navigate('/');
            props.showAlert("Sign-Up Successful","success");
        }
        else{
            props.showAlert("Invalid Credential","danger");
        }
    }

    const onChange= (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-2'>
            <h2 className='my-2'>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name' aria-describedby="emailHelp" minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" minLength={5}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='password' id="password" minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
