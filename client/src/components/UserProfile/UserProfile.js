import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./UserProfile.css"

function UserProfile() {
  return (
    <div className='user-profile'>
        <section className='options-list'>
            <div className="user-my-profile">
            <i className="fa-solid fa-user" style={{color:"dodgerblue"}}></i>
            <div>My profile</div>
            </div>
            <div className="user-purchase">
            <i className="fa-solid fa-bag-shopping" style={{color:"coral"}}></i>
            <div>Purchase</div>
            </div>
            <div className="user-certificate">
            <i className="fa-solid fa-graduation-cap" style={{color:"black"}}></i>
            <div>Certificate</div>
            </div>
            <div className="user-setting">
            <i className="fa-solid fa-gear" ></i>
            <div>setting</div>
            </div>

        </section>  
        <section className='personal-data'>
         
            <div id="user-bc"></div>
            <div className="user-photo"><i className="fa-solid fa-user" style={{color:"dodgerblue"}}></i></div>
            <div className="user-edit-btn"><i className="fa-solid fa-pen-to-square"  style={{color:"steelblue"}}></i></div>
            <div className="user-name"></div>
            <div className="user-email"></div>
            <div className="user-email-icon"><i className="fa-solid fa-at" style={{color:"royalblue"}}></i></div>
            <div className="user-tel"></div>
            <div className="user-tel-icon"><i className="fa-solid fa-phone"style={{color:"lightslategray"}}></i></div>
            <div className="user-location"></div>
            <div className="user-location-icon"><i className="fa-solid fa-location-pin"style={{color:"orangered"}}></i></div>

          
        </section>
    </div>
  )
}

export default UserProfile