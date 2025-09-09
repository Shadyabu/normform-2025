import '@/styles/globals.css';
import { SiteGlobalsProvider } from '@/utils/SiteGlobalsContext';
import Layout from './_layout';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Push a pageview event to GTM on every client-side route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'pageview',
          page: url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Google Tag Manager script – loads container after page is interactive */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5T9KBN6L');`,
        }}
      />

      <SiteGlobalsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SiteGlobalsProvider>
    </>
  );
}
