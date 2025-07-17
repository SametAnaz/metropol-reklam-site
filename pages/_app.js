import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';
import SEO from '../next-seo.config';
import BlobDebugger from '../components/debug/BlobDebugger';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Toaster position="top-right" />
      <BlobDebugger />
    </SessionProvider>
  );
}

export default App;
