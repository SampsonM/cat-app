/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: { // https://www.snowpack.dev/reference/configuration#mount
    public: { url: '/', static: true },
    src: { url: '/dist' }
  },
  plugins: [ // https://www.snowpack.dev/reference/configuration#plugins
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-typescript'
  ]
};
