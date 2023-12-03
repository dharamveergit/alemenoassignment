import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar";
import AddDataToFirebase from "./pages/AddDataToFirebase";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";
import CoursesSearch from "./pages/CoursesSearch";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-course" element={<AddDataToFirebase />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/search/:q" element={<CoursesSearch />} />
      </Routes>
    </>
  );
}

export default App;
