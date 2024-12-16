import { useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {styled} from 'styled-components';
import {Button,Form} from 'react-bootstrap';
import { useNavigate} from "react-router-dom";
import AlertPopUp from './AlertPopUp';


const CenterDiv=styled.div`
    margin-top:200px;
    padding-left:10%;
    padding-right:20%;
    `;
const Alert=styled.div`
    color: red;
    font-size:0.8em;
`;

function Register({setTokenFn}){
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [cnfrmPassword,setCnfrmPassword]=useState('');
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const emailRef=useRef(null)
  const passwordRef=useRef(null)
  const cnfrmPasswordRef=useRef(null)  
  const navigate=useNavigate()
  const sendToNextField=(e, nextRef)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current.focus();
    }
  }
  const goBack=()=>{
    navigate(-1)
  }
  const isValidEmail=(mail)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(mail);
  }
  const registerUser=()=>{
    if(!name || !email || !password){
      setAlert(true)
      setErrorTitle("Empty field(s)")
      setErrorBody("Please ensure that all fields are filled")
    }
    if(!isValidEmail(email)){
      setAlert(true)
      setErrorTitle("Invalid Email")
      setErrorBody("Please enter a valid email")
    }
    else if(password!=cnfrmPassword){
      setAlert(true)
      setErrorTitle("You were warned")
      setErrorBody("Passwords don't match")
    }
    else{
      axios.post('http://localhost:5005/admin/auth/register',{
        email:email,
        password:password,
        name:name,
      })
        .then((response)=>{
          localStorage.setItem('userToken',response.data.token)
          setTokenFn(response.data.token)
          navigate('/dashboard')
        })
        .catch((error)=>{
          setAlert(true)
          const title="ERROR-"+error.status
          setErrorTitle(title)
          setErrorBody(error.response.data.error)
        })
    }
  }
  return(
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      <CenterDiv>
        <h3>Register:</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onKeyDown={(e)=>sendToNextField(e,emailRef)} onChange={e=>setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control ref={emailRef} type="email" placeholder="Enter email" value={email} onKeyDown={(e)=>sendToNextField(e,passwordRef)} onChange={e=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" placeholder="Password" value={password} onKeyDown={(e)=>sendToNextField(e,cnfrmPasswordRef)} onChange={e=>setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCnfrmPassword">
            <Form.Label>Re-Enter Password</Form.Label>
            <Form.Control ref={cnfrmPasswordRef} type="password" placeholder="Confirm Password" value={cnfrmPassword} onKeyDown={(e)=>{if(e.key==='Enter'){registerUser()}}} onChange={e=>setCnfrmPassword(e.target.value)} />
            {password!=cnfrmPassword && (<Alert>The 2 passwords don&apos;t match</Alert>)}
          </Form.Group>
        </Form>
        <Button variant="success" onClick={registerUser}>Submit</Button>{' '}
        <Button variant="secondary" onClick={goBack}>Back</Button>
      </CenterDiv>
    </>
  )

}

export default Register