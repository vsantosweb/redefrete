import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';
//driver list
export const TableList = styled.div`
  width: 100%;
`;

export const TableListWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 22px;
  flex-direction: row;
  border-bottom: solid 1px #ddd;
  &:nth-last-of-type(1){
    border:0;
  }
  padding: 1em 0;
  @media (max-width: 1024px){
    flex-direction: column;
  }
`;

export const TableListContainer = styled(Box)`
padding: 0  1em;
`;
export const TableLisItem = styled.div`
  display: flex;
  flex-direction: column;
  
`;