import React from 'react'
import { useState,useEffect } from 'react'
import "./Footer.css"

function Footer() {

  const [chatForm,setChatForm]= useState(false)

  return (
    <footer>
      <div className="footer-infos">

       <div className="star"><i className="fa-solid fa-star"></i> <span> 4.8 rating</span></div>
       <div className="laptop"><i className="fa-solid fa-laptop-code"></i> <span> +200 online courses</span></div>
       <div className="guarantee"><i className="fa-solid fa-money-check-dollar"></i> <span> Money back guarantee</span></div>
       <div className="certificate"><i className="fa-solid fa-graduation-cap"></i> <span> Completion certificate</span></div>
      </div>
      <div className="chat">
        <div className="show-chat">{chatForm? <div>x</div>:<div><i class="fa-regular fa-comments"></i></div>}</div>
        <div className="chat-form"></div>
      </div>
    </footer>
  )
}

export default Footer