import React from "react";
import { Skeleton } from "../ui/skeleton";

const HomeLoading = () => {
  return (
    <ul className="grid md:grid-cols-3 gap-6">
      {new Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} className="w-80 h-80 rounded-lg" />
      ))}
    </ul>
  );
};

export default HomeLoading;
