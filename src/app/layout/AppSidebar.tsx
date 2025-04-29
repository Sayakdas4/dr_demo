"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import feather from 'feather-icons';

type MenuItem = {
  id: string;
  icon: string,
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    icon: string,
  }[];
};

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.5 3.25A2.25 2.25 0 0 0 3.25 5.5V9a2.25 2.25 0 0 0 2.25 2.25H9A2.25 2.25 0 0 0 11.25 9V5.5A2.25 2.25 0 0 0 9 3.25zM4.75 5.5a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75V9a.75.75 0 0 1-.75.75H5.5A.75.75 0 0 1 4.75 9zm.75 7.25A2.25 2.25 0 0 0 3.25 15v3.5a2.25 2.25 0 0 0 2.25 2.25H9a2.25 2.25 0 0 0 2.25-2.25V15A2.25 2.25 0 0 0 9 12.75zM4.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1-.75-.75zm8-9.5A2.25 2.25 0 0 1 15 3.25h3.5a2.25 2.25 0 0 1 2.25 2.25V9a2.25 2.25 0 0 1-2.25 2.25H15A2.25 2.25 0 0 1 12.75 9zM15 4.75a.75.75 0 0 0-.75.75V9c0 .414.336.75.75.75h3.5a.75.75 0 0 0 .75-.75V5.5a.75.75 0 0 0-.75-.75zm0 8A2.25 2.25 0 0 0 12.75 15v3.5A2.25 2.25 0 0 0 15 20.75h3.5a2.25 2.25 0 0 0 2.25-2.25V15a2.25 2.25 0 0 0-2.25-2.25zM14.25 15a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75z"
              clipRule="evenodd"
            />
          </svg>`,
    label: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 24" fill="none" transform="rotate(0 0 0)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0243 2C9.62483 2 7.67969 3.94514 7.67969 6.34459C7.67969 8.74404 9.62483 10.6892 12.0243 10.6892C14.4237 10.6892 16.3689 8.74404 16.3689 6.34459C16.3689 3.94514 14.4237 2 12.0243 2ZM9.17969 6.34459C9.17969 4.77357 10.4533 3.5 12.0243 3.5C13.5953 3.5 14.8689 4.77357 14.8689 6.34459C14.8689 7.91562 13.5953 9.18918 12.0243 9.18918C10.4533 9.18918 9.17969 7.91562 9.17969 6.34459Z" fill="currentColor"></path>
                        <path d="M8.95703 12.189C6.05754 12.189 3.70703 14.5395 3.70703 17.439V18.75C3.70703 19.9926 4.71439 21 5.95703 21H11.3459C10.9705 20.5454 10.6523 20.0417 10.4026 19.5H5.95703C5.54282 19.5 5.20703 19.1642 5.20703 18.75V17.439C5.20703 15.3679 6.88596 13.689 8.95703 13.689H10.4311C10.6878 13.1462 11.0135 12.6424 11.3968 12.189H8.95703Z" fill="currentColor"></path>
                        <path d="M16.6494 11.25C17.0636 11.25 17.3994 11.5858 17.3994 12V12.4378C18.3902 12.5884 19.1494 13.444 19.1494 14.4768C19.1494 14.8911 18.8136 15.2268 18.3994 15.2268C17.9852 15.2268 17.6494 14.8911 17.6494 14.4768C17.6494 14.1661 17.3975 13.9142 17.0868 13.9142H16.3994C15.9852 13.9142 15.6494 14.25 15.6494 14.6642V14.9293C15.6494 15.2419 15.8433 15.5218 16.1361 15.6316L17.6895 16.2141C18.5676 16.5435 19.1494 17.383 19.1494 18.3209V18.5859C19.1494 19.6567 18.4014 20.5528 17.3994 20.7802V21.25C17.3994 21.6642 17.0636 22 16.6494 22C16.2352 22 15.8994 21.6642 15.8994 21.25V20.8124C14.9086 20.6618 14.1494 19.8062 14.1494 18.7733C14.1494 18.3591 14.4852 18.0233 14.8994 18.0233C15.3136 18.0233 15.6494 18.3591 15.6494 18.7733C15.6494 19.0841 15.9013 19.3359 16.212 19.3359H16.8994C17.3136 19.3359 17.6494 19.0002 17.6494 18.5859V18.3209C17.6494 18.0082 17.4555 17.7284 17.1628 17.6186L15.6093 17.036C14.7312 16.7067 14.1494 15.8672 14.1494 14.9293V14.6642C14.1494 13.5934 14.8974 12.6974 15.8994 12.47V12C15.8994 11.5858 16.2352 11.25 16.6494 11.25Z" fill="currentColor"></path>
                      </svg>`,
    children: [
      { icon: 'home', label: 'View Leads', href: '/admin/leads/view-leads' },
      //{ icon: 'home', label: 'Add Leads', href: '/admin/leads/add-leads' },
    ],
  }
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMouseEnter = () => {
    document.body.classList.add('toggle-sidemenu-temp');
  };

  const handleMouseLeave = () => {
    document.body.classList.remove('toggle-sidemenu-temp');
  };
  useEffect(() => {
    feather.replace();
  });

  const isActive = (href: string) => {
    return pathname === href ? 'menu-item-active' : 'menu-item-inactive';
  };

  const handleMenuClick = (e: any) => {
    const menuItem = e.currentTarget;
    const parentLi = menuItem.closest('li');

    if (parentLi) {
      menuItem.classList.toggle('side-menu--open');

      const subIcon = menuItem.querySelector('.side-menu__sub-icon');
      if (subIcon) {
        subIcon.classList.toggle('transform');
        subIcon.classList.toggle('rotate-90');
      }

      const subMenu = parentLi.querySelector('ul');
      if (subMenu) {
        subMenu.classList.toggle('side-menu__sub-open');
      }
    }
  };

  const handleSubmenuClick = (e: any) => {
    const menuItem = e.currentTarget;
    const parentLi = menuItem.closest('li');

    if (parentLi) {
      menuItem.classList.toggle('side-menu--open');

      const subIcon = menuItem.querySelector('.side-menu__sub-icon');
      if (subIcon) {
        subIcon.classList.toggle('transform');
        subIcon.classList.toggle('rotate-90');
      }

      const subMenu = parentLi.querySelector('ul');
      if (subMenu) {
        subMenu.classList.toggle('side-menu__sub-open');
      }
    }
  };

  return (

    <aside
    onMouseEnter={handleMouseEnter} 
    onMouseLeave={handleMouseLeave}
      className="side-nav-outer fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-full transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
    overflow-hidden
   -translate-x-full
   lg:translate-x-0"
    >
      <div className="py-4 flex  justify-start">
        <a href="/">
          <img
            alt="Logo"
            loading="lazy"
            width={150}
            height={40}
            decoding="async"
            data-nimg={1}
            src="/images/logo/drl_logo.svg"
            className="main-logo transition duration-300 ease-linear"
          />
          <img
            alt="Logo"
            loading="lazy"
            width={40}
            height={40}
            decoding="async"
            data-nimg={1}
            className="icon-logo transition duration-300 ease-linear"
            src="/images/logo/drl_logo_icon.png"
            style={{ color: "transparent" }}
          />
        </a>
      </div>
      <div className="flex flex-col overflow-y-auto  duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
                Menu
              </h2>
              <ul className="flex flex-col gap-4">

                {menuItems.map((item) => (
                  <li key={item.id} className="mb-1" >
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleMenu(item.id)}
                          
                          className="menu-item flex w-full items-center"
                        >
                          <span className="menu-item-icon-inactive" dangerouslySetInnerHTML={{ __html: item.icon }}>

                          </span>
                          <span className="menu-item-text">{item.label}</span>
                          <svg
                            className={`ml-auto w-5 h-5 transition-transform ${openMenus[item.id] ? 'rotate-180' : ''
                              }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        <div
                          className={`transition-all overflow-hidden duration-300 ${openMenus[item.id] ? 'max-h-[1000px]' : 'max-h-0'
                            }`}
                        >
                          <ul className="mt-2 space-y-1 ml-9">
                            {item.children.map((sub, index) => (
                              <li key={sub.href}>
                                <Link href={sub.href} className={`menu-dropdown-item menu-dropdown-item-inactive ${isActive(sub.href!)}`}>
                                  {sub.label}

                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link href={item.href!} className={`menu-item group ${isActive(item.href!)}`}>
                        <span className="menu-item-icon-inactive" dangerouslySetInnerHTML={{ __html: item.icon }}>

                        </span>
                        <span className="menu-item-text">{item.label}</span>

                      </Link>
                    )}
                  </li>
                ))}



              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>



  );
};