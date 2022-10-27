import styled from '@emotion/styled';

export const ListContainer = styled.div`
  list-style: none;
  background: #fff;
  border: solid 1px #ddd;
  border-radius: ${({ theme }: { theme: ThemeProps }) => theme.defaultRadius};
`;
export const List = styled.div``;
export const ListListItem = styled.div`
  padding: 1em ${({ theme }: any) => theme.defaultContainer.spacing};
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #ddd;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ListTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;
export const ListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
