import { css } from "@emotion/react";
import styled from "@emotion/styled";

const GlobalStyles = css`

  body,
  html, #__next {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  }

  *:focus {
    outline: none !important;
  }
  .slideNav {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    background: none;
    border: solid 1px;
    outline: none;
    font-size: 24px;
    box-shadow: none;
    margin-bottom: 0;  
    margin-right: 0.4em;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    &:focus {
      outline: none;
    }
    &.swiper-button-disabled{
      opacity: .4;
    }
  }
  .InovuaReactDataGrid > div:nth-child(3) {
    display: none !important;
  }
`;
export const ViewPort = styled.main`
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: auto;
  align-items: center;
`;

export default GlobalStyles;
