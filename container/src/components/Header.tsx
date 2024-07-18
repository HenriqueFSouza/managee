import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { headerLinks } from '../consts/headerLinks';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useUser } from 'hooks/UserContext';


const Header = ({ isAdmin }: { isAdmin?: boolean }) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useUser()

  const activePath = (path: string) => {
    return pathname.includes(path)
  }

  return (
    <header className="bg-neutral shadow-lg p-2 py-4 md:px-6">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto">
        <a className="text-black sm:text-xl text-2xl  font-bold" href='/'>Manag<span className='text-accent'>.ee</span></a>
        <div className="flex space-x-6">
          {isAdmin && (
            <>
              <nav className="space-x-6 text-zinc-600">
                {headerLinks.map((link, index) => (
                  <Link
                    className="text-md md:text-lg hover:underline hover:font-medium hover:text-black"
                    key={index}
                    to={link.path}
                    style={{
                      color: activePath(link.path) ? '#4f46e5' : '',
                      fontWeight: activePath(link.path) ? '600' : '500'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav><button
                className="flex items-center gap-2 text-zinc-600 text-md md:text-lg hover:text-accent hover:font-medium"
                onClick={() => { logout(); navigate('/'); }}
              >
                <FaArrowRightFromBracket />
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
