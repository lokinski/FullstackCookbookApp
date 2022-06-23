import { createGlobalStyle } from 'styled-components';
import { ORANGE_COLOR } from '../constans/colors';

export const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background: #f2f2f2;
  }

  #nprogress .bar {
    background: ${ORANGE_COLOR} !important;
  }

  .icon {
    width: 20px !important;
  }
`;
