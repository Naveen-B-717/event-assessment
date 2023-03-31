import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Event from "./pages/Event/Event";
import Register from "./pages/Register/Register";
import EventList from "./pages/EventList/EventList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/add" element={<Event />} />
        <Route path="/events/:eventId" element={<Event />} />
        <Route path="/events" element={<EventList />} />
      </Routes>
    </Router>
  );
}

export default App;
