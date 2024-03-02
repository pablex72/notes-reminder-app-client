import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Archived from "./components/Archived";
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="archived" element={<Archived />} />
      </Routes>
    </div>
  );
}

export default App;
