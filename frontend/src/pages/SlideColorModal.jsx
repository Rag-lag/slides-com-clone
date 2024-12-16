import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';

function SlideColorModal({updateFn,setModal}){
  const [color,setColor]=useState('#ffffff')
  const [applyAll,setApplyAll]=useState(false)

  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    updateFn(applyAll,0,color,'','','')
    setModal(false)
  }

  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Add Solid Color to Slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Pick A Color </Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={e=>setColor(e.target.value)}
            />
          </Form.Group>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Apply to all slides"
            onChange={e=>setApplyAll(e.target.checked)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SlideColorModal