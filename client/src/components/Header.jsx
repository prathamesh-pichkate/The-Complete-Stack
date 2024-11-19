import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/signout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar className="border-b-2 bg-transparent">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white"
      >
        <span className="px-2 py-2">JustBlogs</span>
      </Link>
      <form action="">
        <TextInput
          type="text"
          placeholder="search..."
          rightIcon={IoSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray">
        <IoSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(changeTheme())}
        >
          {theme === "light" ? <IoMoon /> : <IoSunnySharp />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={currentUser.profilePicture}
                rounded
                style={{ width: "40px", height: "40px" }}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {`Username : ${currentUser.username}`}
              </span>
              <span className="block truncate text-sm font-medium">
                {`Email : ${currentUser.email}`}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/home">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/project">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
