import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';


function ImageModal({setModal,addFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [imgUpload,setImgUpload]=useState('')
  const [imgLink,setImgLink]=useState('')
  const [imgDescription,setImgDescription]=useState('')
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    addFn(imgUpload,imgLink,width,height,imgDescription)
    setModal(false)
  }

  return(
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Image Element</Modal.Title>
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
              <Form.Label>Upload Image or Enter a URL</Form.Label>
              <Form.Control type='text' value={imgLink} onChange={e=>setImgLink(e.target.value)} />
              <Form.Control type='file'  onChange={e=>setImgUpload(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imgDescription">
              <Form.Label>Enter Description of Image</Form.Label>
              <Form.Control
                type="text"
                value={imgDescription}
                onChange={e=>setImgDescription(e.target.value)}
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
    </>
  )
}

export default ImageModal