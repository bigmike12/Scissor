import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UrlCardSkeleton = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#001F22" highlightColor="#444">
        <Skeleton height={268} className="rounded-3xl" />
      </SkeletonTheme>
    </div>
  );
};

export default UrlCardSkeleton;
