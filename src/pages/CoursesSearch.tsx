import CourseCard from "@/components/course-card";
import HomeLoading from "@/components/loading/home-loading";
import { db } from "@/lib/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { useParams } from "react-router-dom";

const CoursesSearch = () => {
  const params = useParams<{ q: string }>();
  const [filtered, setFiltered] = React.useState([]);
  const docRef = collection(db, "courses");
  const { isLoading, data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const docSnap = await getDocs(docRef);
      const data = docSnap.docs.map((doc) => doc.data());
      return data;
    },
  });

  React.useEffect(() => {
    if (!data) return;
    const filtered = data.filter(
      (course) =>
        course?.name.toLowerCase().includes(params.q.toLowerCase()) ||
        course?.instructor.toLowerCase().includes(params.q.toLowerCase())
    );
    setFiltered(filtered);
  }, [data, params.q]);

  return (
    <main className="bg-primary min-h-screen">
      <section className="container py-10 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-white">Search Courses</h1>
        {!filtered?.length && <p className="text-white">No courses found.</p>}
        {isLoading && <HomeLoading />}
        <ul className="grid md:grid-cols-3 gap-6">
          {filtered?.map((course: any) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CoursesSearch;
