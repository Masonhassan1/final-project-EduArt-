import React from 'react'
import { useState,useEffect } from 'react'
import "./Footer.css"

function Footer() {

  const [text,setText]=useState("")
  const [chatForm,setChatForm]= useState(false)
  const e = document.querySelector(".message")
 

  function textHandler(){
    setText(e.value)
    e.value = ""
  }
  console.log(text)
  function showChatHandler (){
    setChatForm(!chatForm)
  }
  

  return (
    <footer>
      <div className="footer-infos">

       <div className="star"><i className="fa-solid fa-star"></i> <span> 4.8 rating</span></div>
       <div className="laptop"><i className="fa-solid fa-laptop-code"></i> <span> +200 online courses</span></div>
       <div className="guarantee"><i className="fa-solid fa-money-check-dollar"></i> <span> Money back guarantee</span></div>
       <div className="certificate"><i className="fa-solid fa-graduation-cap"></i> <span> Completion certificate</span></div>
      </div>
      <div className="chat">
        <div className="show-chat" onClick={showChatHandler}>{chatForm? <div>x</div>:<div><i className="fa-regular fa-comments"></i></div>}</div>
        <div className={chatForm? "chat-form":"hide-chat-form"}>
         <div>Send us your questions and we will response as soon as possible</div>
         <div>{text}</div>
         <div>
         <input className='message' type="text" />
          <span  onClick={textHandler}> <i className="fa-regular fa-paper-plane"></i></span>
         </div>
        
        </div>
      </div>
    </footer>
  )
}

export default Footer