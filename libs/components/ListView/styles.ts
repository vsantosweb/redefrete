import styled from "@emotion/styled";

export const ListContainer = styled.div`
 list-style: none;
`
export const List = styled.div`
`
export const ListListItem = styled.div`
padding: 1em ${({ theme }: any) => theme.defaultContainer.spacing};
border-bottom: solid 1px #ddd;
display: flex;
gap: 5px;
align-items: center;
justify-content: space-between;
`

export const ListTitle = styled.h3`
font-weight: bold;
font-size:18px;
`
export const ListItemContent = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
