export default ({ env }) => ({
    upload: {
      config: {
        providerOptions: {
          sizeLimit: 250 * 1024 * 1024,
          localServer: {
            maxage: 300000
          },
        },
      },
    },
  });