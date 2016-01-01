import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "./components/CourseList/CourseList";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courselist">Course List</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/courselist" element={<CourseList />}></Route>
          <Route path="/courselist/:courseid" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
