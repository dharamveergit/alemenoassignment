import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase-config";
const courseModel = {
  id: 1, // Unique identifier for the course
  name: "Introduction to React Native",
  instructor: "John Doe", // Name of the course instructor
  description:
    "Learn the basics of React Native development and build your first mobile app.",
  enrollmentStatus: "Open", // Can be 'Open', 'Closed', or 'InProgress'
  thumbnail: "your.image.here", //Link to the course thumbnail
  duration: "8 weeks", // Duration of the course
  schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
  location: "Online",
  prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
  syllabus: [
    {
      week: 1,
      topic: "Introduction to React Native",
      content:
        "Overview of React Native, setting up your development environment.",
    },
    {
      week: 2,
      topic: "Building Your First App",
      content: "Creating a simple mobile app using React Native components.",
    },
    // Additional weeks and topics...
  ],
  students: [
    {
      id: 101,
      name: "Alice Johnson",
      email: "alice@example.com",
    },
    {
      id: 102,
      name: "Bob Smith",
      email: "bob@example.com",
    },
    // Additional enrolled students...
  ],
};

const AddDataToFirebase = () => {
  const courseSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    instructor: z.string(),
    description: z.string(),
    enrollmentStatus: z.string(),
    thumbnail: z.string(),
    duration: z.string(),
    schedule: z.string(),
    location: z.string(),
    prerequisites: z.array(z.string()).optional(),
    syllabus: z
      .array(
        z.object({
          week: z.number(),
          topic: z.string(),
          content: z.string(),
        })
      )
      .optional(),
    students: z
      .array(
        z.object({
          id: z.number(),
          name: z.string(),
          email: z.string().email(),
        })
      )
      .optional(),
  });
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
  });

  return (
    <form
      className="flex flex-col gap-6 container md:w-1/2 border p-5 rounded-lg mb-6"
      onSubmit={handleSubmit(async (data) => {
        const values = {
          ...data,
          prerequisites: [
            "Basic JavaScript knowledge",
            "Familiarity with React",
          ],
          syllabus: [
            {
              week: 1,
              topic: "Introduction to React Native",
              content:
                "Overview of React Native, setting up your development environment.",
            },
            {
              week: 2,
              topic: "Building Your First App",
              content:
                "Creating a simple mobile app using React Native components.",
            },
            // Additional weeks and topics...
          ],
          students: [
            {
              id: 101,
              name: "Alice Johnson",
              email: "alice@example.com",
            },
            {
              id: 102,
              name: "Bob Smith",
              email: "bob@example.com",
            },
          ],
        };
        setLoading(true);
        try {
          const docRef = await addDoc(collection(db, "courses"), values);
          //add id to the course
          await setDoc(
            doc(db, "courses", docRef.id),
            {
              id: docRef.id,
            },
            { merge: true }
          );
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setLoading(false);
      })}
    >
      <h1 className="text-2xl font-semibold">Add Course</h1>

      <Input placeholder="Name" {...register("name")} />
      <Input placeholder="Instructor" {...register("instructor")} />
      <Input placeholder="Description" {...register("description")} />
      <Controller
        name="enrollmentStatus"
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(value)}
            value={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Enrollment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="InProgress">InProgress</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      <Input placeholder="Thumbnail" {...register("thumbnail")} />
      <Input placeholder="Duration" {...register("duration")} />
      <Input placeholder="Schedule" {...register("schedule")} />
      <Input placeholder="Location" {...register("location")} />
      <button className="bg-primary rounded-full px-8 py-3 text-white text-sm hover:bg-blue-600 transition duration-200">
        {loading ? "Loading..." : "Add Course"}
      </button>
    </form>
  );
};

export default AddDataToFirebase;
