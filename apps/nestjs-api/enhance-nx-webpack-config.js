// Thanks goes to https://github.com/nrwl/nx/issues/4135 for this

// TL:DR: this uses a feature of NestJS's CLI to look up all GraphQL model/TS files
// (e.g. .entity.ts, see config below) and decorate them.
// More about this feature here:  https://docs.nestjs.com/graphql/cli-plugin

module.exports = function (config, context) {
  const tsLoader = config.module.rules.find((r) =>
    r.loader.includes('ts-loader')
  )

  if (tsLoader) {
    tsLoader.options.transpileOnly = false
    tsLoader.options.getCustomTransformers = (program) => {
      return {
        before: [
          require('@nestjs/graphql/plugin').before(
            {
              typeFileNameSuffix: [
                // '.input.ts',
                '.args.ts',
                // '.entity.ts',
                // '.model.ts',
                '.entityprops.ts',
                '.entityinput.ts',
              ],
              introspectComments: true,
            },
            program
          ),
        ],
      }
    }
  }

  return config
}
