'use client';

import Link from 'next/link';
import Header from './Header';
import logo from '@/public/logo.svg';
import Image from 'next/image';
interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className="px-4">
          <nav className="navbar p-0 bg-[#2D3249] w-full relative top-4 rounded-lg">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost text-base-content lg:hidden inline-block">
              {/* Sidebar toggle icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 text-base-content">
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>            
            <div className="flex items-center justify-between flex-1 px-0">
              <Header />
            </div>
          </nav>
        </div>
        {/* Page content here */}
        <div className="p-4">
          {children}
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-[#2D3249] is-drawer-close:w-14 is-drawer-open:w-64">
          <Image src={logo} alt="Logo" className="h-auto w-10 mx-auto my-4" />
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link 
                href="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content" 
                data-tip="Inicio"
              >
                {/* Home icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 text-base-content">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Inicio</span>
              </Link>
            </li>

            {/* List item */}
            <li>
              <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content" data-tip="Configuración">
                {/* Settings icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4 text-base-content">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Configuración</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

