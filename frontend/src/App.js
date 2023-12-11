import { HashRouter } from "react-router-dom";
import Project from "./project";
import { Routes, Route, Navigate } from "react-router";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/project" />} />
          <Route path="/project/*" element={<Project />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
