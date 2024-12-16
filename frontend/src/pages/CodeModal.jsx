import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';

function CodeModal({setModal,addFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [code,setCode]=useState('')
  const [language,setLanguage]=useState('')
  const [fontSize,setFontSize]=useState(1)
  const handleClose=()=>{setModal(false)}
  const handleSubmit=()=>{
    addFn(code,language,width,height,fontSize)
    setModal(false)
  }

  return(
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Code Element</Modal.Title>
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
            <Form.Group>
              <Form.Label>Choose programming language</Form.Label>
              <Form.Select aria-label="Programming Language selector" onChange={e=>setLanguage(e.target.value)}>
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
              <Form.Label>Code</Form.Label>
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
    </>
  )
}

export default CodeModal