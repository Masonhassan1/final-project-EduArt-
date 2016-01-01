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
        setResponse(
          <FormattedMessage
            id="thankyou"
            defaultMessage="Thank you, we've got your message and we'll response as soon as possible"
          />
        );
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
            <FormattedMessage id="rating" defaultMessage="4.8 rating" />
          </span>
        </div>
        <div className="laptop">
          <i className="fa-solid fa-laptop-code"></i>{" "}
          <span>
            <FormattedMessage
              id="f_online_courses"
              defaultMessage="+200 online courses"
            />
          </span>
        </div>
        <div className="guarantee">
          <i className="fa-solid fa-money-check-dollar"></i>{" "}
          <span>
            <FormattedMessage
              id="money_back"
              defaultMessage="Money back guarantee"
            />
          </span>
        </div>
        <div className="certificate">
          <i className="fa-solid fa-graduation-cap"></i>{" "}
          <span>
            <FormattedMessage
              id="f_certificate"
              defaultMessage="Completion certificate"
            />
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
            <FormattedMessage
              id="send_question"
              defaultMessage="Send us your questions"
            />
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
