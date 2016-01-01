import {
  BrowserRouter as Router,
  NavLink,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';



function App() {
  return (
    <div className="App">
     
      <Header/>
     <Router>
      <Routes>

      </Routes>
     </Router>
    </div>
  );
}

export default App;
