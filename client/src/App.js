import CourseList from "./components/CourseList/CourseList";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  return (
     <Router>
  
      <Header/>

      <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path="/courselist" element={<CourseList />}></Route>
          <Route path="/courselist/:courseid" element={<CoursePage />} />
      </Routes>
   
     </Router>

  );
}

export default App;
