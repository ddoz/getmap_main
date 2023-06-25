import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

type NavbarProps = {
    toggleSidebar: () => void;
  };

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const {data:session, update} = useSession()

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
  
  return (
    <nav className="bg-gray-200 fixed top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
      <div className="flex items-center">
        <button className="mr-4 focus:outline-none" onClick={toggleSidebar}>
          MENU
        </button>
        <h2 className="text-xl font-bold">G</h2>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
            onClick={toggleDropdown}
          >
            {session?.user.name}
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {/* Isi Menu Dropdown */}
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Menu 1
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Menu 2
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Menu 3
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
