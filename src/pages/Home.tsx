import CourseCard from "@/components/course-card";
import HomeLoading from "@/components/loading/home-loading";
import { db } from "@/lib/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const docRef = collection(db, "courses");
  const { isLoading, data } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const docSnap = await getDocs(docRef);
      const data = docSnap.docs.map((doc) => doc.data());
      return data;
    },
  });

  return (
    <main>
      <section className="flex gap-6 py-6 md:py-14 container flex-col md:flex-row items-center">
        <div className="md:w-1/2 flex flex-col gap-6 ">
          <img src="/star.svg" alt="star" className="w-14" />
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Fuel Your Future <br /> with Excellence in
            <br /> Education
          </h1>
          <p className="text-gray-600 text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const element = document.getElementById("courses");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-primary rounded-full px-8 py-3 text-white text-sm hover:bg-blue-600 transition duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <img src="/hero2.png" alt="hero" className="w-[75%]" />
        </div>
      </section>
      <section className="bg-primary py-10 md:py-14" id="courses">
        <div className="container flex flex-col gap-10 md:gap-14 items-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-white text-center">
            Explore Our Courses
          </h1>
          {isLoading && <HomeLoading />}
          <ul className="grid md:grid-cols-3 gap-6">
            {data?.map((data: any, i) => (
              <CourseCard key={i} course={data} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
