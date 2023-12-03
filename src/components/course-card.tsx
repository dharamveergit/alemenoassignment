import { course } from "@/lib/course-modal";
import { Timer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }: { course: course }) => {
  return (
    <li className="">
      <Link
        to={`/course/${course.id}`}
        className="bg-white p-5 flex flex-col h-full gap-3 rounded-lg group "
      >
        <img
          src={course.thumbnail}
          alt="course"
          className="w-full rounded-md h-44 object-cover"
        />
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
          <h1 className="text-base font-semibold">{course.name}</h1>
          <p className="text-xs text-gray-500">{course.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default CourseCard;
