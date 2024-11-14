import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const imageRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imageFile, imageFileUrl);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-extrabold text-2xl">Profile</h1>
      <form action="" className="flex flex-col gap-4 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={imageRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => imageRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full object-cover border-2 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          id="username "
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          placeholder="user@gmail.com"
          id="email "
          defaultValue={currentUser.email}
        />
        <TextInput type="password" placeholder="**********" id="password " />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update Profile
        </Button>
      </form>
      <div className="text-orange-600 flex justify-between mt-4">
        <span className="cursor-pointer text-sm font-semibold">
          Delete Account
        </span>
        <span className="cursor-pointer text-sm font-semibold">Logout</span>
      </div>
    </div>
  );
}
