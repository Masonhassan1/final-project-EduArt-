import React from "react";
import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import "./Footer.css";

function Footer() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [chatForm, setChatForm] = useState(false);
  const messageText = document.querySelector(".message");

  useEffect(() => {
    document.querySelector(".message").focus();
  });

  useEffect(() => {
    document.querySelector(".message").focus();
  });
  function textHandler() {
    if (messageText.value) {
      if (response) setResponse("");

      setText(messageText.value);

      setTimeout(() => {
        setResponse(<FormattedMessage id="thankyou" />);
      }, 900);
      messageText.value = "";
    } else {
      return;
    }
  }
  console.log(text);
  function showChatHandler() {
    setChatForm(!chatForm);
  }

  return (
    <footer>
      <div className="footer-infos">
        <div className="star">
          <i className="fa-solid fa-star"></i>{" "}
          <span>
            <FormattedMessage id="rating" />
          </span>
        </div>
        <div className="laptop">
          <i className="fa-solid fa-laptop-code"></i>{" "}
          <span>
            <FormattedMessage id="f_online_courses" />
          </span>
        </div>
        <div className="guarantee">
          <i className="fa-solid fa-money-check-dollar"></i>{" "}
          <span>
            <FormattedMessage id="money_back" />
          </span>
        </div>
        <div className="certificate">
          <i className="fa-solid fa-graduation-cap"></i>{" "}
          <span>
            <FormattedMessage id="f_certificate" />
          </span>
        </div>
      </div>
      <div className="chat">
        <div className="show-chat" onClick={showChatHandler}>
          {chatForm ? (
            <div>x</div>
          ) : (
            <div>
              <i className="fa-regular fa-comments"></i>
            </div>
          )}
        </div>
        <div className={chatForm ? "chat-form" : "hide-chat-form"}>
          <div className="response">
            <FormattedMessage id="send_question" />
          </div>
          <div className="text">{text}</div>
          <div className="response">{response}</div>
          <div className="message-div">
            <input className="message" type="text" />
            <span className="send-message" onClick={textHandler}>
              {" "}
              <i className="fa-regular fa-paper-plane"></i>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
