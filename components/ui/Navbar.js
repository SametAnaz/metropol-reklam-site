import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
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
  const [mounted, setMounted] = useState(false);
  const isHomePage = router.pathname === '/';

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
    return (
      <nav className="fixed w-full z-50 bg-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-white">METROPOL</span>
                <span className="text-2xl font-light text-white">REKLAM</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 animate-slide-down ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-lg'
        : isHomePage 
          ? 'bg-transparent'
          : 'bg-gray-900/80'
    }`}>
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${
                scrolled 
                  ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                  : 'text-white'
              } transition-all duration-300`}>
                METROPOL
              </span>
              <span className={`text-2xl font-light ${
                scrolled ? 'text-gray-900' : 'text-white'
              } transition-all duration-300`}>
                REKLAM
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
            <div className="flex space-x-2">
              {navigation.map((item, index) => {
                const isActive = router.pathname === item.href;
                return (
                  <div
                    key={item.name}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                        isActive 
                          ? 'text-primary' 
                          : scrolled 
                            ? 'text-gray-900 hover:text-primary' 
                            : 'text-white hover:text-primary'
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Bizimle İletişime Geçin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className={`p-2 rounded-md ${
                    scrolled ? 'text-gray-900' : 'text-white'
                  } hover:bg-primary/10 transition-colors duration-300`}>
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-100 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="absolute top-full left-0 right-0 w-full bg-white shadow-lg rounded-b-xl overflow-hidden">
                      <div className="px-4 py-3 space-y-1">
                        {navigation.map((item) => {
                          const isActive = router.pathname === item.href;
                          return (
                            <Disclosure.Button
                              key={item.name}
                              as={Link}
                              href={item.href}
                              className={`block w-full px-4 py-2 text-left rounded-md text-sm font-medium transition-all duration-300 ${
                                isActive 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'text-gray-900 hover:bg-primary/5 hover:text-primary'
                              }`}
                            >
                              {item.name}
                            </Disclosure.Button>
                          );
                        })}
                        <div className="pt-2 pb-1">
                          <Link
                            href="/contact"
                            className="block w-full bg-gradient-to-r from-primary to-secondary text-white text-center px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity duration-300"
                          >
                            Bizimle İletişime Geçin
                          </Link>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </nav>
  );
} 