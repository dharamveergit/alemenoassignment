import CourseCardUser from "@/components/course-card-user";
import { course } from "@/lib/course-modal";
import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const courses = useSelector(
    (state: {
      courses: {
        courses: course[];
      };
    }) => state.courses.courses
  );
  return (
    <main className="bg-primary py-10 min-h-screen">
      <section className="container  flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-white">
          My Courses ({courses?.length})
        </h1>
        {!courses?.length && (
          <p className="text-white">
            You have not enrolled in any courses yet.
          </p>
        )}
        <ul className="grid md:grid-cols-3 gap-6">
          {courses?.map((course: course) => (
            <CourseCardUser course={course} key={course.id} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Dashboard;
