import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Modal,Form} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import AlertPopUp from './AlertPopUp';



function EditTitleThumbnailModal({showModal,setPresentations,presentations,id}){
  const [title,setTitle]=useState('')
  const [thumbnail,setThumbnail]=useState('')
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const handleClose = () => {showModal(false);}
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
  const editTitleThumbnail=()=>{
    let presentationData=presentations
    const token=localStorage.getItem('userToken')
    if(thumbnail){
      fileToDataUrl(thumbnail).then((data)=>{
        if(title){
          presentationData.map((presentation)=>{
            if(presentation.id===id){
              presentation.title=title;
              presentation.thumbnail=data;
            }
          })
        }
        else{
          presentationData.map((presentation)=>{
            if(presentation.id===id){
              presentation.thumbnail=data;
            }
          })
        }
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(()=>{
            setPresentations(presentationData)
            showModal(false)
          })
          .catch((error)=>{
            setAlert(true)
            const title="ERROR-"+error.status
            setErrorTitle(title)
            setErrorBody(error.response.data.error)
          })
      }).catch()
    }
    else{
      if(title){
        presentationData.map((presentation)=>{
          if(presentation.id===id){
            presentation.title=title;
          }
        })
        
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(()=>{
            setPresentations(presentationData)
            showModal(false)
          })
          .catch((error)=>{
            setAlert(true)
            const title="ERROR-"+error.status
            setErrorTitle(title)
            setErrorBody(error.response.data.error)
          }) 
      }
    }
  }
  return (
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Presentation Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editTitle">
              <Form.Label>Edit Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Edit Title"
                value={title}
                onChange={e=>setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="editThumbnail"
            >
              <Form.Label>Uplaod Thumbnail</Form.Label>
              <Form.Control
                type='file'
                onChange={e=>setThumbnail(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editTitleThumbnail}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTitleThumbnailModal