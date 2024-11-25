import {
  Button,
  FileInput,
  Select,
  TextInput,
  Alert,
  Label,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "", // Store the current image URL for preview
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);

  const { postId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const response = await fetch(`/api/posts/getposts?postId=${postId}`);
        const data = await response.json();

        if (!response.ok) {
          setPublishError(data.message);
          return;
        }

        if (response.ok) {
          setPublishError(null);
          setFormData({
            title: data.posts[0].title,
            category: data.posts[0].category,
            content: data.posts[0].content,
            image: data.posts[0].image, // Store the current image URL
          });
        }
      };
      fetchPost();
    } catch (error) {
      console.error(error.message);
    }
  }, [postId]);

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      setFile(selectedFile); // Set new image file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content);
      if (file) {
        data.append("image", file); // Append new image only if selected
      }

      const response = await fetch(
        `/api/posts/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PUT",
          body: data,
          credentials: "include",
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      alert("Post updated successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center text-3xl font-semibold mt-12">Update Post</h1>
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="title"
          placeholder="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Select
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select a category</option>
          <option value="javascript">JavaScript</option>
          <option value="react">ReactJS</option>
          <option value="nextjs">NextJS</option>
        </Select>
        <Label>Current Image:</Label>
        {formData.image && (
          <img
            src={formData.image}
            alt="Current Post"
            className="w-full max-h-64 object-cover rounded-md"
          />
        )}
        <FileInput type="file" accept="image/*" onChange={handleImage} />
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Post"}
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-4">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
