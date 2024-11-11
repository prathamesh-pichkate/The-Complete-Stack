import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior or any other desired behavior like refreshing the page
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto md:items-center p-5">
        {/**Left part */}
        <div className="flex-1">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-2 text-orange-600">JustBlogs</span>
          </Link>
          <p className="text-md mt-5">
            You are one step behind just signin and start creating blogs.
          </p>
        </div>

        {/**Right part */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {errorMessage && (
              <Alert className="mt-4 " color="failure">
                {errorMessage}
              </Alert>
            )}

            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="username@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="cyanToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Signin"
              )}
            </Button>
          </form>
          <div className="flex mt-5 text-sm gap-2">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up">
              <span className="text-blue-600">Signup</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
