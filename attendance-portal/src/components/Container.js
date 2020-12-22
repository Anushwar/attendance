import styled from '@emotion/styled';

const Container = styled.div(({ type }) => {
  const main = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    '@media screen and (min-width: 640px)': {
      maxWidth: 640,
    },
    '@media screen and (min-width: 768px)': {
      maxWidth: '100%',
    },
  };
  switch (type) {
    case 'center':
      return {
        ...main,
        '@media screen and (min-width: 1024px)': {
          maxWidth: 1024,
        },
        '@media screen and (min-width: 1280px)': {
          maxWidth: 1280,
        },
      };
    default:
      return main;
  }
});

export default Container;
