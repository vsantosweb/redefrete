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

  return (
    <Theme>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
        <title>{Component?.config?.title || null}</title>
      </Head>
      <RouteGuard>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Layout title={Component?.config?.title} layout={Component?.config?.layout || 'DefaultLayout'}>
            
              <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </RouteGuard>
    </Theme>

  )
}

export default App
