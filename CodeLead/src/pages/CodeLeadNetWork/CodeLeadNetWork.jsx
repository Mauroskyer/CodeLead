import { useEffect, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  CodeLeadNetWorkWrapper,
  ContentContainer,
} from "./styles/CodeLeadNetWorkStyles.jsx";
import HeaderCodeLeadNetWork from "./components/HeaderCodeLeadNetWork/HeaderCodeLeadNetWork.jsx";
import CreatePost from "./components/CreatedPost/CreatedPost.jsx";
import PostCard from "./components/PostCard/PostCard.jsx";
import usePostsStore from "../../store/postsStore.js";
import useLoginStore from "../../store/auth.js";
import { SkeletonCard } from "../../components/Skeletons/styles/SkeletonCardStyles.jsx";
import React from "react";

const CodeLeadNetwork = () => {
  const { posts, fetchPosts, loadNextPage, hasMore, isLoading, setFilter } =
    usePostsStore();

  const userName = useLoginStore((s) => s.userName);
  const loaderRef = useRef(null);

  /* 🔹 Initial fetch */
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* 🔹 Infinite scroll */
  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadNextPage]);

  return (
    <CodeLeadNetWorkWrapper>
      <HeaderCodeLeadNetWork />

      <ContentContainer>
        <CreatePost />

        {/* 🔍 SEARCH */}
        <Input
          placeholder="Search posts..."
          prefix={<SearchOutlined />}
          allowClear
          style={{ marginBottom: 16 }}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* 🔹 INITIAL LOADING */}
        {isLoading && posts.length === 0 && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={`skeleton-init-${index}`} />
            ))}
          </>
        )}

        {/* 🔹 POSTS */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} currentUser={userName} />
        ))}

        {/* 🔹 INFINITE SCROLL LOADER */}
        {hasMore && (
          <div ref={loaderRef} style={{ padding: 16 }}>
            {isLoading && (
              <>
                {Array.from({ length: 2 }).map((_, index) => (
                  <SkeletonCard key={`skeleton-more-${index}`} />
                ))}
              </>
            )}
          </div>
        )}
      </ContentContainer>
    </CodeLeadNetWorkWrapper>
  );
};

export default CodeLeadNetwork;
