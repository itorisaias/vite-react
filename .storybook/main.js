import { mergeConfig } from "vite";

export default {
  stories: ["../src/**/stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  staticDirs: ["../public"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add storybook-specific dependencies to pre-optimization
      optimizeDeps: {
        include: ["storybook-addon-designs"],
      },
    });
  },
  docs: {
    autodocs: true,
  },
};
