import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Hizmetlerimiz', href: '/services' },
  { name: 'Portföy', href: '/portfolio' },
  { name: 'Ürünler', href: '/products' },
  { name: 'İletişim', href: '/contact' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <Disclosure
      as="nav"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      {({ open }) => (
        <>
          <div className="container mx-auto px-4">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              
              {/* Logo */}
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-white text-xl font-bold">METROPOL REKLAM</span>
                </Link>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-6">
                  {navigation.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`${
                          isActive ? 'text-primary font-medium' : 'text-white hover:text-primary'
                        } transition-colors duration-200 px-2 py-2 text-md`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* Contact button */}
              <div className="hidden sm:flex items-center">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Bizimle İletişime Geçin
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden bg-dark">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`${
                      isActive ? 'bg-primary text-white' : 'text-gray-200 hover:bg-primary hover:text-white'
                    } block px-3 py-2 rounded-md text-base font-medium w-full text-left`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
              <Disclosure.Button
                as={Link}
                href="/contact"
                className="block w-full text-left mt-4 bg-primary text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Bizimle İletişime Geçin
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
} 