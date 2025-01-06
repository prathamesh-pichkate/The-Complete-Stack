import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts/getposts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex md:py-10 md:px-16 sm:w-full mx-auto">
        <div
          className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center "
          style={{ backgroundImage: "url('/home.jpg')" }}
        >
          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

          {/* Text Content */}
          <div className="relative z-10 text-center text-white ">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-stone-700">
              Full Stack Blogs
            </h1>
            <p className="text-sm md:text-xl font-extralight text-gray-900">
              Your one-stop solution for MERN stack tutorials, real-world
              projects, and full-stack tips!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-neutral-200 text-center py-4 dark:bg-gray-900">
        <h1 className="text-2xl font-bold font-extralight dark:text-white ">
          My Latest Blogs
        </h1>

        <div className="flex flex-wrap gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-400">
              No posts available
            </p>
          )}
        </div>
        <Link
          to={"/search"}
          className="text-lg text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </>
  );
}
