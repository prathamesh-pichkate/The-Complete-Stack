import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Textarea, Button, Alert } from "flowbite-react";
import Comment from "../components/Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Store all comments here
  const [commentError, setCommentError] = useState("");

  const navigate = useNavigate();

  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      setCommentError("Comment exceeds the 200-character limit!");
      return;
    }

    try {
      const res = await fetch("/api/comments/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments((prevComments) => [data, ...prevComments]);
      } else {
        setCommentError("Failed to post comment.");
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comments/getPostComment/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data); // Store fetched comments
        } else {
          console.log("Failed to fetch comments.");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comments/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedComment) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedComment } : c
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-3">
      {/* Display Current User Info */}
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="profile"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      {/* Comment Form */}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-gray-500 rounded-lg p-3"
        >
          <Textarea
            placeholder="Write a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              type="submit"
              className="h-10 w-15"
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-3">
              <p>{commentError}</p>
            </Alert>
          )}
        </form>
      )}

      {/* Display Comments */}
      {comments.length === 0 ? (
        <p className="text-gray-500 my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Total Comments:</p>
            <div className="border border-gray-400 px-2 rounded-full">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
            />
          ))}
        </>
      )}
    </div>
  );
}
