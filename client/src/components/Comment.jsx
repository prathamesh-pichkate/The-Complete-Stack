import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Textarea, Button } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comments/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedComment,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedComment);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-800 dark:text-gray-300">
              {comment.content}
            </p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2 mt-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 cursor-pointer ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400 cursor-pointer">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <buton
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500 cursor-pointer"
                  >
                    Edit
                  </buton>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
