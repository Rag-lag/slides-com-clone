import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AlertPopUp from './AlertPopUp';
function EditImgModal({w,h,i,l,top,setModal,editFn}){
  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)
  const [imgSrc,setImgSrc]=useState('')
  const [imgLink,setImgLink]=useState('')
  const [imgFile,setImgFile]=useState('')
  const [x,setX]=useState(0)
  const [y,setY]=useState(0)
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  
  useEffect(()=>{
    setHeight(h)
    setWidth(w)
    setImgSrc(i)
    setX(l)
    setY(top)
  },[])
  const handleClose=()=>{setModal(false)}
  const fileToDataUrl=(file)=>{
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    if (!valid) {
      setAlert(true)
      const title="ERROR-Invalid File Type"
      setErrorTitle(title)
      setErrorBody("Provided file is not a png, jpg or jpeg image")
      throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  }
  const handleSubmit=()=>{
    if(imgLink){
      editFn(width,height,imgLink,x,y)
      setModal(false)    
    }
    else if(imgFile){
      fileToDataUrl(imgFile).then((data)=>{
        editFn(width,height,data,x,y)
        setModal(false)
      }).catch()
    }
    else{
      editFn(width,height,imgSrc,x,y)
      setModal(false)
    }
  }
  
  return(
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Update Image Element</Modal.Title>
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
              controlId="imgSrc"
            >
              <Form.Label>Upload Image or Enter a URL</Form.Label>
              <Form.Control type='text'  onChange={e=>setImgLink(e.target.value)} />
              <Form.Control type='file'  onChange={e=>setImgFile(e.target.files[0])} />
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

export default EditImgModal