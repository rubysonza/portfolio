import Link from 'next/link';
import { RiMenu4Fill } from 'react-icons/ri';
import { PiLampPendant } from 'react-icons/pi';


export default function Header() {
    return (
      <header className='z-1000 fixed top-0 left-0 w-full h-auto bg-none py-8 px-5 text-black'>
        <div className='flex justify-between items-center max-w-full my-0 mx-auto
                        md:grid md:grid-cols-3'>
            <Link href='/' className='flex justify-self-start items-center font-josefin font-extrabold text-lg lowercase'>
                ruby sonza
            </Link>

            <nav className='desktopNav hidden md:flex md:justify-self-center'>
                <ul className='flex list-none gap-8'>
                    {/* globals.css */}
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/projects'>Projects</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                </ul>
            </nav>

            <button className='hidden md:flex md:justify-self-end' aria-label='Light or dark mode'>
                <PiLampPendant size={25} strokeWidth={5}/>
            </button>

            <div className='flex md:hidden'>
                <button className='border-none cursor-pointer text-xl' aria-label='Open menu'>
                    <RiMenu4Fill size={25} strokeWidth={0.5}/>
                </button>
            </div>
        </div>
      </header>
    );
  }