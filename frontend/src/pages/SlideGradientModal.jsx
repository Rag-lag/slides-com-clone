import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';

function SlideGradientModal({updateFn,setModal}){
  const [color,setColor]=useState('#ffffff')
  const [color1,setColor1]=useState('#ffffff')
  const [direction,setDirection]=useState('to bottom')


  const [applyAll,setApplyAll]=useState(false)

  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    updateFn(applyAll,1,color,color1,direction,'')
    setModal(false)
  }

  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Add Gradient to Slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Pick A Color-1 </Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={e=>setColor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="color1">
            <Form.Label>Pick A Color-1 </Form.Label>
            <Form.Control
              type="color"
              value={color1}
              onChange={e=>setColor1(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Choose Direction of Gradient</Form.Label>
            <Form.Select aria-label="Gradient Direction Selector" onChange={e=>setDirection(e.target.value)}>
              <option value='to bottom'>Vertical</option>
              <option value="to right">Horizontal</option>
              <option value="to bottom right">Diagonal</option>
            </Form.Select>
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

export default SlideGradientModal