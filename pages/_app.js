import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import SEO from '../next-seo.config';
import BlobDebugger from '../components/debug/BlobDebugger';
import Script from 'next/script';

function App({ Component, pageProps: { session, ...pageProps } }) {
  // Check if we are in production environment
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      {isProduction && (
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="610cc1d0-d081-41b5-a29a-fb2fb627d970"
          strategy="lazyOnload"
        />
      )}
      <Component {...pageProps} />
      <Toaster position="top-right" />
      <BlobDebugger />
    </SessionProvider>
  );
}

export default App;
