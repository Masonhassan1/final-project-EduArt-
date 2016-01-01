import React from "react";
import { Link } from "react-router-dom";
import "./CourseList.css";
import { GoSearch } from "react-icons/go";

const courseArr = [
  {
    name: "Web Development",
    linkname: "webdevelopment",
    duration: "12 months",
    start: "01.02.2023",
    id: 1,
    src: "https://cdn.dribbble.com/users/1270214/screenshots/5646236/media/ef6ec26746b87842e916e5c0f5b6ec27.png?compress=1&resize=800x600&vertical=top",
    text: "With our course, you will learn how to create dynamic websites and interactive web applications.",
  },
  {
    name: "Web Design",
    linkname: "webdesign",
    duration: "6 months",
    start: "05.03.2023",
    id: 2,
    src: "https://thumbs.dreamstime.com/z/developers-create-internet-app-software-engineering-computer-technology-website-development-web-application-coding-design-web-150140993.jpg",
    text: "Students will gain the skills and project-based experience needed for entry into web design and development careers.",
  },
  {
    name: "Web Development",
    linkname: "webdevelopment",
    duration: "12 months",
    start: "08.04.2023",
    id: 3,
    src: "https://cdn.dribbble.com/users/1270214/screenshots/5646236/media/ef6ec26746b87842e916e5c0f5b6ec27.png?compress=1&resize=800x600&vertical=top",
    text: "With our course, you will learn how to create dynamic websites and interactive web applications.",
  },
  {
    name: "Web Design",
    linkname: "webdesign",
    duration: "6 months",
    start: "11.05.2023",
    id: 4,
    src: "https://thumbs.dreamstime.com/z/developers-create-internet-app-software-engineering-computer-technology-website-development-web-application-coding-design-web-150140993.jpg",
    text: "Students will gain the skills and project-based experience needed for entry into web design and development careers.",
  },
];

export default function CourseList() {
  // const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <div>
      <form className="search-form" onSubmit={(e) => submitForm(e)}>
        <GoSearch className="search-icon" />
        <input type="text" name="search" placeholder="Search" />
      </form>
      <section className="courseListSection">
        {courseArr.map((course, id) => {
          return (
            <div key={id} className="courseCard">
              <img src={course.src} alt={course.name} />
              <h3 className="courseNameCard">{course.name}</h3>
              <h5 className="courseDurationCard">{course.duration}</h5>
              <h5 className="courseStartCard">Start: {course.start}</h5>
              <p className="courseTextCard">{course.text}</p>
              <Link
                to={`/courselist/${course.linkname}`}
                className="viewCourseBtn"
              >
                View course
              </Link>

              {/*    <button
                
                onClick={() => navigate(":webdevelopment")}
              >
                View course
              </button> */}
            </div>
          );
        })}
      </section>
    </div>
  );
}
