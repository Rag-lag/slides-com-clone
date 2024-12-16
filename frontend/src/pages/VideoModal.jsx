import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';

function VideoModal({setModal,addFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [videoLink,setVideoLink]=useState('')
  const [autoPlay,setAutoPlay]=useState(false)

  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    addFn(videoLink,width,height,autoPlay)
    setModal(false)
  }

  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Add Video Element</Modal.Title>
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
            controlId="imgSrc"
          >
            <Form.Label>Enter Video URL</Form.Label>
            <Form.Control type='text' value={videoLink} onChange={e=>setVideoLink(e.target.value)} />
          </Form.Group>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="Auto-play video"
            onChange={e=>setAutoPlay(e.target.checked)}
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

export default VideoModal