import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    green: '#90ee90',
  },
  speeds: {
    default: 150,
    200: 200,
    300: 300,
  },
  fonts: {
    body: "'Space Grotesk', sans-serif",
    heading: "'Space Grotesk', sans-serif",
    mono: "'Space Grotesk', sans-serif",
  },
};

export default customTheme;
