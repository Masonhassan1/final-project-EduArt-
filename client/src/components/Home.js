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
            Choose an online course that will move you forward{" "}
          </p>
          <p className="paragraph-two">
            {" "}
            We are a leader in the field of online education and we are trusted
            by more than 70,000 users from companies, schools and state
            institutions.
          </p>
          <button className="home-btn" onClick={() => navigate("/courselist")}>
            view online courses
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
