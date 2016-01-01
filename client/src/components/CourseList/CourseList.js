import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";
import { GoSearch } from "react-icons/go";
import axios from "axios";

export default function CourseList() {
  const [courseArr, setCourseArr] = useState([]);
  const searchInputRef = React.createRef(null);

  const getAllCourses = async (url) => {
    const apiData = await axios.get(url);
    setCourseArr(apiData.data);
  };

  useEffect(() => {
    getAllCourses("http://localhost:4000/courses");
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    getAllCourses(
      `http://localhost:4000/courses?name=${searchInputRef.current.value}`
    );
  };
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
      <section className="courseListSection">
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

              {/*  <h5 className="courseStartCard">
                Start: {new Date(course.dateOfStart).toLocaleDateString()}
              </h5> */}
            </div>
          );
        })}
      </section>
    </div>
  );
}
