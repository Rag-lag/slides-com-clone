import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';


function TextModal({setModal,addFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [text,setText]=useState('')
  const [fontSize,setFontSize]=useState(1)
  const [color,setColor]=useState('#000000')
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    addFn(text,width,height,fontSize,color)
    setModal(false)
  }

  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Add Text Element</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="width">
            <Form.Label>Enter width (value in percentage)</Form.Label>
            <Form.Control
              type="percentage"
              value={width}
              onChange={e=>setWidth(e.target.value)}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Enter height (value in percentage)</Form.Label>
            <Form.Control
              type="percentage"
              value={height}
              onChange={e=>setHeight(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="text"
          >
            <Form.Label>Text Content</Form.Label>
            <Form.Control as="textarea" value={text} rows={5} onChange={e=>setText(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontSize">
            <Form.Label>Enter Font Size (value in em)</Form.Label>
            <Form.Control
              type="decimal"
              value={fontSize}
              onChange={e=>setFontSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="color">
            <Form.Label>Enter Color </Form.Label>
            <Form.Control
              type="color"
              value={color}
              onChange={e=>setColor(e.target.value)}
            />
          </Form.Group>
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

export default TextModal