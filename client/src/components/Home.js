import React from 'react'
import "./Home.css"
function Home() {
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
            <div className="python"><img src={require("../Images/python.webp") } alt="" /></div>
            <div className="react"><img src={require("../Images/React.webp") } alt="" /></div>
            <div className="nodejs"><img src={require("../Images/nodejs.png") } alt="" /></div>
            <div className="display"></div>
            <div className="clock">12:43</div>
            <div className="firefox"><img src={require("../Images/firefox.webp")} alt="" /></div>
            <div className="vsc"><img src={require("../Images/vsc.png")} alt="" /></div>
            <div className="chrome"><img src={require("../Images/chrome.png")} alt="" /></div>
            <div className="pointer"><img src={require("../Images/pointer.png")} alt="" /></div>
            <div className="vsc-app">
              <div className="vsc-app-title">Visual Stdio Code</div>
              <div className="vsc-app-icons"></div>
              <div className="vsc-app-workspace"></div>
              <div className="vsc-app-code-area"></div>
              <div className="vsc-terminal-title"></div>
              <div className="vsc-terminal"></div>
            </div>

          </div>
        
          
        </section>
    </main>
  )
}

export default Home