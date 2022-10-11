import styled from "@emotion/styled";

export const NavigationContainer = styled.div`
 list-style: none;
 background: #fff;
 box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`
export const NavigationList = styled.div`
`
export const NavigationListItem = styled.div`
padding: 1.6em ${({ theme }: any) => theme.defaultContainer.spacing};
border-bottom: solid 1px #ddd;
display: flex;
justify-content: space-between;
&:hover{
    background-color: ${({ theme }: any) => theme.colors.primary};
    color: #fff;
}
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
