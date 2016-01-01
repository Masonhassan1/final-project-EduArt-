import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import axiosConfig from "../../util/axiosConfig";
import { MyContext } from "../../App";
import baseURL from "../../util/constants";
import { decodeToken } from "react-jwt";

import "./CoursePage.css";

export const addCourseOnDashborad = async (courseId) => {
  try {
    const jwt = localStorage.getItem("jwt");
    const decodedToken = decodeToken(jwt);
    const learningDeskId = decodedToken.learningDesk;
    const userId = decodedToken.userId;
    if (learningDeskId && jwt) {
      const lDeskData = await axiosConfig.post(
        `/mypurchases`,
        { courseId: courseId, userID: userId, deskId: learningDeskId },
        {
          headers: {
            authorization: `Bearer ${jwt}`,
          },
        }
      );
      return lDeskData;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function CoursePage({ isAuth }) {
  const contextContent = useContext(MyContext);
  const { setSelectedCourse } = contextContent;
  const { courseid } = useParams();
  const [courseInfo, setCourseInfo] = useState([]);
  const [courseStart, setCourseStart] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courseMes, setCourseMes] = useState(false);
  const navigate = useNavigate();
  const bookCourse = async () => {
    /// check ob user eingelogged ist
    if (isAuth) {
      // id params -(learningDeskId)
      // body course_id
      try {
        setLoading(true);
        await addCourseOnDashborad(courseid);
        setLoading(false);
        setHasError(false);
        setCourseMes(true);
        setTimeout(() => {
          setCourseMes(false);
          navigate("/mylearningdesk");
        }, 2000);
      } catch (error) {
        setLoading(false);
        setHasError(true);
      }
    } else {
      setSelectedCourse(courseid);
      navigate("/login");
    }
  };

  const getInfo = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(`${url}/${courseid}`);
      setCourseInfo(apiData.data);
      console.log("course info", apiData.data);
      const calcDate = new Date(apiData.data.dateOfStart);
      const day = calcDate.getUTCDate();
      const months = calcDate.getUTCMonth() + 1;
      const year = calcDate.getFullYear();
      const startDate = `${day.toString().length === 1 ? `0${day}` : day}.${
        months.toString().length === 1 ? `0${months}` : months
      }.${year}`;
      setCourseStart(startDate);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getInfo("/courses");
  }, []);
  return (
    <div className="coursePageWrapper-body">
      {loading ? (
        <div id="load" data-testid="loading">
          <div>G</div>
          <div>N</div>
          <div>I</div>
          <div>D</div>
          <div>A</div>
          <div>O</div>
          <div>L</div>
        </div>
      ) : hasError ? (
        <div className="error-message"></div>
      ) : (
        <div className="coursePageWrapper">
          <div className="coursePageTopWrapper">
            <div className="coursePageCard">
              <div className="cardPageHeader">
                <img
                  className="cardPageIcon"
                  src={`${baseURL}${courseInfo.courseIcon}`}
                  alt={courseInfo.courseName}
                />
                <div className="cardPageTextHeader">
                  <h3 className="coursePageNameCard">
                    {courseInfo.courseName}
                  </h3>
                  <h5 className="coursePageDurationCard">{`${courseInfo.courseType}`}</h5>
                </div>
              </div>
              <p className="coursePageTextCard">
                {courseInfo.courseDescription}
              </p>

              <div className="buy-btn-wrapper" onClick={() => bookCourse()}>
                <p>
                  <FormattedMessage id="book_now" defaultMessage="book now" />
                </p>
                <div className="buy-btn-icon">
                  <svg
                    width="35"
                    height="40"
                    viewBox="0 0 35 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 17.5H5V15H7.5V17.5ZM25 17.5H10V15H25V17.5ZM5 22.5H7.5V25H5V22.5ZM10 22.5H25V25H10V22.5ZM7.5 10H5V7.5H7.5V10ZM25 10H10V7.5H25V10ZM35 32.5V35H30V40H27.5V35H22.5V32.5H27.5V27.5H30V32.5H35ZM2.5 32.5H20V35H0V0H30V25H27.5V2.5H2.5V32.5Z"
                      fill="#5382A1"
                    />
                  </svg>
                </div>
              </div>
              <p className="courseMes">
                {courseMes ? (
                  <FormattedMessage
                    id="the_course_was_booked"
                    defaultMessage="The course was booked successfully."
                  />
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="coursePagePicture">
              <img
                src={`${baseURL}${courseInfo.courseImage}`}
                alt={courseInfo.courseName}
              />
            </div>
          </div>
          <div className="coursePageBottomWrapper">
            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage
                    id="start_date"
                    defaultMessage="01 | Start date"
                  />
                </p>
                <p className="courseDetailsText">{courseStart}</p>
              </div>
            </div>

            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage id="costs" defaultMessage="02 | Costs" />
                </p>
                <p className="courseDetailsText">
                  <FormattedMessage
                    id="an_education_voucher"
                    defaultMessage="An education voucher can be used for this course."
                  />
                </p>
              </div>
            </div>

            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage
                    id="requirements"
                    defaultMessage="03 | Requirements"
                  />
                </p>
                <p className="courseDetailsText">
                  <FormattedMessage
                    id="no_coding_experience"
                    defaultMessage="No coding experience required."
                  />
                </p>
              </div>
            </div>

            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage
                    id="duration"
                    defaultMessage="04 | Duration"
                  />
                </p>
                <p className="courseDetailsText">
                  {`${
                    courseInfo && courseInfo.modulesIncluded
                      ? courseInfo.modulesIncluded
                          .map((mod) => mod.noOfDays)
                          .reduce((acc, cur) => acc + cur, 0)
                      : 0
                  } `}
                  <FormattedMessage id="days" defaultMessage="days" />
                </p>
              </div>
            </div>

            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage id="place" defaultMessage="05 | Place" />
                </p>
                <p className="courseDetailsText">
                  <FormattedMessage
                    id="throughout_Germany"
                    defaultMessage="Throughout Germany - courses take place online"
                  />
                </p>
              </div>
            </div>

            <div className="courseDetailsItem">
              <div className="courseDetailsIcon"></div>
              <div className="courseDetailsDescr">
                <p className="courseDetailsTitle">
                  <FormattedMessage
                    id="language"
                    defaultMessage="06 | Language"
                  />
                </p>
                <p className="courseDetailsText">{courseInfo.language}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
