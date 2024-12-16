import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';

function NewPresentationModal({setNewPresentationModal,onCreate}){
  const [newPresentationName,setNewName]=useState('')
  const [newPresentationDescription,setNewDescription]=useState('')
  const handleClose = () => {setNewPresentationModal(false);}
  const createNew=()=>{
    if(newPresentationName){
      onCreate(newPresentationName,newPresentationDescription)
    }
  }
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="presentationName">
          <Form.Label>Title for Presentation</Form.Label>
          <Form.Control
            type="name"
            placeholder="New Title"
            value={newPresentationName}
            onChange={e=>setNewName(e.target.value)}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="presentationDescription">
          <Form.Label>Title for Presentation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={newPresentationDescription}
            onChange={e=>setNewDescription(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={createNew}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewPresentationModal