import { Footer } from "flowbite-react";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <Footer container>
      <div className="w-full sm:flex sm:items-center sm:justify-between">
        <Footer.Copyright href="/" by="JustBlogs" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon href="/" icon={FaLinkedin} className="text-blue-600" />
          <Footer.Icon href="/" icon={FaInstagram} className="text-pink-600" />
          <Footer.Icon href="/" icon={FaTwitter} className="text-blue-600" />
          <Footer.Icon href="/" icon={FaGithub} className="text-gray-600" />
        </div>
      </div>
    </Footer>
  );
}
