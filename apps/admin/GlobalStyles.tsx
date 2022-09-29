import { css } from "@emotion/react";
import styled from "@emotion/styled";

const GlobalStyles = css`
  body,
  html,
  #__next {
    height: 100%;

  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
      background-color: #e8e8e8;
  }

  ul{list-style:none !important; padding: 0; margin: 0;}

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
    &.swiper-button-disabled {
      opacity: 0.4;
    }
  }
  .InovuaReactDataGrid > div:nth-child(3) {
    display: none !important;
  }
`;
export const ViewPort = styled.main`
  max-width: ${({ theme }: any) => theme.defaultContainer.width};
  margin: auto;
  display: flex;
  min-height: 100%;
  height: 100%;
`;
export default GlobalStyles;
