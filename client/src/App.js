import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";



function App() {
  return (
     <Router>
  
      <Header/>

      <Routes>
      <Route path={"/"} element={<Home/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/register"} element={<Register/>} />
      </Routes>
   
     </Router>
  );
}

export default App;
