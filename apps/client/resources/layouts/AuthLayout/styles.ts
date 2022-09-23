import styled from "@emotion/styled";

export const AuthContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  flex: 1;
  justify-content: space-around;
  @media (min-width: 1024px){
  align-items: center;

    /* background-color: ${({ theme }: any) => theme.colors.primary[50]}; */
  }
`;

export const AuthWrapper = styled.div`
  max-width: 460px;
  display: flex;
  flex-direction: column;
  padding: 1.3em;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  @media (max-width: 1024px){
    box-shadow:  none;
}
`;

export const AuthHeader = styled.header`
  display: flex;
  /* border-bottom: solid 1px #ddd; */
  padding: ${({ theme }: any) => theme.defaultContainer.spacing} 0;
`;
export const AuthFooter = styled.footer`
  padding: ${({ theme }: any) => theme.defaultContainer.spacing} 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthLeadTitle = styled.h1`
font-size: 26px;
font-weight: bold;
`

export const AuthBanner = styled.div`
flex: 0 0 30%;

@media (max-width: 1024px){
  display:  none;
}
`