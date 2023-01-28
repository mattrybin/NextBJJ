const config: any = {
  stories: ["../stories/**/*.stories.tsx"],
  // "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
    buildStoriesJson: true,
  },
}

export default config
