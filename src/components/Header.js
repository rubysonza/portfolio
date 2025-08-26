import Link from 'next/link';   
import styles from './Header.module.css';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { RiMenu4Fill } from "react-icons/ri";
import { PiLampPendant } from "react-icons/pi";


export default function Header() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>
                ruby sonza
            </Link>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
                <ul>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>

            <button className={styles.lampButton} aria-label="Light or dark mode">
                <PiLampPendant size={25} strokeWidth={5}/>
            </button>

            {/* Mobile Icons */}
            <div className={styles.mobileNav}>
                <button className={styles.iconButton} aria-label="Open menu">
                    <RiMenu4Fill size={25} strokeWidth={0.5}/>
                </button>
            </div>
        </div>
      </header>
    );
  }