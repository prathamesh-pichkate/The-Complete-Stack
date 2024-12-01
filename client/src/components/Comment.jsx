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
    <div>
      <div className="flex flex-1">
        <img
          className="h-10 w-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="">
        <div className="">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "Unknown User"}
          </span>
        </div>
      </div>
    </div>
  );
}
