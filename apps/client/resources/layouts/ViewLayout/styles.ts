import styled from "@emotion/styled";


export const AccountWrapper = styled.div`
display: flex;
width: 100%;
flex-direction: column;
background: #f1f1f1;
height: auto;
min-height: 100%;
gap: 10px;
`
export const AccountHeaderWrapper = styled.header`
  flex-direction: column;
  background-color: #fff ;
  border-bottom: solid 1px #ddd;
  width: 100%;

`;

export const ViewContent = styled.div`
  width: ${({ theme }: any) => theme.defaultContainer.width} ;
  margin:0 auto;
  @media (max-width: 1024px){
  max-width: 100%;

}
`

export const AccountLogoArea = styled.div``
export const AccountHeaderBar = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding:0.4em .9em 0.4em 0;
  justify-content: space-between;
  width: ${({ theme }: any) => theme.defaultContainer.width} ;
  @media (max-width: 1024px){
  max-width: 100%;

}
  margin: auto;
`;

export const AccountHeaderResmue = styled.div`
 padding: ${({ theme }: any) => theme.defaultContainer.spacing} ;
 
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