import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import {styled} from 'styled-components';
import { useNavigate } from 'react-router-dom';


const WelcomeDiv=styled.div`
        text-align: center;
        margin-top:200px;
    `;

function Landing({token}){
  const navigate=useNavigate()
  if(token){
    navigate('/dashboard')
  }
  const register=()=>{
    navigate('/register')
  }
  const login=()=>{
    navigate('/login')
  }
  return(
    <WelcomeDiv>
      <h1>
        Welcome To Presto:
      </h1>
      <p>Continue with either login or register to make beautiful slides</p>
      <span>
        <Button variant="primary" onClick={login}>Login</Button>{' '}
        <Button variant="info"onClick={register}>Register</Button>
      </span>
    </WelcomeDiv>
    
  )
}

export default Landing