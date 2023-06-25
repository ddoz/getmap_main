import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { signOut, useSession } from 'next-auth/react';
import { RiAccountCircleFill, RiDashboardFill, RiLogoutCircleFill, RiMoneyDollarBoxFill } from 'react-icons/ri';
import { AiFillEnvironment } from 'react-icons/ai';
import { BsArrowLeftShort, BsSearch, BsChevronDown, BsGearFill, BsGraphUp, BsFolderFill, BsListNested, BsList } from 'react-icons/bs';
import Link from 'next/link';

interface Props{
    children: ReactNode;
}

const Layout = ({ children }:Props) => {
  
    const {data:session, update} = useSession()
    const [open, setOpen] = useState(true)
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const [menuId, setMenuId] = useState(0)

    const setSubMenu = (id:number) => {
      setSubmenuOpen(!submenuOpen);
      setMenuId(id);
    }

    const Menus = [
      { id:1, title: "Dashboard", route:"/", icon: <RiDashboardFill /> },
    ];

    const MenuAccount = [
      { id:5, title: "Profile", route: "profile", spacing: true, icon: <RiAccountCircleFill /> },
      { id:6, title: "Logout", route: "logout", icon: <RiLogoutCircleFill /> },
    ];

    const MenuAdmin = [
      { id:2, title: "Master", submenu: true, icon: <BsGearFill />,
        submenuItems: [
          { id:3, title: "Unit", route:"Unit" },
          { id:4, title: "Bank", route:"Bank" },
        ]
      },
      { id:2, title: "Employee", submenu: true, icon: <BsGearFill />,
        submenuItems: [
          { id:3, title: "Data", route:"Unit" },
          { id:4, title: "Organization", route:"Bank" },
        ]
      },
    ];

    const MenuSetting = [
      { id:2, title: "Setting", submenu: true, icon: <BsGearFill />,
        submenuItems: [
          { id:3, title: "User", route:"Unit" },
        ]
      },
    ];

    const MenuFinance = [
      { id:2, title: "Finance", submenu: true, icon: <BsGearFill />,
        submenuItems: [
          { id:3, title: "Unit", route:"Unit" },
          { id:4, title: "Bank", route:"Bank" },
        ]
      },
    ];

  return (
    <div className='flex'>
        <div className={`bg-dark-tosca h-screen p-5 pt-8 ${open ? "w-72": "w-20" } duration-300 relative`}>
          <BsArrowLeftShort onClick={()=>setOpen(!open)} className={`bg-white text-dark-tosca text-3xl rounded-full absolute -right-3 top-9 border border-dark-tosca cursor-pointer ${!open && "rotate-180"}`} />
          <div className='inline-flex'>
            <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${open && "rotate-[360deg]"}`} />
            <h1 className={`text-white origin-left text-xl duration-300 ${!open && "scale-0"}`}>GETMAP</h1>
          </div>

          <div className={`flex items-center rounded-md bg-light-white mt-6 ${!open ? "px-2.5" : "px-4"} py-2`}>
            <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`} />
            <input placeholder='Search' type={"search"} className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}/>
          </div>
          <ul className='pt-2 no-scrollbar overflow-y-auto max-h-[calc(100vh-140px)]' style={{ scrollBehavior: 'smooth' }}>
              
              <Link href={"/"}>
                  <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"}`}>
                      <span className='text-xl block float-left'><RiDashboardFill /></span>
                      <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                          Dashboard
                      </span>
                  </li>
              </Link>

              {/* Menu Master */}
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9"}`}>  
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Admin Menu
                  </span>
              </li>
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"}`}>
                  <span className='text-xl block float-left'><BsFolderFill /></span>
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Master
                  </span>
                  {open && (
                      <BsChevronDown className={`duration-300 ${menuId === 3 && submenuOpen && "rotate-180"}`} onClick={()=>{ setSubMenu(3)}} />
                  )}
              </li>
              {menuId === 3 && submenuOpen && open && (
              <ul>
                <Link href={"/Unit"}>
                    <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        Unit
                    </li>
                </Link>
                <Link href={"/Bank"}>
                    <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        Bank
                    </li>
                </Link>
              </ul>
              )}

              {/* Menu Finance */}
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9"}`}>  
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Finance Menu
                  </span>
              </li>
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"}`}>
                  <span className='text-xl block float-left'><BsList /></span>
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Master
                  </span>
                  {open && (
                      <BsChevronDown className={`duration-300 ${menuId === 1 && submenuOpen && "rotate-180"}`} onClick={()=>{ setSubMenu(1)}} />
                  )}
              </li>
              {menuId === 1 && submenuOpen && open && (
              <ul>
                <Link href={"/TahunAnggaran"}>
                    <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        Tahun Anggaran
                    </li>
                </Link>
                <Link href={"/Bagian"}>
                    <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        Bagian
                    </li>
                </Link>
              </ul>
              )}

              {/* Menu Setting */}
              <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9"}`}>
                  <span className='text-xl block float-left'><BsGearFill /></span>
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Settings
                  </span>
                  {open && (
                      <BsChevronDown className={`duration-300 ${menuId === 2 && submenuOpen && "rotate-180"}`} onClick={()=>{ setSubMenu(2)}} />
                  )}
              </li>
              {menuId === 2 && submenuOpen && open && (
              <ul>
                <Link href={"/Transaction"}>
                    <li className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        User
                    </li>
                </Link>
              </ul>
              )}

              {/* Menu Account */}
              <Link href={"/"}>
                  <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"}`}>
                      <span className='text-xl block float-left'><RiDashboardFill /></span>
                      <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                          Profile
                      </span>
                  </li>
              </Link>
              <li onClick={()=>{ signOut(); }} className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"}`}>
                  <span className='text-xl block float-left'><RiLogoutCircleFill /></span>
                  <span className={`text-base flex-1 duration-200 ${!open && "hidden"}`}>
                      Logout
                  </span>
              </li>

          </ul>
        </div>
        <div className='w-full p-7'>
            <div className="p-4">{children}</div>
        </div>
      </div>
  );
};

export default Layout;
