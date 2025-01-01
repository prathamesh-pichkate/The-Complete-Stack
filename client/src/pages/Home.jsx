export default function Home() {
  return (
    <div>
      <div
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center "
        style={({ backgroundImage: "url('public/home.jpg')" }, margin)}
      >
        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

        {/* Text Content */}
        <div className="relative z-10 text-center text-white ">
          <h1 className="text-5xl font-extrabold mb-4 text-black">
            Full Stack Blogs
          </h1>
          <p className="text-xl font-medium text-black">
            Your one-stop solution for MERN stack tutorials, real-world
            projects, and full-stack tips!
          </p>
        </div>
      </div>
    </div>
  );
}
