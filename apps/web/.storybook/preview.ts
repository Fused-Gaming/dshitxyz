import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#F5F5F5',
        },
        {
          name: 'dark',
          value: '#09090B',
        },
        {
          name: 'brand',
          value: '#7C3AED',
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
