import { Skeleton } from "antd";
import React from "react";
import { SkeletonCardStyles } from "./styles/SkeletonCardStyles.jsx";

const PostSkeleton = () => (
  <SkeletonCardStyles>
    <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 3 }} />
  </SkeletonCardStyles>
);

export default PostSkeleton;
