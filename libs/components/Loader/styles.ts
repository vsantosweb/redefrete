import styled from '@emotion/styled';

export const Container: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 1;
  gap: 10px;
  background-color: ${({ fullScreen }: any) => fullScreen ? '#00000080' : 'none'};
  transition: all 0.5s;
  width: 100%;
  z-index: 12;
  width: 100%;
  height: 100%;
  position: ${({ fullScreen }: any) =>
    fullScreen ? 'absolute' : 'relative'};
  z-index: 999999;
  top: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s;
  -webkit-animation: fadeIn 0.3s;
  -moz-animation: fadeIn 0.3s;
  -o-animation: fadeIn 0.3s;
  -ms-animation: fadeIn 0.3s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
