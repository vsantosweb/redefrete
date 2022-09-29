
import { ServiceHeader } from '@redefrete/components';
import * as Styled from './styles';

export default function DefaultLayout({ children }: any) {
    return (
        <Styled.DefaultWrapper>
            <ServiceHeader />
            <Styled.DefaultContainer>
                {children}
            </Styled.DefaultContainer>
            <footer style={{ position: 'relative', bottom: '0', padding: '1em', textAlign:'center' }}>
                <small>
                    Todos os direitos reservados.
                    Direitos autorais {new Date().getFullYear()} - redefrete.com.br®
                </small>
            </footer>
        </Styled.DefaultWrapper>
    )
}
