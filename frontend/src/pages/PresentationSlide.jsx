import {useState,useEffect} from 'react';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import TextModal from "./TextModal";
import ImageModal from './ImageModal.jsx'
import VideoModal from './VideoModal.jsx';
import CodeModal from './CodeModal.jsx';
import EditTextModal from './EditTextModal';
import EditImgModal from './EditImgModal.jsx';
import EditVideoModal from './EditVideoModal.jsx';
import EditCodeModal from './EditCodeModal.jsx';
import SlideColorModal from './SlideColorModal.jsx';
import SlideGradientModal from './SlideGradientModal.jsx';
import SlideImageModal from './SlideImageModal.jsx';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AlertPopUp from './AlertPopUp.jsx';

function PresentationSlide({change,setChange, presentation, presentations,setPresentations ,setPresentation, pgNum}) {
  const [showTextModal, setTextModal]=useState(false)
  const [editTextModal, setEditTextModal]=useState(false)
  const [editImgModal, setEditImgModal]=useState(false)
  const [editVideoModal, setEditVideoModal]=useState(false)
  const [editCodeModal, setEditCodeModal]=useState(false)
  const [currEdit,setCurrEdit]=useState(-1)
  const [currwidth,setWidth]=useState(0)
  const [currHeight,setHeight]=useState(0)
  const [currText,setText]=useState('')
  const [currFontSize,setFontSize]=useState(1)
  const [currColor,setColor]=useState('#000000')
  const [currLeft,setLeft]=useState(0)
  const [currTop,setTop]=useState(0)
  const [currImg,setImg]=useState('')
  const [currVideo,setVideo]=useState('')
  const [isAP,setAP]=useState(false)
  const [currCode,setCode]=useState('')
  const [currLang,setLanguage]=useState('')
  const [showImageModal, setImageModal]=useState(false)
  const [showVideoModal, setVideoModal]=useState(false)
  const [showCodeModal, setCodeModal]=useState(false)
  const [slideColor, setSlideColor]=useState(false)
  const [slideGradient, setSlideGradient]=useState(false)
  const [slideImage, setSlideImage]=useState(false)
  const [elements,setElements]=useState([])
  const [fontFamily,setFontFamily]=useState('Times New Roman')
  const token=localStorage.getItem('userToken')
  const [popup,setAlert]=useState(false)
  const [errorTitle,setErrorTitle]=useState('');
  const [errorBody,setErrorBody]=useState('');
  useEffect(()=>{
    presentation.slides.map((pg)=>{
      if(pg.page_number==pgNum){
        setElements(pg.elements)
      }
    })
  },[pgNum,elements,presentation,presentations,fontFamily,showImageModal,showCodeModal,showVideoModal,showTextModal,editTextModal,editImgModal,editVideoModal,editCodeModal])
  const styles={
    drpDwnAdd:{
      marginLeft:'10%',
      marginTop:'1%'
    },
    drpDwnFont:{
      marginLeft:'2%',
      marginTop:'1%'
    },
    drpDwnBG:{
      marginLeft:'2%',
      marginTop:'1%'
    },
    text:{
      border:'1px solid #d3d3d3'
    },
    slideNum:{
      fontSize: '1em',
      position:'absolute',
      bottom:'3px',
      left:'5px',
    },
  }
  const showText=()=>{
    setTextModal(true)
  }
  const showImg=()=>{
    setImageModal(true)
  }
  const showVideo=()=>{
    setVideoModal(true)
  }
  const showCode=()=>{
    setCodeModal(true)
  }
  const handleDeleteElement=(e,zIndex)=>{
    if(e.button===2){
      let filteredElements = elements.filter((el)=> { return el.z_index !=zIndex ; });
      const newElements=filteredElements.map((element, index) => ({
        ...element,
        z_index: index   
      }));
      setElements(newElements)
      const id=presentation.id
      const presentationData=[...presentations]
      presentationData.map((p)=>{  
        if(p.id===id){
          p.slides.map((pg)=>{
            if(pg.page_number==pgNum){
              pg.elements=newElements   
            }
          })
        }
      })
      axios.put("http://localhost:5005/store",{
        store:presentationData
      },{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(setPresentations(presentationData))
        .catch((error)=>{
          alert("error",error)
        })
      
    }
  }
  const editText=(zIndex,width,height,fontSize,color,text,left,top)=>{
    setCurrEdit(zIndex)
    setColor(color)
    setWidth(width)
    setHeight(height)
    setFontSize(fontSize)
    setText(text)
    setLeft(left)
    setTop(top)
    setEditTextModal(true)
  }
  const editImg=(zIndex,width,height,src,left,top)=>{
    setCurrEdit(zIndex)
    setImg(src)
    setWidth(width)
    setHeight(height)
    setLeft(left)
    setTop(top)
    setEditImgModal(true)
  }
  const editVideo=(zIndex,width,height,src,autoplay,left,top)=>{
    setCurrEdit(zIndex)
    setVideo(src)
    setAP(autoplay)
    setWidth(width)
    setHeight(height)
    setLeft(left)
    setTop(top)
    setEditVideoModal(true)
  }
  const editCode=(zIndex,width,height,fontSize,code,language,left,top)=>{
    setCurrEdit(zIndex)
    setWidth(width)
    setHeight(height)
    setFontSize(fontSize)
    setCode(code)
    setLanguage(language)
    setLeft(left)
    setTop(top)
    setEditCodeModal(true)
  }
  const onEditTextFn=(width,height,text,fontSize,color,x,y)=>{
    const id=presentation.id
    const presentationData=presentations
    let z_index=currEdit
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){

            pg.elements.map((ele)=>{
              if(ele.z_index===z_index){
                ele.content=text
                ele.width=width
                ele.height=height
                ele.fontSize=fontSize
                ele.color=color
                ele.left=x
                ele.top=y
              }
            })   
          }
        })
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setPresentations(presentationData))
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
  const onEditImgFn=(width,height,img_src,x,y)=>{
    const id=presentation.id
    const presentationData=presentations
    let z_index=currEdit
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){

            pg.elements.map((ele)=>{
              if(ele.z_index===z_index){
                ele.img_src=img_src
                ele.width=width
                ele.height=height
                ele.left=x
                ele.top=y
              }
            })   
          }
        })
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setPresentations(presentationData))
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
  const onEditVideoFn=(width,height,video_src,autoplay,x,y)=>{
    if(autoplay===undefined){
      autoplay=false
    }
    const id=presentation.id
    const presentationData=presentations
    let z_index=currEdit
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){
            pg.elements.map((ele)=>{
              if(ele.z_index===z_index){
                ele.video_src=video_src
                ele.width=width
                ele.height=height
                ele.auto_play=autoplay
                ele.left=x
                ele.top=y
              }
            })   
          }
        })
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setPresentations(presentationData))
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
  const onEditCodeFn=(width,height,code,language,fontSize,x,y)=>{
    const id=presentation.id
    const presentationData=presentations
    let z_index=currEdit
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){

            pg.elements.map((ele)=>{
              if(ele.z_index===z_index){
                ele.content=code
                ele.language=language
                ele.width=width
                ele.height=height
                ele.fontSize=fontSize
                ele.left=x
                ele.top=y
              }
            })   
          }
        })
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setPresentations(presentationData))
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
  const updateFontFamily=(fontFam)=>{
    setFontFamily(fontFam)
    const id=presentation.id
    const presentationData=presentations
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){

            pg.elements.map((ele)=>{
              if(ele.content_type==="text"){
                ele.font_family=fontFam
              }
            })   
          }
        })
      }
    })
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setPresentations(presentationData))
      .catch((error)=>{
        if(change==1){
          setChange(0)
        }
        else{
          setChange(1)
        }
        alert("error",error)
      })
  }
  const showSlideColor=()=>{
    setSlideColor(true)
  }
  const showSlideGradient=()=>{
    setSlideGradient(true)
  }
  const showSlideImage=()=>{
    setSlideImage(true)
  }
  const updateFn=(setAll,flag,c1,c2,direction,imgFile)=>{
    if(setAll){
      if(flag===0){
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              pg.backgroundColor=`${c1}`
              pg.background=''   
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
      }
      else if(flag===1){
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              pg.background=`linear-gradient(${direction},${c1},${c2})`   
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
      }
      else{
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              pg.background=`url(${imgFile})`   
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
  
      }
    }
    else{
      if(flag===0){
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              if(pg.page_number==pgNum){
                pg.backgroundColor=`${c1}` 
                pg.background=''   
              }
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
      }
      else if(flag===1){
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              if(pg.page_number==pgNum){
                pg.background=`linear-gradient(${direction},${c1},${c2})`   
              }
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
      }
      else{
        const id=presentation.id
        const presentationData=presentations
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              if(pg.page_number==pgNum){
                pg.background=`url(${imgFile})`   
              }
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(setPresentations(presentationData))
          .catch((error)=>{
            if(change==1){
              setChange(0)
            }
            else{
              setChange(1)
            }
            alert("error",error)
          })
      }
    }
  }
  const fileToDataUrl=(file)=>{
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    if (!valid) {
      setAlert(true)
      const title="ERROR=Invalid Imgae type"
      setErrorTitle(title)
      setErrorBody('Provided file is not a png, jpg or jpeg image.')
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
  const addTextFn=(text,width,height,fontSize,color)=>{
    const id=presentation.id
    const presentationData=presentations
    let z_index=0
    presentation.slides.map((pg)=>{
      if(pg.page_number==pgNum){
        z_index=pg.elements.length
      }
    })
    const newElement={
      content_type:"text",
      content:text,
      width:width,
      height:height,
      fontSize:fontSize,
      color:color,
      left:0,
      top:0, 
      z_index:z_index
    }
    presentationData.map((p)=>{  
      if(p.id===id){
        p.slides.map((pg)=>{
          if(pg.page_number==pgNum){
            pg.elements.push(newElement)   
          }
        })
      }
    })
    
    axios.put("http://localhost:5005/store",{
      store:presentationData
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(()=>{setPresentations(presentationData)})
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
  const addImgFn=(imgUpload,imgLink,width,height,imgDescription)=>{
    const token=localStorage.getItem('userToken')
    const id=presentation.id
    let presentationData=[...presentations]
    let pData=[...presentation.slides]
    let z_index=0
    pData.map((pg)=>{
      if(pg.page_number==pgNum){
        z_index=pg.elements.length
      }
    })
    if(imgLink){
      const newElement={
        content_type:"image",
        img_src:imgLink,
        width:width,
        height:height,
        img_description:imgDescription, 
        left:0,
        top:0,
        z_index:z_index
      }
      presentationData.map((p)=>{  
        if(p.id===id){
          p.slides.map((pg)=>{
            if(pg.page_number==pgNum){
              pg.elements.push(newElement)   
            }
          })
        }
      })
      axios.put("http://localhost:5005/store",{
        store:presentationData
      },{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(()=>{
          setPresentations(presentationData)
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
    else{
      fileToDataUrl(imgUpload).then((data)=>{
        const newElement={
          content_type:"image",
          img_src:data,
          width:width,
          height:height,
          img_description:imgDescription, 
          left:0,
          top:0,
          z_index:z_index
        }
        presentationData.map((p)=>{  
          if(p.id===id){
            p.slides.map((pg)=>{
              if(pg.page_number==pgNum){
                pg.elements.push(newElement)   
              }
            })
          }
        })
        axios.put("http://localhost:5005/store",{
          store:presentationData
        },{
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(()=>{
            setPresentations(presentationData)
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
            // setModal(false)
          })    
      })
    }
    
  }
  const addVideoFn=(videoLink,width,height,autoPlay)=>{
    const id=presentation.id
    const presentationData=presentations
    let z_index=0
    presentation.slides.map((pg)=>{
      if(pg.page_number==pgNum){
        z_index=pg.elements.length
      }
    })
    if(videoLink){
      const newElement={
        content_type:"video",
        video_src:videoLink,
        width:width,
        height:height, 
        auto_play:autoPlay,
        left:0,
        top:0,
        z_index:z_index
      }
      presentationData.map((p)=>{  
        if(p.id===id){
          p.slides.map((pg)=>{
            if(pg.page_number==pgNum){
              pg.elements.push(newElement)   
            }
          })
        }
      })
      
      axios.put("http://localhost:5005/store",{
        store:presentationData
      },{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(()=>{
          setPresentations(presentationData)
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
    else{
      setAlert(true)
      const title="ERROR- No video link"
      setErrorTitle(title)
      setErrorBody("You haven't entered a link")
    }
  }
  const addCodeFn=(code,language,width,height,fontSize)=>{
    if(language==='0'|| language===''){
      setAlert(true)
      const title="ERROR"
      setErrorTitle(title)
      setErrorBody("No Language Selected")
    }
    else if(code===''){
      setAlert(true)
      const title="ERROR"
      setErrorTitle(title)
      setErrorBody("No Code Written")
    }
    else{
      const token=localStorage.getItem('userToken')
      const id=presentation.id
      const presentationData=presentations
      let z_index=0
      presentation.slides.map((pg)=>{
        if(pg.page_number==pgNum){
          z_index=pg.elements.length
        }
      })
      const newElement={
        content_type:"code",
        content:code,
        language:language,
        width:width,
        height:height,
        fontSize:fontSize,
        left:0,
        top:0, 
        z_index:z_index
      }
      presentationData.map((p)=>{  
        if(p.id===id){
          p.slides.map((pg)=>{
            if(pg.page_number==pgNum){
              pg.elements.push(newElement)   
            }
          })
        }
      })
      axios.put("http://localhost:5005/store",{
        store:presentationData
      },{
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(()=>{
          setPresentations(presentationData)
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
  return (
    <div style={{height:'80vh', width:'90vw'}}>
      {popup && (<AlertPopUp showAlert={setAlert} errorTitle={errorTitle} errorBody={errorBody}/>)}
      {showTextModal && 
        (<TextModal 
          presentation={presentation} 
          setPresentation={setPresentation} 
          presentations={presentations} 
          setPresentations={setPresentations} 
          pgNum={pgNum}
          setModal={setTextModal}
          addFn={addTextFn} 
        />
        )
      }
      {showImageModal && 
        (<ImageModal
          presentation={presentation} 
          setPresentation={setPresentation} 
          presentations={presentations} 
          setPresentations={setPresentations} 
          pgNum={pgNum}
          setModal={setImageModal} 
          addFn={addImgFn}
        />
        )
      }
      {showVideoModal && 
        (<VideoModal 
          presentation={presentation} 
          setPresentation={setPresentation} 
          presentations={presentations} 
          setPresentations={setPresentations} 
          pgNum={pgNum}
          setModal={setVideoModal}
          addFn={addVideoFn}
        />
        )
      }
      {showCodeModal && 
        (<CodeModal 
          presentation={presentation} 
          setPresentation={setPresentation} 
          presentations={presentations} 
          setPresentations={setPresentations} 
          pgNum={pgNum}
          setModal={setCodeModal}
          addFn={addCodeFn}
        />
        )
      }
      {editTextModal && 
        (<EditTextModal 
          c={currColor} 
          fS={currFontSize} 
          w={currwidth} 
          h={currHeight} 
          t={currText} 
          l={currLeft}
          top={currTop}
          setModal={setEditTextModal} 
          editFn={onEditTextFn} 
        />
        )
      }
      {editImgModal && 
        (<EditImgModal  
          w={currwidth} 
          h={currHeight} 
          i={currImg} 
          l={currLeft}
          top={currTop}
          setModal={setEditImgModal} 
          editFn={onEditImgFn} 
        />
        )
      }
      {editVideoModal && 
        (<EditVideoModal 
          w={currwidth} 
          h={currHeight} 
          v={currVideo}
          a={isAP} 
          l={currLeft}
          top={currTop}
          setModal={setEditVideoModal} 
          editFn={onEditVideoFn} 
        />
        )
      }
      {editCodeModal && 
        (<EditCodeModal  
          fS={currFontSize} 
          w={currwidth} 
          h={currHeight} 
          c={currCode}
          lang={currLang} 
          l={currLeft}
          top={currTop}
          setModal={setEditCodeModal} 
          editFn={onEditCodeFn} 
        />
        )
      }
      {slideColor &&
        (<SlideColorModal updateFn={updateFn} setModal={setSlideColor}  pgNum={pgNum}/>)

      }
      {slideGradient &&
        (<SlideGradientModal updateFn={updateFn} setModal={setSlideGradient} pgNum={pgNum}/>)

      }
      {slideImage &&
        (<SlideImageModal updateFn={updateFn} setModal={setSlideImage} pgNum={pgNum}/>)

      }
      <div style={{display:'flex'}}>
        <Dropdown style={styles.drpDwnAdd} role='menu'>
          <Dropdown.Toggle variant="success" id="dropdown-add-elements">
            Add
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item role="menuitem" onClick={showText} >TEXT</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={showImg} >IMAGE</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={showVideo} >VIDEO</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={showCode} >CODE</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={styles.drpDwnFont}  role='menu'>
          <Dropdown.Toggle variant="warning" id="dropdown-font-styles">
            Font Style
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item role="menuitem" onClick={()=>updateFontFamily("Times New Roman")} >Times New Roman</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={()=>updateFontFamily("Arial")} >Arial</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={()=>updateFontFamily("Verdana")} >Verdana</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown style={styles.drpDwnBG} role='menu'>
          <Dropdown.Toggle variant="info" id="dropdown-add-elements">
            Slide Background
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item role="menuitem" onClick={showSlideColor} >Solid Colour</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={showSlideGradient} >Gradient</Dropdown.Item>
            <Dropdown.Item role="menuitem" onClick={showSlideImage} >Image</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {presentation.slides.map((pg)=>{
        if(pg.page_number==pgNum){

          return(
            <div style={{
              position:'relative',
              border: '2px solid green ',
              marginLeft:'10%',
              marginTop:'0.5%',
              aspectRatio:'16/9',
              maxWidth:'90%', 
              maxHeight:'90%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: pg.background?`${pg.background}`:'',
              backgroundColor:pg.backgroundColor
            }} key={pgNum} >
              {elements.map((element)=>{
                if(element.content_type==="text"){
                  return(
                    <div style={{
                      border:'1px solid #d3d3d3',
                      position:'absolute',
                      width:`${element.width}%`,
                      height:`${element.height}%`,
                      fontSize:`${element.fontSize}vw`,
                      color:`${element.color}`,   
                      left:`${element.left}%`,
                      top:`${element.top}%`,
                      zIndex:element.z_index,
                      fontFamily:element.font_family,
                      overflow: "hidden",          
                      whiteSpace: "pre-wrap",       
                      textOverflow: "clip",
                    }} 
                    onMouseDown={(e)=>{handleDeleteElement(e,element.z_index)}}
		                onDoubleClick={()=>{
                      editText(element.z_index,element.width,element.height,element.fontSize,element.color,element.content,element.left,element.top)
                    }}
                    key={element.z_index}>
                      {element.content}
                    </div>
                  )
                }
                else if(element.content_type==='image'){
                  return(
                    <img src={element.img_src} width={`${element.width}%`} height={`${element.height}%`} alt={element.img_description} style={{
                      position:'absolute',
                      left:`${element.left}%`,
                      top:`${element.top}%`,
                      zIndex:element.z_index,
                    }} 
                    onMouseDown={(e)=>{handleDeleteElement(e,element.z_index)}}
		                onDoubleClick={()=>{
                      editImg(element.z_index,element.width,element.height,element.img_src,element.left,element.top)
                    }}
                    key={element.z_index}>
                      {element.content}
                    </img>
                  )  
                }
                else if(element.content_type==='video'){
                  const autoplayParam=element.auto_play ? 1 : 0;
                  const videoSrc = element.video_src+`?autoplay=${autoplayParam}`;
                  return(
                    <div style={{
                      border:'1px solid #d3d3d3',
                      position:'absolute',
                      width:`${element.width}%`,
                      height:`${element.height}%`,
                      left:`${element.left}%`,
                      top:`${element.top}%`,
                      zIndex:element.z_index,
                    }} 
                    onMouseDown={(e)=>{handleDeleteElement(e,element.z_index)}}
                    onDoubleClick={()=>{
                      editVideo(element.z_index,element.width,element.height,element.video_src,element.auto_play,element.left,element.top)
                    }}
                    key={element.z_index}>
                      <iframe
                        style={{
                          width:'90%',
                          height:"90%",
                          zIndex:element.z_index,
                        }}
                        src={videoSrc}
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )
                }
                else{
                  return(
                    <SyntaxHighlighter language={element.language.toLowerCase()} style={docco} customStyle={{
                      border:'1px solid #d3d3d3',
                      position:'absolute',
                      width:`${element.width}%`,
                      height:`${element.height}%`,
                      fontSize:`${element.fontSize}vw`,
                      left:`${element.left}%`,
                      top:`${element.top}%`,
                      zIndex:element.z_index,
                      overflow: 'hidden',
                      whiteSpace: 'pre-wrap',       
                      textOverflow: "ellipsis",
                    }}
                    onMouseDown={(e)=>{handleDeleteElement(e,element.z_index)}}
                    onDoubleClick={()=>{
                      editCode(element.z_index,element.width,element.height,element.fontSize,element.content,element.language,element.left,element.top)
                    }}
                    key={element.z_index} >
                      {element.content}
                    </SyntaxHighlighter>
                  )
                }
              })}
              <div style={styles.slideNum}>
                {pgNum}
              </div>
            </div>
          )
        }
      })}
    </div>
  );
}

export default PresentationSlide;
