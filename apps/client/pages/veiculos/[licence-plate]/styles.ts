import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ThemeProps } from '@redefrete/themes/default';

export const VehicleViewWrapper = styled.div``;
export const PhotoCarousel = styled.div``;

export const VehicleDetailsWrapper = styled.div`
  background-color: #fff;
  margin-bottom: 10px;
  padding: 1em;
  border: solid 1px #ddd;
  border-radius: ${({ theme }: { theme?: ThemeProps }) => theme.defaultRadius};
`;

export const VehcleDetailList = styled.ul``;
export const VehcleDetailListItem = styled.li`
  padding: 10px 8px 10px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-grid;
  width: 50%;
  display: inline-grid;
`;

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