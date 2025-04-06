import React, { useState } from "react";
import style from "./home.module.css";
import { useAuth } from "../../hooks/useAuth";
import { usePosts } from "../../hooks/usePosts";
import Post from "../../components/Post/Post";
import Pagination from "../../components/Pagination/Pagination";

const Home = () => {
  const {posts} = usePosts()
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const slicedPosts = posts.slice(startIndex, endIndex)
  return (
    <div className={style.home}>
      <div className={style.postContainer}>
        {slicedPosts.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default Home;
