import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
function EditTextModal({w,h,fS,c,lang,l,top,setModal,editFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [code,setCode]=useState('')
  const [language,setLanguage]=useState('')
  const [fontSize,setFontSize]=useState(1)
  const [x,setX]=useState(0)
  const [y,setY]=useState(0)
  
  useEffect(()=>{
    setFontSize(fS)
    setCode(c)
    setHeight(h)
    setWidth(w)
    setLanguage(lang)
    setX(l)
    setY(top)
  },[])
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    editFn(width,height,code,language,fontSize,x,y)
    setModal(false)
  }
  
  return(
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Update Code Element</Modal.Title>
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
          <Form.Group>
            <Form.Label>Choose programming language</Form.Label>
            <Form.Select aria-label="Programming Language selector" value={language} onChange={e=>setLanguage(e.target.value)}>
              <option value='0'>Select language</option>
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="code"
          >
            <Form.Label> Code</Form.Label>
            <Form.Control as="textarea" value={code} rows={8} onChange={e=>setCode(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fontSize">
            <Form.Label>Enter Font Size (value in em)</Form.Label>
            <Form.Control
              type="decimal"
              value={fontSize}
              onChange={e=>setFontSize(e.target.value)}
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