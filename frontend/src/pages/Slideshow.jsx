import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState,useRef } from "react";
import Slide from "./Slide";
import {Button,Spinner} from 'react-bootstrap';
import axios from "axios";
import AlertPopUp from "./AlertPopUp";
function Slideshow(){
  const [presentation, setPresentation] = useState(null);
  const [presentations, setPresentations] = useState(null); 
  const [totalSlide,setTotalSlide]=useState(0)
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  const navigate=useNavigate()
  const componentRef = useRef();
  const styles={
    mainAr:{
      height:'70vh',
      width:'70vw',
      marginLeft:"10%"
    },
    slides:{
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
    },
    navigation:{
      textAlign:'center'
      
    }
  }
  const goFullScreen=()=>{
    if (componentRef.current) {  // Ensure componentRef.current is defined
      if (componentRef.current.requestFullscreen) {
        componentRef.current.requestFullscreen();
      } else if (componentRef.current.mozRequestFullScreen) { // Firefox
        componentRef.current.mozRequestFullScreen();
      } else if (componentRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        componentRef.current.webkitRequestFullscreen();
      } else if (componentRef.current.msRequestFullscreen) { // IE/Edge
        componentRef.current.msRequestFullscreen();
      }
    } 
    else {
      setAlert(true)
      const title="ERROR-  Fullscreen"
      setErrorTitle(title)
      setErrorBody("Ref is not attached to the component.")
    }
  }
  const { token,id, num } = useParams();
  if(num<1){
    navigate(`/slidesshow/${token}/${id}/${1}`)
  }
  useEffect(()=>{
    loadData()
  },[num])
  const loadData=()=>{
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
              navigate(`/slideshow/${token}/${id}/${p.slides.length}`)
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
  const handleArrows=(event)=>{
    if (event.key === 'ArrowRight' && num<totalSlide) {
      nextSlide();
    } else if (event.key === 'ArrowLeft'&&num>1) {
      prevSlide();
    }
  }
  const prevSlide=()=>{
    navigate(`/slideshow/${token}/${id}/${parseInt(num)-1}`)
  }
  const nextSlide=()=>{
    navigate(`/slideshow/${token}/${id}/${parseInt(num)+1}`)
  }
  return(
    <>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      {presentation ? (
        <div  style={styles.mainAr} >
          Click on slide to go full screen:
          <div  ref={componentRef} tabIndex={0} onClick={goFullScreen} onKeyDown={handleArrows} style={styles.slides}>
            <div style={styles.navigation}>
              <Button variant="primary"  onClick={prevSlide} disabled={num == 1}>Previous</Button>{' '}
              <Button variant="primary" onKeyDown={(e)=>handleArrows(e)} onClick={nextSlide} disabled={num == totalSlide}>Next</Button>
            </div>
            <Slide 
              presentation={presentation} 
              presentations={presentations}  
              pgNum={num}
            />
          </div>         
        </div>
      ):(
        <div style={styles.spinner}>
          <Spinner style={styles.spinnerBorder} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </> 
  )

}

export default Slideshow