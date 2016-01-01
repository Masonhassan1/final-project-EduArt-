import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "./Footer/Footer";
import { FormattedMessage } from "react-intl";

function Home({ headerAlarm }) {
  const navigate = useNavigate();

  return (
    <>
      <main>
        <section className="info">
          <p className="paragraph-one">
            <FormattedMessage id="home_title" />
          </p>
          <p className="paragraph-two">
            <FormattedMessage id="home_text" />
          </p>
          <button className="home-btn" onClick={() => navigate("/courselist")}>
            <FormattedMessage id="home_button" />
          </button>
        </section>
        <section className="home-img">
          <div className="home-img-div">
            <img src={require("../Images/home.JPG")} alt="" />
          </div>
        </section>
        <div id="alarm" className={headerAlarm ? "alarm" : "hide-alarm"}>
          <FormattedMessage id="please_login_first" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
