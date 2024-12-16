import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertPopUp from './AlertPopUp';



function DeleteModal({showModal,presentations,id}){
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const navigate=useNavigate()
  const handleClose = () => {showModal(false);}
  const deletePresentation=()=>{
    const token=localStorage.getItem('userToken')
    const presentationData=presentations
    presentationData.map((presentation)=>{
      if(presentation.id===id){
        presentation.isVisible=false;
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(()=>{
        showModal(false)
        navigate('/dashboard')
      })
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })
  }
  return (
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Presentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wanna delete this presentation</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={deletePresentation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal