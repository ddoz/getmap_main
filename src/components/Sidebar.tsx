import { Menu } from '@headlessui/react';
import React, { ReactNode, useState } from 'react';

interface Props{
    isSidebarOpen: ReactNode;
}

const Sidebar = ({ isSidebarOpen }:Props) => {

  return (
    <aside className={`bg-gray-800 text-white w-64 flex-shrink-0 flex flex-col fixed top-16 left-0 bottom-0 transform transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>   
        <div className="bg-gray-800 text-white w-full p-4">
        <ul className="py-2">
        {/* Daftar Menu */}
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#">Menu 1</a>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          {/* Menu Dropdown */}
          <Menu>
            <Menu.Button className="flex items-center justify-between w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded text-left">
              <span>Dropdown</span>
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3.586L3.707 9.879a1 1 0 101.414 1.414L10 6.414l4.879 4.879a1 1 0 101.414-1.414L10 3.586z"
                  clipRule="evenodd"
                />
              </svg>
            </Menu.Button>
            <Menu.Items className="absolute z-10 left-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {/* Isi Dropdown */}
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 ${
                      active ? 'bg-gray-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    Dropdown Item 1
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 ${
                      active ? 'bg-gray-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    Dropdown Item 2
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </li>
        <li className="px-4 py-2 hover:bg-gray-700">
          <a href="#">Menu 3</a>
        </li>
      </ul>
        </div>
    </aside>
  );
};

export default Sidebar;
