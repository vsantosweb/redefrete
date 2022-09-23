import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface TesteProps {}

const StyledTeste = styled.div`
  color: pink;
`;

export function Teste(props: TesteProps) {
  return (
    <StyledTeste>
      <h1>Welcome to Teste!</h1>
    </StyledTeste>
  );
}

export default Teste;
