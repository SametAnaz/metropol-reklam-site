import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Navbar.module.css';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Hizmetlerimiz', href: '/services' },
  { name: 'Portföy', href: '/portfolio' },
  { name: 'Ürünler', href: '/products' },
  { name: 'İletişim', href: '/contact' },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          <ul>
            {navigation.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`${router.pathname === item.href ? styles.active : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {status === 'loading' ? (
              <li className="animate-pulse bg-white/20 w-20 h-8 rounded-full" />
            ) : session ? (
              <li>
                <button onClick={() => signOut({ callbackUrl: '/' })}>
                  Çıkış Yap
                </button>
              </li>
            ) : (
              <li>
                <Link href="/auth/signin">Giriş Yap</Link>
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