import styled from '@emotion/styled';
import { Button } from '@chakra-ui/core';

const Agog = styled(Button)(({ theme }) => {
  const { colors, speeds } = theme;
  return {
    padding: '0.75rem 3rem',
    width: '100%',
    background: colors.gray.surface,
    transition: `all ${speeds.default}ms ease`,
    fontSize: 14,
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
    },
  };
});

export default Agog;
