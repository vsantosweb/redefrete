import styled from "@emotion/styled";


export const AccountWrapper = styled.div`
display: flex;
width: 100%;
flex-direction: column;
height: auto;
min-height: 100%;
background-color: #f1f1f1;

`
export const Account = styled.div`
  max-width: ${({ theme }: any) => theme.defaultContainer.width} ;
  width: 100%;
  margin: auto;
`
export const AccountHeader = styled.div`
width: 100%;

`
export const AccountHeaderWrapper = styled.div`
  flex-direction: column;
  border-bottom: solid 1px #ddd;
  width: 100% ;
  background: #fff;
  margin: auto;
  @media (max-width: 1024px){
  max-width: 100%;
}
`;
export const AccountLogoArea = styled.div``
export const AccountHeaderBar = styled.div`
  display: flex;
  align-items: center;
  padding: .8em ;
  justify-content: space-between;
  max-width: ${({ theme }: any) => theme.defaultContainer.width};
  width: 100%;
  margin: auto;
`;

export const AccountHeaderResmue = styled.div`
 padding: ${({ theme }: any) => theme.defaultContainer.spacing}  ;
 
`
export const AccountNavigation = styled.nav`
  display: flex;
`
export const AccountNavItem = styled.nav`
`
export const AccountResume = styled.div`
 display: flex;
 flex-direction: column;
`


export const AccountResumeText = styled.div``
export const AccountResumeAmount = styled.div`
font-size: 26px;
font-weight: 700;
`