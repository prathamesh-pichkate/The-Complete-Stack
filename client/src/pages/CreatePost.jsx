import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPublishError(null);

    // Create a FormData object to handle file uploads
    const formPayload = new FormData();
    formPayload.append("title", formData.title);
    formPayload.append("category", formData.category);
    formPayload.append("content", formData.content);
    if (file) formPayload.append("image", file);

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      console.log(data);
      alert("Post created successfully!");
    } catch (err) {
      setPublishError(err.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create New Post
      </h1>
      {publishError && (
        <p className="text-red-500 text-center">{publishError}</p>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border rounded-md border-purple-400 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <ReactQuill
          theme="snow"
          className="h-80 border-orange-400"
          required
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" className="mt-12">
          Publish
        </Button>
      </form>
    </div>
  );
}
