import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Navbar,Nav,Container,Button,Spinner} from 'react-bootstrap';
import DeleteModal from "./DeleteModal";
import EditTitleThumbnailModal from "./EditTitleThumbnailModal";
import styled from "styled-components";
import PresentationSlide from "./PresentationSlide";
import AlertPopUp from "./AlertPopUp";
const Presentation = () => {
  const { id, num } = useParams();
  const [presentation, setPresentation] = useState(null);
  const [presentations, setPresentations] = useState(null);
  const [change, setChange] = useState(0);
  const [toDelete,setToDelete]=useState(false);
  const [toEditTitleThumbnail,setToEditTitleThumbnail]=useState(false)
  const [totalSlide,setTotalSlide]=useState(0)
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const navigate=useNavigate();
  const token=localStorage.getItem("userToken")

  if(num<1){
    navigate(`/slides/${id}/${1}`)
  }

  useEffect(()=>{
    loadData()
  },[totalSlide,toEditTitleThumbnail,change])
  

  const loadData=()=>{
    const token=localStorage.getItem('userToken')
    axios.get("http://localhost:5005/store",{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response)=>{
        const presentationData = Array.isArray(response.data.store) ? response.data.store : [];
        
        presentationData.map((p)=>{
          if(p.id===id){
            setPresentation(p);
            setTotalSlide(p.slides.length)
            if(num>p.slides.length){
              navigate(`/slides/${id}/${p.slides.length}`)
            }
          }
        })
        setPresentations(presentationData)
      })
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })
  }
  const goBack=()=>{
    navigate('/dashboard')
  }
  const deletePresentation=()=>{
    setToDelete(true)
  }
  const editTitleThumbnail=()=>{
    setToEditTitleThumbnail(true)
  }
  const addSlide=()=>{
    const newSlideNum=presentation.slides.length+1
    const presentationData=presentations
    const newSlide={
      page_number:newSlideNum,
      elements:[],
    }
    presentationData.map((p)=>{
      if(p.id==id){
        p.slides.push(newSlide);
        setPresentation(p)
      }
    })
    setPresentations(presentationData)
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(()=>setTotalSlide(totalSlide+1))
      .catch((error)=>{
        setAlert(true)
        const title="ERROR-"+error.status
        setErrorTitle(title)
        setErrorBody(error.response.data.error)
      })
  }
  const prevSlide=()=>{
    navigate(`/slides/${id}/${parseInt(num)-1}`)
  }
  const nextSlide=()=>{
    navigate(`/slides/${id}/${parseInt(num)+1}`)
  }
  const handleArrows=(event)=>{
    if (event.key === 'ArrowRight' && num<totalSlide) {
      nextSlide();
    } else if (event.key === 'ArrowLeft'&&num>1) {
      prevSlide();
    }
  }
  const deleteSlide=()=>{
    if(totalSlide==1){
      deletePresentation()
    }
    else{
      let tempSlides=presentation.slides;
      const updatedSlides = tempSlides.filter(slide => slide.page_number != num);
      const adjustedSlides = updatedSlides.map((slide, index) => ({
        ...slide,
        page_number: index + 1  
      }));
      const presentationData=presentations
      presentationData.map((p)=>{
        if(p.id==id){
          p.slides=adjustedSlides;
          setPresentation(p)
        }
      })
      setPresentations(presentationData)
      axios.put("http://localhost:5005/store",{
        store:presentationData
      },{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(()=>{
          setTotalSlide(totalSlide-1)
          if(num>(totalSlide-1)){
            navigate(`/slides/${id}/${parseInt(num)-1}`)
          }
        })
        .catch((error)=>{
          if(change==1){
            setChange(0)
          }
          else{
            setChange(1)
          }
          setAlert(true)
          const title="ERROR-"+error.status
          setErrorTitle(title)
          setErrorBody(error.response.data.error)
        })
    }
  }
  const previewSlideshow=()=>{
    window.open(`/slideshow/${token}/${id}/${1}`)
  }
  return presentation ? (
    <div>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      {toDelete && (<DeleteModal showModal={setToDelete} presentations={presentations} id={presentation.id}/>)}
      {toEditTitleThumbnail && (<EditTitleThumbnailModal setPresentations={setPresentations} showModal={setToEditTitleThumbnail} presentations={presentations} id={presentation.id}/>)}

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand >
            {presentation.title}
            <Button1 style={styles.btn} onClick={editTitleThumbnail}>📝</Button1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={goBack} >Back</Nav.Link>
              <Nav.Link onClick={deletePresentation} >Delete Presentation</Nav.Link>
              <Nav.Link onClick={addSlide} >Add Slide</Nav.Link>
              <Nav.Link onClick={deleteSlide} >Delete Slide</Nav.Link>
              <Nav.Link onClick={previewSlideshow} >Slideshow preview</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div tabIndex={0} onKeyDown={handleArrows} style={styles.slide}>
        <div style={styles.navigation}>
          <Button variant="primary"  onClick={prevSlide} disabled={num == 1}>Previous</Button>{' '}
          <Button variant="primary" onKeyDown={(e)=>handleArrows(e)} onClick={nextSlide} disabled={num == totalSlide}>Next</Button>
        </div>
        <PresentationSlide  
          presentation={presentation} 
          presentations={presentations} 
          setPresentations={setPresentations} 
          setPresentation={setPresentation} 
          pgNum={num}
          change={change}
          setChange={setChange}
        />
      </div>
    </div>
  ) : (
    <div style={styles.spinner}>
      <Spinner style={styles.spinnerBorder} animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

const Button1=styled.span`
`;
const styles = {
  btn:{
    cursor: "pointer",
  },
  navigation:{
    marginTop:"20px",
    textAlign:'center'
    
  },
  slide:{
    outline: 'none',
    marginBottom:'20px'
  },
  spinner:{
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'inline-block',
  },
  spinnerBorder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  }
};

export default Presentation