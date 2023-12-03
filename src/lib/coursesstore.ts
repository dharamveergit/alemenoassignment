import { createSlice } from "@reduxjs/toolkit";
import { course } from "./course-modal";

const initialState: { courses: course[] } = {
  courses: [],
};
const coursesstore = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (
      state,
      action: {
        payload: course;
      }
    ) => {
      state.courses.push(action?.payload);
    },
    updateCourse: (state, action) => {
      const {
        id,
        name,
        instructor,
        description,
        enrollmentStatus,
        thumbnail,
        duration,
        schedule,
        location,
        prerequisites,
        syllabus,
        students,
      } = action.payload;
      const existingCourse = state.courses.find((course) => course.id === id);
      if (existingCourse) {
        existingCourse.name = name;
        existingCourse.instructor = instructor;
        existingCourse.description = description;
        existingCourse.enrollmentStatus = enrollmentStatus;
        existingCourse.thumbnail = thumbnail;
        existingCourse.duration = duration;
        existingCourse.schedule = schedule;
        existingCourse.location = location;
        existingCourse.prerequisites = prerequisites;
        existingCourse.syllabus = syllabus;
        existingCourse.students = students;
      }
    },
  },
});

export const { addCourse, updateCourse } = coursesstore.actions;
export default coursesstore;
