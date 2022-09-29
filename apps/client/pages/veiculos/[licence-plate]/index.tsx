import { ListView } from '@redefrete/components';
import { Page } from '../../_app';

import * as Styled from './styles';
const vehicles = [
  { name: 'CPF/CNPJ', label: '565.555.888-33', path: '/veiculos/FLV-3465' },
  { name: 'Telefone', label: '11 9 9898988', path: '/veiculos/FLV-3465' },
]
const VehicleView: Page = () => {
  return (
    <Styled.VehicleViewWrapper>
      <Styled.PhotoCarousel>
        <img src={'https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2022/02/18/20220215_183437.jpg'} />
      </Styled.PhotoCarousel>
      <Styled.VehicleDetailsWrapper>
        <Styled.VehcleDetailList>
          <Styled.VehcleDetailListItem>
            <h2>Modelo</h2>
            <strong>Toro</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Marca</h2>
            <strong>Fiat</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Versao</h2>
            <strong>2.0</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>RENAVAM</h2>
            <strong>0003256598</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Ano</h2>
            <strong>2015</strong>
          </Styled.VehcleDetailListItem>
        </Styled.VehcleDetailList>
      </Styled.VehicleDetailsWrapper>
      <ListView list={vehicles} />
    </Styled.VehicleViewWrapper>
  )

}


VehicleView.config = {
  title: 'Meus Veículos',
  layout: 'ViewLayout'
}
export default VehicleView;