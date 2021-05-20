module.exports = {
  env: {
    NODE_ENV: '"development"',
    CUSTOM_ENV: `"${process.env.CUSTOM_ENV}"`,
    DEBUG: process.env.DEBUG,
  },
  defineConstants: {},
  mini: {},
  h5: {}
}
