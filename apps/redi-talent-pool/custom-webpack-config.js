const nrwlConfig = require('@nrwl/react/plugins/webpack.js') // require the main @nrwl/react/plugins/webpack configuration function.
const { merge } = require('lodash')

module.exports = (config, context) => {
  nrwlConfig(config) // first call it so that it @nrwl/react plugin adds its configs,

  const mergedConfig = merge({}, config, {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        process: require.resolve('process/browser'),
        zlib: require.resolve('browserify-zlib'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
        buffer: require.resolve('buffer'),
        asset: require.resolve('assert'),
      },
    },
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     Buffer: ['buffer', 'Buffer'],
    //     process: 'process/browser',
    //   }),
    // ],
    node: undefined,
  })

  return mergedConfig

  return { ...config, node: undefined }
}

/**
 * Eric Bolikowski, 04 May 2021.
 * Alright, this was a strange issue. We needed to put in place the above webpack configuration
 * which changes how the redi-talent-pool app is built. There's an entry in `workspace.json`
 * that ensures that this file right here is being run:
 * workspace.json > projects > redi-talent-pool > targets > build > options > webpackConfig
 *
 * Before the above stuff was put in place the followig errors made it impossible to build
 * redi-talent-pool:
 * ********************************
 * ERROR in /Users/eric/connect/connect/node_modules/@react-pdf/pdfkit/lib/pdfkit.browser.es.js
 * Module not found: Error: Can't resolve 'stream' in '/Users/eric/connect/connect/node_modules/@react-pdf/pdfkit/lib'
 *
 * ERROR in /Users/eric/connect/connect/node_modules/blob-stream/index.js
 * Module not found: Error: Can't resolve 'stream' in '/Users/eric/connect/connect/node_modules/blob-stream'
 *
 * ERROR in /Users/eric/connect/connect/node_modules/restructure/src/EncodeStream.js
 * Module not found: Error: Can't resolve 'stream' in '/Users/eric/connect/connect/node_modules/restructure/src'
 *
 * ERROR in /Users/eric/connect/connect/node_modules/@react-pdf/pdfkit/lib/pdfkit.browser.es.js
 * Module not found: Error: Can't resolve 'zlib' in '/Users/eric/connect/connect/node_modules/@react-pdf/pdfkit/lib'
 *
 * ERROR in /Users/eric/connect/connect/node_modules/@react-pdf/png-js/lib/png-js.browser.es.js
 * Module not found: Error: Can't resolve 'zlib' in '/Users/eric/connect/connect/node_modules/@react-pdf/png-js/lib'
 * ********************************
 *
 * After a lot of googling I finally came across this guy that had the same issue:
 * https://github.com/nrwl/nx/issues/4817
 *
 * Following up his fix of `node: undefined` fixed everything.
 * Other resorces that were used to figure out how to set up this file:
 * - https://nx.dev/latest/node/core-concepts/configuration (refernce on options in workspace.json)
 * - https://yonatankra.com/how-to-use-custom-webpack-configuration-in-a-nrwl-project/#customizationSteps
 *   (guide on how to customize webpack config)
 * - https://github.com/nrwl/nx/issues/3175 (aonther good example on customizing webpack config)
 * - https://webpack.js.org/configuration/node/ (webpack config reference)
 *
 */
