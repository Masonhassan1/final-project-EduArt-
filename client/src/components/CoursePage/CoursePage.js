import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CoursePage.css";

export default function CoursePage() {
  const { courseid } = useParams();
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseStart, setCourseStart] = useState("");

  const getInfo = async (url) => {
    const apiData = await axios.get(`${url}/${courseid}`);
    setCourseInfo(apiData.data);
    console.log(apiData.data);
    const calcDate = new Date(apiData.data.dateOfStart);
    const day = calcDate.getUTCDate();
    const months = calcDate.getUTCMonth() + 1;
    const year = calcDate.getFullYear();
    const startDate = `${day.toString().length === 1 ? `0${day}` : day}.${
      months.toString().length === 1 ? `0${months}` : months
    }.${year}`;
    console.log(startDate);
    setCourseStart(startDate);
  };

  useEffect(() => {
    getInfo("http://localhost:3000/courses");
  }, []);
  return (
    <div className="coursePageWrapper">
      <div className="coursePageTopWrapper">
        <div className="coursePageCard">
          <div className="cardPageHeader">
            <img
              className="cardPageIcon"
              src={courseInfo.courseImage}
              alt={courseInfo.courseName}
            />
            <div className="cardPageTextHeader">
              <h3 className="coursePageNameCard">{courseInfo.courseName}</h3>
              <h5 className="coursePageDurationCard">{`full time | ${courseInfo.courseDuration} months`}</h5>
            </div>
          </div>
          <p className="coursePageTextCard">{courseInfo.courseDescription}</p>
        </div>
        <img
          className="coursePagePicture"
          src={courseInfo.courseImage}
          alt={courseInfo.courseName}
        />
      </div>
      <div className="coursePageBottomWrapper">
        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">01 | Start date</p>
            <p className="courseDetailsText">{courseStart}</p>
          </div>
        </div>

        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">02 | Costs</p>
            <p className="courseDetailsText">
              An education voucher can be used for this course.
            </p>
          </div>
        </div>

        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">03 | Requirements</p>
            <p className="courseDetailsText">No coding experience required.</p>
          </div>
        </div>

        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">04 | Duration</p>
            <p className="courseDetailsText">
              {`${courseInfo.courseDuration} months`}
            </p>
          </div>
        </div>

        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">05 | Place</p>
            <p className="courseDetailsText">
              Throughout Germany - courses take place online
            </p>
          </div>
        </div>

        <div className="courseDetailsItem">
          <div className="courseDetailsIcon"></div>
          <div className="courseDetailsDescr">
            <p className="courseDetailsTitle">06 | Language</p>
            <p className="courseDetailsText">
              English or German - minimum level B1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
