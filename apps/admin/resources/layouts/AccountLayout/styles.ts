import styled from "@emotion/styled";


export const AppWrapper = styled.div`
flex-grow: 1;
height: auto;
`
export const AppContent = styled.div`
flex-grow: 1;
padding: 12px;
height: 100%;
`
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
`;
export const AccountHeaderWrapper = styled.header`
  flex-direction: column;
  border-bottom: solid 1px #ddd;
  width: 100%;
`;

export const SideBar = styled.aside`
  height: auto;
  min-height: 100%;
  width: 17em;
  min-width: 17em;
  text-align: left;
  transition: width, left, right, 0.3s;
  position: relative;
  z-index: 1009;
`;
export const AccountLogoArea = styled.div``;
export const AccountHeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }: any) => theme.defaultContainer.spacing};
  justify-content: space-between;
`;

export const AccountHeaderResmue = styled.div`
  padding: ${({ theme }: any) => theme.defaultContainer.spacing};
`;
export const AccountNavigation = styled.nav`
  display: flex;
`;
export const AccountNavItem = styled.nav``;
export const AccountResume = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountResumeText = styled.div``;
export const AccountResumeAmount = styled.div`
  font-size: 26px;
  font-weight: 700;
`;
