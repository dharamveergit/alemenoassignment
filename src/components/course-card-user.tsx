import { course } from "@/lib/course-modal";
import { updateCourse } from "@/lib/coursesstore";
import { BookOpenCheck, RotateCcw, Timer } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Progress } from "./ui/progress";

const CourseCardUser = ({ course }: { course: course }) => {
  const dispatch = useDispatch();

  return (
    <li className="bg-white p-5 flex flex-col h-full gap-3 rounded-lg group ">
      <Link to={`/course/${course.id}`} className="w-full ">
        <img
          src={course.thumbnail}
          alt="course"
          className="w-full rounded-md h-44 object-cover"
        />
      </Link>
      <div className="flex justify-between items-center">
        <div className="bg-primary px-4 py-2 rounded-full text-xs text-white">
          {course.enrollmentStatus}
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Timer size={14} color="#000A" />
          {course.duration}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-semibold">
          Learn Figma - UI/UX Design Essential Training
        </h1>
        <p className="text-xs text-gray-500">{course.description}</p>
      </div>

      {course.enrollmentStatus === "In Progress" && (
        <div className="flex gap-3 ">
          <Link
            to={`/course/${course.id}`}
            className="bg-primary w-12 h-12 flex gap-2 items-center rounded-full justify-center text-center py-3 text-white text-sm hover:bg-blue-600 transition duration-200"
          >
            <RotateCcw size={18} />
          </Link>
          <button
            onClick={() => {
              dispatch(
                updateCourse({
                  ...course,
                  enrollmentStatus: "Closed",
                })
              );
            }}
            className="bg-green-700 flex gap-2 items-center flex-1 rounded-full text-center  justify-center py-3 text-white text-sm hover:bg-green-600 transition duration-200"
          >
            <BookOpenCheck size={18} />
            Complete
          </button>
        </div>
      )}
      <div className="flex flex-col gap-3 mt-auto">
        <h1 className="text-sm font-semibold">Progress</h1>
        <Progress
          value={course.enrollmentStatus === "In Progress" ? 50 : 100}
        />
      </div>
    </li>
  );
};

export default CourseCardUser;
