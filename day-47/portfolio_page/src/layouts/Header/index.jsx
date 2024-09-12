import React from 'react';
import { IoTerminal } from 'react-icons/io5';
import { FaPager } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Header.propTypes = {};

function Header(props) {
  return (
    <header className="fixed left-0 right-0 top-0 mx-auto flex h-17 max-w-[1300px] items-center justify-between bg-[rgba(255,255,255,0.8)] py-4">
      <div>
        <Link className="text-lg font-semibold tracking-wide" to="/">
          Material Tailwind
        </Link>
      </div>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link className="flex items-center gap-2" to="/">
              <FaPager className="text-xl" /> Page
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-2" to="/">
              <MdAccountCircle className="text-xl" /> Account
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-2"
              target="_blank"
              to="https://www.material-tailwind.com/docs/react/installation"
            >
              <IoTerminal className="text-xl" /> Docs
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <button className="h-10 rounded-md px-5 py-1 text-sm uppercase leading-none transition-colors hover:bg-gray-200">
          Sign in
        </button>
        <button className="h-10 rounded-md bg-black px-5 py-1 text-sm uppercase leading-none text-white transition-shadow hover:shadow-2xl">
          Blocks
        </button>
      </div>
    </header>
  );
}

export default Header;
