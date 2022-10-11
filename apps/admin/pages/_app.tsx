import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './styles.css';
import type { AppProps } from 'next/app'
import Theme from '@redefrete/themes/default';
import Head from 'next/head';
import type { NextPage } from 'next';
import { layout, Layout, LayoutProps } from '../resources/layouts';
// import "../resources/fonts/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css";
import { RouteGuard } from '../RouteGuard';
import '@inovua/reactdatagrid-enterprise/index.css';
import '@inovua/reactdatagrid-enterprise/theme/pink-light.css';
import 'libs/fonts/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css';
import NProgress from 'nprogress'
import { useRouter } from 'next/router';
import { LoaderTracker } from '@redefrete/components';

type PageConfigProps = {
  title?: string,
  description?: string
  layout?: layout

}
export type Page = NextPage & {
  config?: PageConfigProps
}

type AppPropsWithLayout = AppProps & {
  Component: Page
}

function App({ Component, pageProps }: AppPropsWithLayout) {

  const router = useRouter();

  const [pageLoader, setPageLoader] = React.useState(false);


  const handleStart = () => { setPageLoader(true) }
  const handleStop = () => { setPageLoader(false) }


  React.useEffect(() => {


    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }


  }, [router])

  return (
    <Theme>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <title>{Component?.config?.title || null}</title>
      </Head>
      <RouteGuard>
        <LoaderTracker promisse={pageLoader} />
        <Layout title={Component?.config?.title} layout={Component?.config?.layout || 'DefaultLayout'}>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </Theme>

  )
}

export default App
