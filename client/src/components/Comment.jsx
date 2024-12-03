import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
export default function Comment({ comment, onLike }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log(comment._id);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex border-b border-gray-500 p-4 ">
      <div className="flex-shrink-0 mr-2">
        <img
          className="h-10 w-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-2 text-xs truncate">
            {user ? `@${user.username}` : "Unknown User"}
          </span>
          <span className="text-xs text-gray-600">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-sm text-gray-800 dark:text-gray-300">
          {comment.content}
        </p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2 mt-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
}
