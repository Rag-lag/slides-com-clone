import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import { useState } from 'react';
import AlertPopUp from './AlertPopUp';


function SlideImageModal({updateFn,setModal}){
  const [imgFile,setImgFile]=useState('')
  const [applyAll,setApplyAll]=useState(false)
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
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
    fileToDataUrl(imgFile).then((data)=>{
      updateFn(applyAll,2,'','','',data)
      setModal(false)
    })
      .catch()
    
  }

  return(
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Image as Background to Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="imgFile"
            >
              <Form.Label>Upload Background Image </Form.Label>
              <Form.Control type='file' onChange={e=>setImgFile(e.target.files[0])} />
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
    </>
  )
}

export default SlideImageModal