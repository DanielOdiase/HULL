import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'

import '../styles/tailwind.css'
import '../styles/app.css'

import { isBrowser, useScrollRestoration } from '@lib/helpers'
import { pageTransitionSpeed } from '@lib/animate'

import { SiteContextProvider } from '@lib/context'

import Cart from '@components/cart'

// Console Credits
if (isBrowser) {
  console.groupCollapsed(
    '%c💀 Site Credits',
    'display:block;padding:0.125em 1em;font-family:courier;font-size:14px;font-weight:bold;line-height:2;text-transform:uppercase;background:black;color:white;'
  )
  console.log(
    '%cDesign by Nick DiMatteo \n– https://nickdimatteo.com',
    'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
  )
  console.log(
    '%cWeb Development by Nick DiMatteo \n– https://nickdimatteo.com',
    'display:block;font-family:courier;font-size:12px;font-weight:bold;line-height:1;color:black;'
  )
  console.groupEnd()
}

const MyApp = ({ Component, pageProps, router }) => {
  const [isLoading, setLoading] = useState(false)

  const { data } = pageProps

  // Handle scroll position on history change
  useScrollRestoration(router, pageTransitionSpeed)

  // Trigger our loading class
  useEffect(() => {
    if (isBrowser) {
      document.documentElement.classList.toggle('is-loading', isLoading)
    }
  }, [isLoading])

  // Setup page transition loading states
  useEffect(() => {
    Router.events.on('routeChangeStart', (_, { shallow }) => {
      // Bail if we're just changing URL parameters
      if (shallow) return

      // Otherwise, start loading
      setLoading(true)
    })

    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => setLoading(false), pageTransitionSpeed)
    })

    Router.events.on('routeChangeError', () => {
      setLoading(false)
    })
  }, [])

  // intelligently add focus states if keyboard is used
  const handleFirstTab = (event) => {
    if (event.keyCode === 9) {
      if (isBrowser) {
        document.body.classList.add('is-tabbing')
        window.removeEventListener('keydown', handleFirstTab)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  return (
    <ThemeProvider enableSystem={false} disableTransitionOnChange>
      <SiteContextProvider data={{ ...data?.site }}>
        <LazyMotion features={domAnimation}>
          {isLoading && (
            <Head>
              <title>Loading...</title>
            </Head>
          )}
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => {
              document.body.classList.remove('overflow-hidden')
            }}
          >
            <Component key={router.asPath.split('?')[0]} {...pageProps} />
          </AnimatePresence>

          <Cart data={{ ...data?.site }} />
        </LazyMotion>
      </SiteContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
