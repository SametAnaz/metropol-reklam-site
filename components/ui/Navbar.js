import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from '@/styles/Navbar.module.css';

const navigation = [
  { name: 'Ana Sayfa', href: '/', isScroll: false },
  { name: 'Hakkımızda', href: '#about', fallbackHref: '/about', isScroll: true, sectionId: 'about' },
  { name: 'Hizmetlerimiz', href: '#services', fallbackHref: '/services', isScroll: true, sectionId: 'services' },
  { name: 'Portföy', href: '#portfolio', fallbackHref: '/portfolio', isScroll: true, sectionId: 'portfolio' },
  { name: 'Ürünler', href: '#products', fallbackHref: '/products', isScroll: true, sectionId: 'products' },
  { name: 'İletişim', href: '#contact', fallbackHref: '/contact', isScroll: true, sectionId: 'contact' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Use active section hook only on homepage
  const sectionIds = ['about', 'services', 'portfolio', 'products', 'contact'];
  const activeSection = useActiveSection(router.pathname === '/' ? sectionIds : []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleNavClick = (item, e) => {
    // If we're on homepage and it's a scroll item, scroll to section
    if (router.pathname === '/' && item.isScroll) {
      e.preventDefault();
      const targetId = item.href.substring(1); // Remove the #
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setIsMenuOpen(false); // Close mobile menu
      }
    }
    // If we're not on homepage, navigate to the fallback page
    else if (item.isScroll && item.fallbackHref) {
      // Let the default Link behavior handle this
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.affix : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <span className="font-bold">METROPOL</span>
            <span className="font-light ml-2">REKLAM</span>
          </Link>
        </div>

        <div className={`${styles.main_list} ${isMenuOpen ? styles.show_list : ''}`} id="mainListDiv">
          <ul className="flex items-center">
            {navigation.map((item) => {
              const isActive = router.pathname === '/' && item.sectionId 
                ? activeSection === item.sectionId 
                : router.pathname === (item.fallbackHref || item.href);
              
              return (
                <li key={item.name}>
                  <Link 
                    href={router.pathname === '/' && item.isScroll ? item.href : item.fallbackHref || item.href}
                    className={`${isActive ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            
            {status === 'loading' ? (
              <li className="animate-pulse bg-white/20 w-20 h-8 rounded-full" />
            ) : session ? (
              <li className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-white hover:text-orange-400 transition-colors"
                >
                  <span className="mr-2">{session.user.name || session.user.email}</span>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl py-1 z-50">
                    {session.user.role && (
                      <Link
                        href={session.user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {session.user.role === 'admin' ? 'Admin Panel' : 'Müşteri Paneli'}
                      </Link>
                    )}
                    {session.user.role === 'user' && (
                      <>
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Ayarlar
                        </Link>
                        <Link
                          href="/settings/change-password"
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Şifre Değiştir
                        </Link>
                      </>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <Link 
                  href="/auth/signin"
                  className="text-white hover:text-orange-400 transition-colors"
                >
                  Giriş Yap
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div 
          className={`${styles.navTrigger} ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </nav>
  );
}