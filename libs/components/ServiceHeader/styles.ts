import styled from "@emotion/styled";

export const ServiceHeader = styled.header`
    display: flex;
    align-items: center;
    padding: ${({ theme }: any) => theme.defaultContainer.spacing};
    border-bottom: solid 1px #ddd;
    width: 100%;
    background-color: #fff;
`
export const ServiceHeaderLogoArea = styled.div`
`
export const ServiceHeaderWrapper = styled.div`
margin: auto;
width: ${({ theme }: any) => theme.defaultContainer.width}
`