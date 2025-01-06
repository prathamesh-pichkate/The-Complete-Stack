import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!formData.title || !formData.category || !formData.content) {
        alert("Please fill all the fields");
        setLoading(false);
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("content", formData.content); // This will include the HTML content from React Quill

      if (file) {
        data.append("image", file);
      }

      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Something went wrong");
      }

      setFormData({ title: "", content: "", category: "" });
      setFile(null);
      alert("Post created successfully!");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl min-h-screen mx-auto">
      <h1 className="text-center text-3xl font-semibold mt-12">
        Create a New Post
      </h1>
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            id="title"
            placeholder="Title"
            required
            className="flex-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
        </div>
        <div className="flex gap-4 items-center justify-between border-purple-300 border rounded-md p-3">
          <FileInput type="file" accept="image/*" onChange={handleImage} />
        </div>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button
          type="submit"
          size="md"
          gradientDuoTone="cyanToBlue"
          className="mt-16 flex w-full"
          outline
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
}
