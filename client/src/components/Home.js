import React from 'react'
import { useEffect } from 'react'
import "./Home.css"

function Home() {

  useEffect(()=>{
    document.querySelector(".bracket-one").textContent="{"
    document.querySelector(".bracket-two").textContent="};"
  },[])
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
            <div className="clock">12:43</div>
            <div className="firefox"><img src={require("../Images/firefox.webp")} alt="" />
            </div>
            <div className="vsc"><img src={require("../Images/vsc.png")} alt="" /></div>
            <div className="chrome"><img src={require("../Images/chrome.png")} alt="" />
            </div>
            <div className="pointer"><img src={require("../Images/pointer.png")} alt="" />
            </div>
            <div className="vsc-app">
              <div className="vsc-app-title">Visual Stdio Code</div>
              <div className="vsc-app-icons">
                <i class="fa-regular fa-file"></i>
                <i class="fa-solid fa-magnifying-glass"></i>
              <i class="fa-solid fa-code-branch"></i>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-bolt"></i>
              </div>
              <div className="vsc-app-workspace">
                <div>
                  <span style={{color:"gold"}}>js </span>
              index.js</div>
                  </div>
              <div className="vsc-app-code-area"><div><span style={{color:"chocolate"}}>function </span>
              <span style={{color:"deepskyblue"}}>sum </span> <span style={{color:"gold"}}>(<span style={{color:"orange"}}>num1,num2</span>)</span>
              <span className='bracket-one'></span></div> <div><span style={{color:"dodgerblue"}}>let</span> <span style={{color:"darkcyan"}}>result  </span> <span style={{color:"gold"}}>= num1 + num2</span></div> <span style={{color:"crimson"}}>return </span><span style={{color:"darkcyan"}}>result</span><div className='bracket-two'></div>
              <div><span style={{color:"gold"}}>console.log(<span style={{color:"deepskyblue"}}>sum<span style={{color:"gold"}}>(</span><span style={{color:"orange"}}>56,74</span><span style={{color:"gold"}}>)</span></span>);</span></div>
              <div className="cover-one"></div>
              </div>
              <div className="vsc-terminal-title"> PROBLMES DEBUG TERMINAL</div>
              <div className="vsc-terminal">Desktop/index.js/  
              <div className='node'>

              <span style={{color:"gold"}}> node </span>
              <span style={{color:"gray"}}>index.js</span>
              </div>
              <div className='result' style={{color:"gold"}}>130</div>
              <div className='cover-two'></div>
              </div>
            </div>
       
          </div>
        
          
        </section>
    </main>
  )
}

export default Home