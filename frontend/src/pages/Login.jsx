import { useState, useRef } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import {styled} from 'styled-components';
import {Button,Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AlertPopUp from './AlertPopUp';

const CenterDiv=styled.div`
    margin-top:200px;
    padding-left:10%;
    padding-right:20%;
    `;

function Login({setTokenFn}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const navigate=useNavigate()
  const passwordRef=useRef(null)  
  const goBack=()=>{
    navigate(-1)
  }  
  const sendToNextField=(e)=>{
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current.focus();
    }
  }
  const loginUser=()=>{
    if(!email){
      setAlert(true)
      setErrorTitle("Empty Email")
      setErrorBody("Please enter email")

    }
    else if(!password){
      setAlert(true)
      setErrorTitle("Empty Password")
      setErrorBody("Please enter password")

    }
    else{
      axios.post('http://localhost:5005/admin/auth/login',{
        email:email,
        password:password,
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
        <h3>Login:</h3>
        <Form >
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  value={email} onKeyDown={(e)=>sendToNextField(e)} onChange={e=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control ref={passwordRef} type="password" placeholder="Password"  value={password} onKeyDown={(e)=>{if(e.key==='Enter'){loginUser()}}} onChange={e=>setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="success" onClick={loginUser}>Submit</Button>{' '}
          <Button variant="secondary" onClick={goBack}>Back</Button>
        </Form>
      </CenterDiv>
    </>
  )
}

export default Login