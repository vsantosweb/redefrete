import styled from "@emotion/styled";

export const AuthContainer = styled.div`
  min-height: 100%;
  display: flex;
  align-items: flex-start;
  flex: 1;
  background-color: ${({ theme }: any) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: start;
  justify-content: flex-start;
  background: url(https://source.unsplash.com/random/1600x900) 0% 0% / cover
    no-repeat;
    width: 100%;

  background-repeat: no-repeat;
  justify-content: space-around;
  @media (min-width: 1024px) {
    align-items: center;

    /* background-color: ${({ theme }: any) => theme.colors.primary[50]}; */
  }
`;

export const AuthWrapper = styled.div`
  max-width: 420px;
  display: flex;
  gap: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  flex-direction: column;
  padding: 1.3em;
  background-color: #fff;
  border-radius: 10px;
  @media (max-width: 1024px) {
    box-shadow: none;
  }
`;

export const AuthHeader = styled.header`
  display: flex;
  /* border-bottom: solid 1px #ddd; */
  padding: ${({ theme }: any) => theme.defaultContainer.spacing} 0;
`;
export const AuthFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AuthLeadTitle = styled.h1`
  font-size: 26px;
  font-weight: bold;
`;

export const AuthBanner = styled.div`
  flex: 0 0 30%;

  @media (max-width: 1024px) {
    display: none;
  }
`;
