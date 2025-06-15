import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
//import { Analytics } from "@vercel/analytics/react" ;
import { Analytics } from "@vercel/analytics/next" ;
import { SpeedInsights } from '@vercel/speed-insights/react';
//import { SpeedInsights } from '@vercel/speed-insights/next';
import SEO from '../next-seo.config';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  );
}

export default App;
