import Typewriter from "typewriter-effect";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/my_pic.jpg"
              alt="Coding Illustration"
              className="rounded-lg shadow-lg object-cover w-full max-w-md md:max-w-lg"
            />
          </div>
          {/* Text Content Section */}
          <div className="flex flex-col space-y-8">
            <div>
              <h1 className="text-5xl font-medium text-center md:text-left">
                About{" "}
                <span className="font-extralight text-slate-500">
                  <Typewriter
                    options={{
                      strings: ["My Personal Full-Stack Blogs"],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                    }}
                  />
                </span>
              </h1>
              <p className="text-lg mt-4 text-gray-700 dark:text-gray-300 text-center md:text-left">
                Welcome to my personal blog on full-stack development! Here, I
                share my journey, tips, tutorials, and insights into the world
                of web development, covering both frontend and backend
                technologies. Dive in to explore and learn with me.
              </p>
            </div>
            <div className="flex flex-col md:text-left sm:text-center">
              <h2 className="text-3xl font-light text-gray-800 dark:text-gray-200">
                Passionate About Code
              </h2>
              <p className="text-gray-600 mb-10 dark:text-gray-400 mt-2">
                I started this blog to document my learning and help others on
                their journey. From React to Node.js, from databases to
                deployment, this blog is your companion for mastering the art of
                building full-stack applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
