import { course } from "@/lib/course-modal";
import React from "react";
import { CircleUser, Timer, CalendarDays, Map } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "@/lib/coursesstore";

const CourseDetailsEnroll = ({ course }: { course: course }) => {
  const [enrolled, setEnrolled] = React.useState(false);
  const dispatch = useDispatch();
  const courses = useSelector(
    (state: {
      courses: {
        courses: course[];
      };
    }) => state.courses.courses
  );
  console.log(courses);
  React.useEffect(() => {
    if (!courses) return;
    if (courses?.find((c: course) => c?.id === course?.id)) {
      setEnrolled(true);
    }
  }, [course]);
  return (
    <section className="w-full md:w-1/3 border p-5 rounded-lg flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Course Details</h1>
      <div className="flex gap-3">
        <CircleUser size={24} />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">Instructor</h1>
          <p className="text-xs text-gray-600">{course?.instructor}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Timer size={24} />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">Duration</h1>
          <p className="text-xs text-gray-600">{course?.duration}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <CalendarDays size={24} />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">Schedule</h1>
          <p className="text-xs text-gray-600">{course?.schedule}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Map size={24} />
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold">Location</h1>
          <p className="text-xs text-gray-600">{course?.location}</p>
        </div>
      </div>
      <button
        onClick={() => {
          if (!enrolled) {
            console.log("already enrolled");

            dispatch(
              addCourse({
                ...course,
                enrollmentStatus: "In Progress",
              })
            );
            setEnrolled(true);
          }
        }}
        className="bg-primary rounded-full px-8 py-3 text-white text-sm hover:bg-blue-600 transition duration-200"
      >
        {enrolled ? "Enrolled" : "Enroll"}
      </button>
    </section>
  );
};

export default CourseDetailsEnroll;
