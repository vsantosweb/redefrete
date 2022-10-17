import React from 'react';

import { ListView } from '@redefrete/components';
import { Page } from '../../_app';

import * as Styled from './styles';
import { IDriverVehicleRepository } from '@redefrete/interfaces';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from 'next/router';
import { Vehicle } from 'libs/Types';
import { Heading, IconButton } from '@chakra-ui/react';

const driverVehicleService = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);


const vehicles = [
  { name: 'CPF/CNPJ', label: '565.555.888-33', path: '/veiculos/FLV-3465' },
  { name: 'Telefone', label: '11 9 9898988', path: '/veiculos/FLV-3465' },
]
const VehicleView: Page = () => {

  const [vehicle, setVehicle] = React.useState<Vehicle>({});
  const router = useRouter();

  React.useEffect(() => {
    trackPromise(
      driverVehicleService.showVehicle(router.query['licence-plate'] as string).then(
        response => setVehicle(response.data)
      ), 'show-vehicle')
  }, [])

  const deleteVehicle = () => driverVehicleService.deleteVehicle(vehicle.id).then(response => router.push('/veiculos'))
  return (
    <Styled.VehicleViewWrapper>
      {/* <Styled.PhotoCarousel>
        <img src={'https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2022/02/18/20220215_183437.jpg'} />
      </Styled.PhotoCarousel> */}
      <Styled.VehicleDetailsWrapper>
        <Heading size={'md'}>Detalhes</Heading>
        <Styled.VehcleDetailList>
          <Styled.VehcleDetailListItem>
            <h2>Modelo</h2>
            <strong>{vehicle.model}</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Marca</h2>
            <strong>{vehicle.brand}</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>RENAVAM</h2>
            <strong>{vehicle.licence_number}</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Placa</h2>
            <strong>{vehicle.licence_plate}</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Placa</h2>
            <strong>{vehicle.licence_plate}</strong>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <span>
              <IconButton
                title={'Excluir veículo'}
                colorScheme={'red'}
                icon={<i className={'las la-trash'}></i>}
                aria-label={'delete-vehicle'}
                onClick={deleteVehicle}
              />
            </span>
          </Styled.VehcleDetailListItem>
          <Styled.VehcleDetailListItem>
            <h2>Responsável</h2>
            <strong>{vehicle.owner_name}</strong>
          </Styled.VehcleDetailListItem>

        </Styled.VehcleDetailList>
      </Styled.VehicleDetailsWrapper>

      {/* <Styled.VehicleDetailsWrapper>
        <Heading size={'md'}>Motoristas</Heading>
        <ListView list={vehicles} />
      </Styled.VehicleDetailsWrapper> */}

    </Styled.VehicleViewWrapper>
  )

}


VehicleView.config = {
  title: 'Meus Veículos',
  layout: 'ViewLayout'
}
export default VehicleView;