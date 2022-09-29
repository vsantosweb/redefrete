import styled from "@emotion/styled";

export const NavigationContainer = styled.div`
 list-style: none;
`
export const NavigationList = styled.div`
`
export const NavigationListItem = styled.div`
padding: 1.6em ${({ theme }: any) => theme.defaultContainer.spacing};
border-bottom: solid 1px #ddd;
display: flex;
justify-content: space-between;
`

export const NavigationTitle = styled.h3`
font-weight: bold;
font-size: 22px;
`
export const NavigationItemContent = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`
