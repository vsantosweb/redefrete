import styled from "@emotion/styled";

export const Container: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  opacity: 1;
  gap: 10px;
  transition: all 0.5s;
  width: 100%;
  z-index: 12;
  width: 100%;
  height: 100%;
  position: ${({ fullContainer }: any) => fullContainer ? 'absolute' : 'relative'};
  z-index: 999999;
  top: 0;
  right: 0;
  opacity: 1;
  justify-content: center;
  align-items: center;
`;
