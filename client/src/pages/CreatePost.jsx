import { TextInput, Select, FileInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl  mx-auto  min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">
        Create New Post
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="nextjs">Nextjs</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border rounded-md border-purple-400 p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Uplaod Image
          </Button>
        </div>
        <ReactQuill theme="snow" className="h-80 border-orange-400" required />

        <Button type="submit" gradientDuoTone="purpleToBlue" className="mt-12">
          Publish
        </Button>
      </form>
    </div>
  );
}
