import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* Google Tag Manager noscript fallback – renders when JS is disabled */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5T9KBN6L"
                     height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
