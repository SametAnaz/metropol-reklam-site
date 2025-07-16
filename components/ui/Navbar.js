import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from '@/styles/Navbar.module.css';
import { HomeIcon, UserGroupIcon, PhotoIcon, ShoppingCartIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Ana Sayfa', href: '/', isScroll: false, icon: HomeIcon },
  { name: 'Hakkımızda', href: '#about', fallbackHref: '/about', isScroll: true, sectionId: 'about', icon: UserGroupIcon },
  { name: 'Portföy', href: '#portfolio', fallbackHref: '/portfolio', isScroll: true, sectionId: 'portfolio', icon: PhotoIcon },
  { name: 'Ürünler', href: '#products', fallbackHref: '/products', isScroll: true, sectionId: 'products', icon: ShoppingCartIcon },
  { name: 'İletişim', href: '#contact', fallbackHref: '/contact', isScroll: true, sectionId: 'contact', icon: EnvelopeIcon },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Use active section hook only on homepage
  const sectionIds = ['about', 'portfolio', 'products', 'contact'];
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
  
  // Logo optimizasyonu için
  useEffect(() => {
    // Logoyu önceden yükleyelim
    const img = new Image();
    img.src = "/metropol_logo2_500x500.png";
    // Sayfa yüklendikten sonra logo animasyonunu etkinleştir
    const timer = setTimeout(() => {
      const logoEl = document.querySelector(`.${styles.logo} img`);
      if (logoEl) {
        logoEl.style.opacity = "1";
        logoEl.style.visibility = "visible";
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = window.innerWidth - document.body.clientWidth + 'px';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

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
    
    // Açılırken kaydırma çubuğunu gizle, kapanırken geri getir
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    
    // Menü kapanınca kaydırma çubuğunu geri getir
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.classList.remove('mobile-menu-open');
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);
  
  // Toggle visibility of sections when mobile menu is open
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    if (isMenuOpen) {
      sections.forEach(section => {
        section.style.display = 'none';
      });
    } else {
      sections.forEach(section => {
        section.style.display = '';
      });
    }
  }, [isMenuOpen]);

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
        closeMenu(); // Close mobile menu
      }
    }
    // If we're not on homepage, navigate to the fallback page
    else if (item.isScroll && item.fallbackHref) {
      // Let the default Link behavior handle this
      closeMenu();
    } else {
      // For any other navigation, close the menu
      closeMenu();
    }
  };

  return (
    <>
      {/* Mobile menu overlay - her zaman DOM'da kalır ama isMenuOpen durumuna göre görünür/gizli olur */}
      <div 
        className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ''}`}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
        id="overlay"
      >
          <div className={styles.brand}>
            <Link href="/">
              <img 
                src="/metropol_logo2_500x500.png" 
                alt="Metropol Reklam Logo" 
                width="auto"
                height="auto"
                priority="true" 
                loading="eager"
              />
            </Link>
            <button 
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Menüyü kapat"
            >
              <span></span>
              <span></span>
            </button>
          </div>
          <ul>
            {navigation.map((item) => {
              // Aktif sekmenin doğru tespit edilmesi (mobil menü için)
              const isActive = router.pathname === '/' 
                ? item.isScroll ? activeSection === item.sectionId : router.pathname === item.href
                : router.pathname === (item.fallbackHref || item.href);
              
              return (
                <li key={item.name}>
                  <Link 
                    href={router.pathname === '/' && item.isScroll ? item.href : item.fallbackHref || item.href}
                    className={`${isActive ? styles.active : ''}`}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    {item.icon && <item.icon className={styles.navIcon} />}
                    {item.name}
                  </Link>
                </li>
              );
            })}
            
            {status !== 'loading' && !session && (
              <li>
                <Link 
                  href="/auth/signin"
                  className="text-white"
                  onClick={closeMenu}
                >
                  <UserIcon className={styles.navIcon} />
                  Giriş Yap
                </Link>
              </li>
            )}
          </ul>
        </div>
      
      <nav className={`${styles.nav} ${scrolled ? styles.affix : ''}`}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Link href="/">
              <img 
                src="/metropol_logo2_500x500.png" 
                alt="Metropol Reklam Logo" 
                width="auto"
                height="auto"
                priority="true" 
                loading="eager"
              />
            </Link>
          </div>

          <div className={styles.main_list} id="mainListDiv">
            <ul>
              {navigation.map((item) => {
                // Aktif sekmenin doğru tespit edilmesi
                const isActive = router.pathname === '/' 
                  ? item.isScroll ? activeSection === item.sectionId : router.pathname === item.href
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
                    <div className={styles.rect}></div>
                  </li>
                );
              })}
              
              {status === 'loading' ? (
                <li className="animate-pulse bg-white/20 w-20 h-8 rounded-full" />
              ) : session ? (
                <li className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-white hover:text-[#ff7b00] transition-colors"
                  >
                    <span className="mr-2">{session.user.name || session.user.email}</span>
                    <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={styles.rect}></div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-xl py-1 z-50">
                      {session.user.role && (
                        <Link
                          href={session.user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'}
                          className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                          onClick={() => {
                            setDropdownOpen(false);
                            closeMenu();
                          }}
                        >
                          {session.user.role === 'admin' ? 'Admin Panel' : 'Müşteri Paneli'}
                        </Link>
                      )}
                      {session.user.role === 'user' && (
                        <>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                            onClick={() => {
                              setDropdownOpen(false);
                              closeMenu();
                            }}
                          >
                            Ayarlar
                          </Link>
                          <Link
                            href="/settings/change-password"
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                            onClick={() => {
                              setDropdownOpen(false);
                              closeMenu();
                            }}
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
                    className="text-white hover:text-[#ff7b00] transition-colors"
                    onClick={closeMenu}
                  >
                    Giriş Yap
                  </Link>
                  <div className={styles.rect}></div>
                </li>
              )}
            </ul>
          </div>

          <div 
            className={`${styles.navTrigger} ${isMenuOpen ? styles.active : ''}`} 
            onClick={toggleMenu}
            id="toggler"
            aria-label="Mobil menüyü aç"
            role="button"
            tabIndex={0}
          >
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </nav>
    </>
  );
}