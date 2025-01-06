import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col  gap-5 py-7">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {/* Image */}
        <Link to={`/post/${post.slug}`}>
          <img
            className="rounded-t-lg"
            src={post.image || "/home.jpg"} // Use post.image or fallback
            alt={post.title}
          />
        </Link>
        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <Link to={`/post/${post.slug}`}>
            <h5 className="mb-2 text-sm md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
          </Link>
          {/* Category */}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {post.category}
          </p>
          {/* Read More Link */}
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
