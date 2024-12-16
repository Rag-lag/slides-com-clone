import { useState, useEffect } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NewPresentationModal from './NewPresentationModal';
import PresentationCard from './PresentationCard';
import AlertPopUp from './AlertPopUp';

function Dashboard({setTokenFn}){
  const [newPresentationModal,setNewPresentationModal]=useState(false)
  const [presentations, setPresentations] = useState([]);
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const navigate=useNavigate()
  const token=localStorage.getItem('userToken')
  useEffect(()=>{
    if(!token || errorBody==='Invalid token'){
      navigate('/')
    }
  },[])  
  useEffect(()=>{
    loadData()
  },[])
  const createPresentation=(title,description)=>{
    let newPresentation = {
      id: Date.now().toString(),
      title:title,
      isVisible:true,
      description:description,
      thumbnail:"",
      slides: [{page_number:1, elements:[] }],
    }
    let updatedPresentations = presentations ? [...presentations, newPresentation] : [newPresentation];
    setPresentations(updatedPresentations);
    axios.put("http://localhost:5005/store",{
      store:updatedPresentations,
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(()=>{
        setNewPresentationModal(false)
      })
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })  
  }
  const loadData=()=>{
    axios.get("http://localhost:5005/store",{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response)=>{
        const presentationData = Array.isArray(response.data.store) ? response.data.store : [];
        setPresentations(presentationData);
      })
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })
  }  
  const logout=()=>{
    axios.post('http://localhost:5005/admin/auth/logout',{},{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(()=>{
        localStorage.removeItem('userToken')
        setTokenFn(null)
        navigate('/')
      })
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })
  }
  return(
    <div>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      {newPresentationModal && 
      (<NewPresentationModal 
        setNewPresentationModal={setNewPresentationModal} 
        onCreate={createPresentation}>
      </NewPresentationModal>)}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Presto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>setNewPresentationModal(true)} >Create</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {presentations && (
        <div style={styles.listContainer}>
          {presentations.map((presentation) => {
            if(presentation.isVisible){
              return (
                <PresentationCard
                  key={presentation.id}
                  id={presentation.id}
                  name={presentation.title}
                  thumbnail={presentation.thumbnail}
                  description={presentation.description}
                  slideCount={presentation.slides.length}
                />
              )
            }
          })}
        </div>
      )}
    </div>
  )
}
const styles = {
  listContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    padding: "20px",
    justifyContent: "center",
    alignItems: "flex-start",
  },
};

export default Dashboard