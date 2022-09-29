import styled from "@emotion/styled";


export const ProfileWrapper = styled.div`
display: flex;
flex-direction: column;
height: 100%;
justify-content: flex-start;
align-items: flex-start;
`


export const ProfileDetails = styled.aside`
display: flex;
flex-direction: column;
padding: 1em 0;
gap: 12px;

`

export const ProfileOverView = styled.div`
flex-grow: 1;
width: 100%;

`
export const ProfileAvatar = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 60px;
height: 60px;
background-color: #f1f1f1;
border-radius: 100%;
border: solid 4px #ddd;
font-size: 2em;
align-items: center;
`
export const ProfileInfoContainer = styled.div`
display: flex;
align-items: center;
gap: 12px;
justify-content: center;

`


export const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
`

export const ProfileInfoLabel = styled.div`
font-weight: bold;
color: #8f8f8f;
font-size: 16px;
`
export const ProfileInfoValue = styled.div`
color: #000;
`
