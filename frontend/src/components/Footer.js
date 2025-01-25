import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#7C295D] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <p className="text-lg">&copy; 2023 CodeWithAkki. All Rights Reserved.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <p className="mb-2 md:mb-0 md:mr-4 text-lg">Follow us:</p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100051050715146&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 text-lg"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/code.with.akki?igsh=bWowc3kwd2k4dnk5"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 text-lg"
            >
              Instagram
            </a>
            <a
              href="https://x.com/codewithakki20?t=tEa56onT-Zef09qOwrNBnw&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 text-lg"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
