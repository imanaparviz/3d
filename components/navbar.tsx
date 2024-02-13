// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="backdrop-blur-3xl p-2 text-gray-200 fixed w-full z-10 top-0">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/">
        <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="py-1 px-3">Home</button>
            </Link>
            <Link href="/about">
              <button className="py-1 px-3">About</button>
            </Link>
            <Link href="/login">
              <button className="py-1 px-3">Login</button>
            </Link>
            <Link href="/blog">
              <button className="py-1 px-3">Blog</button>
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
