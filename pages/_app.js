import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
