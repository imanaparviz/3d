import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800/30 backdrop-blur-md mt-0 py-5">
    <div className="container mx-auto py-4 px-6 text-white">
      <div className="flex justify-between items-center flex-wrap">

        {/* Linke Spalte */}
        <div className="flex flex-col mb-4 md:mb-0">
          <h3 className="text-lg font-bold">Stay Connected</h3>
          <p className="text-base mt-5">Join our newsletter to get the latest updates.</p>
        </div>

        {/* Mittlere Spalte */}
        <div className="flex flex-col items-center mr-12  my-4 pr-12 md:mb-0">
          <div className="flex space-x-2 mr-12 pr-12">
            <input type="email" placeholder="Your Email" className=" w-full p-1  rounded-1-md bg-white/10 backdrop-blur-md outline-none placeholder-white text-sm"/>
            <button className=" bg-gray-300 hover:bg-gray-500 text-gray-700 font-bold p-1 rounded-r-md text-sm">
              Subscribe
            </button>
          </div>
        </div>

        {/* Rechte Spalte */}
        <div className="flex flex-col items-end">
          <a href="/login" className="text-base hover:underline">Login</a>
          <a href="/about" className="mt-5 text-base hover:underline">About</a>
         
        </div>

      </div>

      {/* Unten zentrierter Text */}
      <div className="text-center text-lg mt-4">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  </footer>
  );
};

export default Footer;