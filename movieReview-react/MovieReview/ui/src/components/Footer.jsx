
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        <div className="md:w-1/3">
          <h4 className="text-red-600 text-2xl font-bold mb-4">
            Silver Screen Review
          </h4>
          <p className="text-lg leading-relaxed">
            5th Avenue St, Manhattan
            <br />
            New York, NY 10001
            <br />
            <strong>Call us:</strong> (+01) 202 342 6789
          </p>
        </div>

        
        <div className="md:w-1/3">
          <h4 className="text-xl font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-red-500 hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-red-500 hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        
        <div className="md:w-1/3">
          <h4 className="text-xl font-semibold mb-3">Social Networks</h4>
          <div className="flex space-x-4 text-xl text-red-600">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto mt-8 text-center text-white">
        &copy; 2025{" "}
        <span className="text-red-500 font-semibold">Silver Screen Review</span>.
        All rights reserved.
      </div>
    </footer>
  );
}
