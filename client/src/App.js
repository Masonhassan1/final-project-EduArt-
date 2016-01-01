import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import CourseList from "./components/CourseList/CourseList";
import { Button } from "react-bootstrap";
function App() {
  return (
    <div className="App">
      {/*      <h1>React App Template</h1>
      <Button variant="success">Success</Button> */}
      <CourseList />
    </div>
  );
}

export default App;
