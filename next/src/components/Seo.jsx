import Head from 'next/head';

const Seo = (props) => {
  const { seoDescription, seoImage, image, globalData, } = props;

  return (
    <Head>
      <title>NORMFORM</title>
      <meta property='og:title' content='NORMFORM' />
      <meta property='twitter:title' content='NORMFORM' />

      <meta property='og:type' content='website' />
      <meta property='twitter:card' content='summary_large_image' />
      {
        globalData?.settingsData?.seoTags &&
        <meta name="keywords" content={ `${ globalData?.settingsData?.seoTags.join(', ') }` } />
      }
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {
        globalData?.settingsData?.faviconIco ?
          <link rel="icon" href={ globalData?.settingsData?.faviconIco } /> :
          <link rel="icon" href="/favicon.ico" />
      }
      {
        globalData?.settingsData?.faviconPng &&
        <link rel="icon" href={ globalData?.settingsData?.faviconPng } sizes='32x32' />
      }
      {
        seoDescription ?
        <>
          <meta name="description" content={ seoDescription } />
          <meta property='og:description' content={ seoDescription } />
          <meta property='twitter:description' content={ seoDescription } />
          </>
          :
          globalData?.settingsData?.seoDescription ?
        <>
          <meta name="description" content={ globalData.settingsData.seoDescription } />
          <meta property='og:description' content={ globalData.settingsData.seoDescription } />
          <meta property='twitter:description' content={ globalData.settingsData.seoDescription } />
            </>
            :
            <></>
      }
      {
        seoImage?.url ?
        <>
          <meta property="og:image" content={ seoImage.url } />
          <meta property="twitter:image" content={ seoImage.url } />
        </>
        :
        image?.url ?
        <>
          <meta property="og:image" content={ image.url } />
          <meta property="twitter:image" content={ image.url } />
        </>
            :
        globalData?.settingsData?.seoImage?.url ?
        <>
          <meta property="og:image" content={ globalData?.settingsData?.seoImage.url } />
          <meta property="twitter:image" content={ globalData?.settingsData?.seoImage.url } />
          </>
          :
          <></>
      }
    </Head>
  )
};

export default Seo;

export const runtime = 'edge';
export const isStatic = true;