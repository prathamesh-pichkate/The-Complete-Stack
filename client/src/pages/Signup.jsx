import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto md:items-center p-5">
        {/**Left part */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-2 text-orange-600">JustBlogs</span>
          </Link>
          <p className="text-md mt-5">
            You are one step behind just signup and start creating blogs.
          </p>
        </div>

        {/**Right part */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="username@gmail.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="cyanToBlue" type="submit">
              Signup
            </Button>
          </form>
          <div className="flex mt-5 text-sm gap-2">
            <span>Already have an account?</span>
            <Link to="/sign-in">
              <span className="text-blue-600">Signin</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
