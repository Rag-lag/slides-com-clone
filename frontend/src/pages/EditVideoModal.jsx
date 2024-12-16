import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
function EditVideoModal({w,h,v,autoplay,l,top,setModal,editFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [videoLink,setVideoLink]=useState('')
  const [isAP,setAP]=useState(false)
  const [x,setX]=useState(0)
  const [y,setY]=useState(0)
  
  useEffect(()=>{
    setHeight(h)
    setWidth(w)
    setVideoLink(v)
    setAP(autoplay)
    setX(l)
    setY(top)
  },[])
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    editFn(width,height,videoLink,isAP,x,y)
    setModal(false)  
  }
  
  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Update Video Element</Modal.Title>
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
            controlId="videoLink"
          >
            <Form.Label>Update Video URL</Form.Label>
            <Form.Control type='text' value={videoLink}  onChange={e=>setVideoLink(e.target.value)} />
          </Form.Group>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Auto-play video"
            onChange={e=>setAP(e.target.checked)}
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

export default EditVideoModal