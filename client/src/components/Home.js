import React from 'react'
import {useState, useEffect } from 'react'
import "./Home.css"

function Home() {
  const [time , setTime]=useState(new Date())
  useEffect(()=>{
    document.querySelector(".bracket-one").textContent="{";
    document.querySelector(".bracket-two").textContent="};";
    document.querySelector(".index-html").textContent="<>";

  },[])
  useEffect(()=>{
    setTime(new Date())
  },[time])
  return (
    <main className='home'>
        <section className='info'>
            <div className="blue"></div>
            <div className="yellow"></div>
            <div className="red"></div>
            <div className="green"></div>
            <p>Choose an online course that will move you forward ...</p>
            <button>view online courses</button>
           
        </section>
        <section className='frame'>
          <div className="gray"></div>
          <div className="tab">
            <div className="display-frame"></div>
            <div className="html"><img src={require("../Images/html.png") } alt="" /></div>
            <div className="css"><img src={require("../Images/css.png") } alt="" /></div>
            <div className="js"><img src={require("../Images/js.png") } alt="" /></div>
            <div className="python"><img src={require("../Images/python.jpeg") } alt="" />
            </div>
            <div className="react"><img src={require("../Images/React.webp") } alt="" />
            </div>
            <div className="nodejs"><img src={require("../Images/nodejs.png") } alt="" />
            </div>
            <div className="display"></div>
            <div className="clock">{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</div>
            <div className="firefox"><img src={require("../Images/firefox.webp")} alt="" />
            </div>
            <div className="vsc"><img src={require("../Images/vsc.png")} alt="" /></div>
            <div className="chrome"><img src={require("../Images/chrome.png")} alt="" />
            </div>
            <div className="pointer"><img src={require("../Images/pointer.png")} alt="" />
            </div>
            <div className="vsc-app">
              <div className="vsc-app-title">Visual Studio Code</div>
              <div className="vsc-toolbar"> <div>
                <span>File</span> <span>Edit </span><span>Terminal </span><span>Help</span></div>
                </div> 
              <div className="vsc-app-icons">
                <i class="fa-regular fa-file"></i>
                <i class="fa-solid fa-magnifying-glass"></i>
              <i class="fa-solid fa-code-branch"></i>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-bolt"></i>
              </div>
              <div className="vsc-app-workspace">
                <div>
                  <span className='index-html' style={{color:"orange"}}> </span>
              index.html</div>
              <div>
                  <span style={{color:"deepskyblue"}}># </span>
              index.css</div>
                  <div>
                  <span style={{color:"gold"}}>js </span>
              index.js</div>
                  </div>
              <div className="vsc-app-code-area"><div><span style={{color:"chocolate"}}>function </span>
              <span style={{color:"deepskyblue"}}>sum </span> <span style={{color:"gold"}}>(<span style={{color:"darkorange"}}>num1<span style={{color:"gold"}}>,</span>num2</span>)</span>
              <span className='bracket-one'></span></div> <div><span style={{color:"dodgerblue"}}>let</span> <span style={{color:"cadetblue"}}>result  </span> <span style={{color:"gold"}}> = </span><span style={{color:"darkorange"}}> num1 <span style={{color:"gold"}}>+</span> num2</span></div> <span style={{color:"hotpink"}}>return </span><span style={{color:"cadetblue"}}>result</span><div className='bracket-two'></div>
              <div><span style={{color:"gold"}}>console.log(<span style={{color:"deepskyblue"}}>sum<span style={{color:"gold"}}>(</span><span style={{color:"darkorange"}}>56<span style={{color:"gold"}}>,</span>74</span><span style={{color:"gold"}}>)</span></span>);</span></div>
              <div className="cover-one"></div>
              <div className="cover-two"></div>
              <div className="cover-three"></div>
              <div className="cover-four"></div>
              <div className="cover-five"></div>
              </div>
              <div className="vsc-terminal-title"> <div> PROBLEMS DEBUG TERMINAL</div> 
                </div>
              <div className="vsc-terminal">Desktop/new-folder/  
              <div className='node'>

              <span style={{color:"gold"}}> nodemon </span>
              <span style={{color:"gray"}}>index.js</span>
              </div>
              <div className='result' style={{color:"gold"}}>130</div>
              <div className='cover-six'></div>
              </div>
            </div>
       
          </div>
        
          
        </section>
    </main>
  )
}

export default Home