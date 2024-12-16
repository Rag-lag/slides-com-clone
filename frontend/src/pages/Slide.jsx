import {useState,useEffect} from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
function Slide({presentation,presentations,pgNum}){
  const [elements,setElements]=useState([])  
  useEffect(()=>{
    presentation.slides.map((pg)=>{
      if(pg.page_number==pgNum){
        setElements(pg.elements)
      }
    })
  },[pgNum,elements,presentation,presentations])
  const styles={
    bigPresentation:{
      height:'100%',
    },
    slideNum:{
      fontSize: '1em',
      position:'absolute',
      bottom:'5px',
      left:'5px',
    },
  }
  return(
    <div>
      {presentation.slides.map((pg)=>{
        if(pg.page_number==pgNum){
          return(
            <div style={{
              position:'relative',
              border: '2px solid green ',
              aspectRatio:'16/9',
              marginLeft:'2.5%',
              maxWidth:'95%', 
              maxHeight:'95%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: pg.background?`${pg.background}`:'',
              backgroundColor:pg.backgroundColor?`${pg.backgroundColor}`:'white'
            }} key={pgNum} >
              {elements.map((element)=>{
                if(element.content_type==="text"){
                  return(
                    <div style={{
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
                      position:'absolute',
                      width:`${element.width}%`,
                      height:`${element.height}%`,
                      left:`${element.left}%`,
                      top:`${element.top}%`,
                      zIndex:element.z_index,
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
                    key={element.z_index} >
                      {element.content}
                    </SyntaxHighlighter>
                  )
                }
              })}
              <div style={styles.slideNum}>{pgNum}</div>
            </div>
          )
        }
      })}
    </div>
  )  
  
}
export default Slide