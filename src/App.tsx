import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Opportunities from "./pages/Opportunities";
import Dashboard from "./pages/Dashboard";
import CustomCursor from "./components/CustomCursor";
import StarField from "./components/StarField";
import GraphireNavbar from "./components/GraphireNavbar";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <StarField />
      <CustomCursor />
      <GraphireNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
