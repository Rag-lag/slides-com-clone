import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
function EditTextModal({c,w,h,fS,t,l,top,setModal,editFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [text,setText]=useState('')
  const [fontSize,setFontSize]=useState(1)
  const [color,setColor]=useState('#000000')
  const [x,setX]=useState(0)
  const [y,setY]=useState(0)
  
  useEffect(()=>{
    setFontSize(fS)
    setColor(c)
    setHeight(h)
    setWidth(w)
    setText(t)
    setX(l)
    setY(top)
  },[])
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    editFn(width,height,text,fontSize,color,x,y)
    setModal(false)
  }
  
  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Update Text Element</Modal.Title>
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
          <Form.Group className="mb-3" controlId="x">
            <Form.Label>Enter X-coordinate (value in percentage)</Form.Label>
            <Form.Control
              type="percentage"
              value={x}
              onChange={e=>setX(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="y">
            <Form.Label>Enter Y-coordinate (value in percentage)</Form.Label>
            <Form.Control
              type="percentage"
              value={y}
              onChange={e=>setY(e.target.value)}
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

export default EditTextModal