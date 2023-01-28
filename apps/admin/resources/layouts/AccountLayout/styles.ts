import styled from '@emotion/styled';

export const AppWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* height: auto;
position: relative; */
`;
export const AppContent = styled.div`
  padding: 0 1.8em;
  position: relative;
  flex: 1;
`;
export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  position: relative;

  /* flex: 1; */
`;
export const AccountHeaderWrapper = styled.header`
  flex-direction: column;
  border-bottom: solid 1px #ddd;
  width: 100%;
`;

export const SideBar = styled.aside`
  height: auto;
  min-height: 100%;
  width: 60px;
  min-width: 60px;
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
