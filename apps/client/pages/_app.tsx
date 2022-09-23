import React, { ReactElement, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import type { AppProps } from 'next/app'
import Theme from '../theme'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'
import type { NextPage } from 'next';
import { layout, Layout, LayoutProps } from '../resources/layouts';
// import "../resources/fonts/line-awesome-1.3.0/1.3.0/css/line-awesome.min.css";
import { RouteGuard, RouteGuardContext } from '../RouteGuard';

import { IDriverAuthRepository } from '@redefrete/interfaces';

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
            <motion.div
              variants={{ hidden: { opacity: 0, }, enter: { opacity: 1, }, exit: { opacity: 0, }, }} // Pass the variant object into Framer Motion 
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear' }} // Set the transition to linear
            >
              <Component {...pageProps} />
            </motion.div>
          </Layout>
        </AnimatePresence>
      </RouteGuard>
    </Theme>

  )
}

export default App
