import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";
import { GoSearch } from "react-icons/go";
import axiosConfig from "../../util/axiosConfig";

export default function CourseList() {
  const [courseArr, setCourseArr] = useState([]);
  const searchInputRef = React.createRef(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(1);
  const [height, setHeight] = useState(500);

  const getAllCourses = async (url) => {
    try {
      setLoading(true);
      const apiData = await axiosConfig.get(url);
      console.log(apiData.data);
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
    getAllCourses(`/courses?name=${searchInputRef.current.value}`);
  };
  function changeSlide(direction) {
    console.log(direction);
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
        Choose an online course and transform your career
      </p>
      <form className="search-form" onSubmit={(e) => submitForm(e)}>
        <GoSearch className="search-icon" />
        <input
          type="text"
          name="search"
          placeholder="Search"
          ref={searchInputRef}
        />
      </form>
      {/* <section className="courseListSection">
        {courseArr.map((course, id) => {
          return (
            <div key={id} className="courseCard">
              <div className="cardHeader">
                <img
                  className="cardIcon"
                  src={course.courseIcon}
                  alt={course.courseName}
                />
                <div className="cardTextHeader">
                  <h3 className="courseNameCard">{course.courseName}</h3>
                  <h5 className="courseDurationCard">{`full time | ${course.courseDuration} months`}</h5>
                </div>
              </div>
              <p className="courseTextCard">{course.courseDescription}</p>
              <Link to={`/courselist/${course._id}`} className="viewCourseBtn">
                view course
                <svg
                  width="47"
                  height="28"
                  viewBox="0 0 47 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.6875 1.5L44.9375 14L32.6875 26.5M44.9375 14H2.0625"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

               </div>
          );
        })}
      </section> */}

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
            <p>No results found</p>
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
                        {/* <p>{course.courseDescription}</p> */}
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
                          backgroundImage: `url(${course.courseImage})`,
                        }}
                      ></div>
                    );
                  })}
                </div>
              </Link>
            )}
            <div className="controls">
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
