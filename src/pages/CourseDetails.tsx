import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { course } from "@/lib/course-modal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CourseDetailsEnroll from "@/components/course-details/course-details";
import { Skeleton } from "@/components/ui/skeleton";
const CourseDetails = () => {
  const params = useParams<{ id: string }>(); // Add type for params
  const docRef = doc(db, "courses", params.id);

  const { data, isLoading } = useQuery({
    queryKey: ["course", params.id],
    queryFn: async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    },
  });
  const course = data as course;

  if (isLoading)
    return (
      <main className="container py-6 md:py-10 flex flex-col md:flex-row gap-8 items-start">
        <Skeleton className="w-full md:w-2/3 h-[40rem] bg-gray-300" />
        <Skeleton className="w-full md:w-1/3 h-80 bg-gray-300" />
      </main>
    );

  return (
    <main className="flex gap-8 container py-6 md:py-10 items-start flex-col-reverse md:flex-row ">
      <section className="md:w-2/3 flex flex-col gap-3">
        <h1 className="text-3xl font-semibold leading-snug">{course?.name}</h1>
        <div className="bg-primary px-4 py-2 rounded-full text-xs text-white w-max">
          {course?.enrollmentStatus}
        </div>
        <img
          src={course?.thumbnail}
          alt="course"
          className="w-full rounded-lg"
        />
        <div className="p-5 flex flex-col gap-6 border rounded-lg">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">Description</h1>
            <p className="text-gray-600 text-sm">{course?.description}</p>
          </div>{" "}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-semibold">Prerequisites</h1>
            <ul className="list-disc list-inside space-y-2">
              {course?.prerequisites?.map((prerequisite, i) => (
                <li key={i} className="text-gray-600 text-sm">
                  {prerequisite}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Syllabus</h1>
            <Accordion type="single" collapsible>
              {course?.syllabus?.map((syllabus, i) => (
                <AccordionItem key={i} value={i?.toString()}>
                  <AccordionTrigger className="text-gray-600 text-sm">
                    <div className="flex justify-between items-center gap-2">
                      <h1 className="text-gray-600 text-sm">
                        Week {syllabus.week}:
                      </h1>
                      <span className="text-gray-600 text-sm">
                        {syllabus.topic}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 text-sm">{syllabus.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      <CourseDetailsEnroll course={course} />
    </main>
  );
};

export default CourseDetails;
