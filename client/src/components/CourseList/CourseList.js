import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FormattedMessage, useIntl } from "react-intl";

import axiosConfig from "../../util/axiosConfig";
import baseURL from "../../util/constants";

import "./CourseList.css";

export default function CourseList() {
  const intl = useIntl();
  const [courseArr, setCourseArr] = useState([]);
  const searchInputRef = React.createRef(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(1);
  const height = 500;

  const getAllCourses = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      setCourseArr(apiData.data);
      setSlidesCount(apiData.data.length);
      setLoading(false);
      setHasError(false);
    } catch (error) {
      setLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    getAllCourses("/courses");
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setActiveSlideIndex(0);
    getAllCourses(`/courses?name=${searchInputRef.current.value}`);
  };
  function changeSlide(direction) {
    if (direction === "up") {
      if (activeSlideIndex === slidesCount - 1) {
        setActiveSlideIndex(0);
      } else {
        setActiveSlideIndex(activeSlideIndex + 1);
      }
    } else if (direction === "down") {
      if (activeSlideIndex === 0) {
        setActiveSlideIndex(slidesCount - 1);
      } else {
        setActiveSlideIndex(activeSlideIndex - 1);
      }
    }
  }
  return (
    <div className="course-list-page">
      <p className="courseListTitle">
        <FormattedMessage
          id="choose_an_online_course"
          defaultMessage="Choose an online course and transform your career"
        />
      </p>
      <form className="search-form" onSubmit={(e) => submitForm(e)}>
        <GoSearch className="search-icon" />
        <input
          type="text"
          name="search"
          placeholder={intl.formatMessage({
            defaultMessage: "Search",
            id: "search",
          })}
          ref={searchInputRef}
        />
      </form>

      <section className="course-slider">
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
        ) : !courseArr.length ? (
          <div className="no-results">
            <p>
              <FormattedMessage
                id="no_results_found"
                defaultMessage="No results found"
              />
            </p>
          </div>
        ) : (
          <div className="container">
            {courseArr.length && (
              <Link to={`/courselist/${courseArr[activeSlideIndex]._id}`}>
                <div
                  className="sidebar"
                  style={{
                    top: `-${(slidesCount - 1) * 500}px`,
                    transform: `translateY(${activeSlideIndex * height}px)`,
                  }}
                >
                  {[...courseArr].reverse().map((course, id) => {
                    return (
                      <div
                        key={id}
                        style={{
                          backgroundColor: `#222576`,
                        }}
                      >
                        <h1>{course.courseName}</h1>
                      </div>
                    );
                  })}
                </div>
              </Link>
            )}
            {courseArr.length && (
              <Link to={`/courselist/${courseArr[activeSlideIndex]._id}`}>
                <div
                  className="main-slide"
                  style={{
                    transform: `translateY(-${activeSlideIndex * height}px)`,
                  }}
                >
                  {courseArr.map((course, id) => {
                    return (
                      <div
                        key={id}
                        style={{
                          backgroundImage: `url(${baseURL}${course.courseImage})`,
                        }}
                      ></div>
                    );
                  })}
                </div>
              </Link>
            )}
            <div className="controls-panel">
              <button
                className="down-button"
                onClick={() => changeSlide("down")}
              >
                <i className="fas fa-arrow-down"></i>
              </button>
              <button className="up-button" onClick={() => changeSlide("up")}>
                <i className="fas fa-arrow-up"></i>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
