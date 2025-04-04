import type { NextConfig } from 'next'

import i18nConfig from './next-i18next.config.js'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: i18nConfig.i18n as any,
  compiler: {
    styledComponents: true
  }
}

export default nextConfig
