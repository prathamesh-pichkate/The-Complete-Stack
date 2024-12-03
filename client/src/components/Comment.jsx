import moment from "moment";

import { useEffect, useState } from "react";
export default function Comment({ comment }) {
  const [user, setUser] = useState({});

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
      </div>
    </div>
  );
}
