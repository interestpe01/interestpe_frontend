import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 border-t border-blue-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="flex flex-col items-center items-start">
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-blue-900 tracking-tight">
                interestpe
              </p>
              <span className="text-sm text-blue-700 font-light">
                Befikar lending
              </span>
            </div>
            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-2xl transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 text-2xl transition-colors duration-300"
              >
                <SiLinkedin />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-wrap justify-start md:justify-start gap-12">
            {/* Column 1 */}
            <div className="flex flex-col min-w-[150px] text-center md:text-left">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                Explore
              </h4>
              {["Help", "Share", "Careers", "Testimonials"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="my-2 text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors duration-300"
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col min-w-[150px] text-center md:text-left">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">
                Contact
              </h4>
              <a
                href="mailto:interestPe01@gmail.com"
                className="my-2 text-sm text-blue-700 hover:text-blue-900 font-medium transition-colors duration-300"
              >
                interestPe01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-blue-300 text-center">
          <p className="text-sm text-blue-700">
            &copy; 2024 interestpe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
