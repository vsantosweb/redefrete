import React from 'react';

import { InputSelect, ListView } from '@redefrete/components';
import { Page } from '../../_app';

import * as Styled from './styles';
import { IDriverVehicleRepository, IDriverRepository } from '@redefrete/interfaces';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from 'next/router';
import { Vehicle } from '@redefrete/types';
import {
  Box, Button, FormControl, Heading, IconButton, Input, Select, Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react';

const driverVehicleService = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);
const driverService = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);

const vehicles = [
  { name: 'CPF/CNPJ', label: '565.555.888-33', path: '/veiculos/FLV-3465' },
  { name: 'Telefone', label: '11 9 9898988', path: '/veiculos/FLV-3465' },
]
const VehicleView: Page = () => {

  const [vehicle, setVehicle] = React.useState<Vehicle>({});
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  React.useEffect(() => {
    trackPromise(
      driverVehicleService.showVehicle(router.query['licence-plate'] as string).then(
        response => setVehicle(response.data)
      ), 'show-vehicle')
  }, [])

  const deleteVehicle = () => driverVehicleService.deleteVehicle(vehicle.id).then(response => router.push('/veiculos'))

  const promiseOptions = (inputValue: string) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(driverService.liveSearch(inputValue).then(response => {
          const data = response.map(x => {
            return { value: x.id, label: `${x.name} (${x.email})` }
          })

          return data;

        }));
      }, 1000);

    });
  }


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
      <Stack>
        <Box border={'solid 1px #ddd'} borderRadius={'10px'} bg={'white'} alignItems={'center'} p={4} style={{ 'display': 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Heading size={'md'} flex={1}>Motoristas</Heading>
          <div>
            <FormControl>
              <Input placeholder={'Todos...'} type={'search'} />
            </FormControl>
          </div>
          <FormControl width={'auto'}>
            <Select placeholder={'Status'}>
              <option>Pendente</option>
            </Select>
          </FormControl>

          <Button onClick={onOpen} leftIcon={<i className={'las la-plus'}></i>} colorScheme={'primary'}>Convidar Motorista</Button>

        </Box>

        <Box border={'solid 1px #ddd'} borderRadius={'10px'} bg={'white'} alignItems={'center'} style={{ gap: '10px' }}>
          <Styled.TableList>
            {Array.from({ length: 5 }, (x => x)).map((x, v) =>
              <Styled.TableListWrapper key={v}>
                <Styled.TableListContainer flex={1}>
                  <Styled.TableLisItem>
                    <p className={'text-sm font-bold text-gray-700'}>MOTORISTA</p>
                    <p style={{ whiteSpace: 'nowrap' }}>Vitor Laurencio Souza Santos</p>
                  </Styled.TableLisItem>
                </Styled.TableListContainer>

                <Styled.TableListContainer flex={1}>
                  <Styled.TableLisItem>
                    <p className={'text-sm font-bold'}>STATUS</p>
                    <p>Pendente</p>
                  </Styled.TableLisItem>
                </Styled.TableListContainer>

                <Styled.TableListContainer flex={1}>
                  <Styled.TableLisItem>
                    <p className={'text-sm font-bold'}>STATUS</p>
                    <p>Pendente</p>
                  </Styled.TableLisItem>
                </Styled.TableListContainer>

                <Styled.TableListContainer>
                  <Styled.TableLisItem>
                    <p className={'text-sm font-bold'}>CRIADO EM</p>
                    <p>20-10-2022</p>
                  </Styled.TableLisItem>
                </Styled.TableListContainer>

                <Styled.TableListContainer>
                  <Styled.TableLisItem>
                    <Menu>
                      <div> <MenuButton as={IconButton} icon={<i className={'las la-ellipsis-v'}></i>} /></div>
                      <MenuList>
                        <MenuItem>Cancelar Convite</MenuItem>
                      </MenuList>
                    </Menu>
                  </Styled.TableLisItem>
                </Styled.TableListContainer>

              </Styled.TableListWrapper>
            )}
          </Styled.TableList>
        </Box>
      </Stack>

      <>

        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Convidar Motorista</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <FormControl isRequired={true}>
                  <FormLabel>Email do motorista</FormLabel>
                  <Input maxLength={50} type={'email'} />
                  <FormHelperText>O motorista precisa possuir um cadastro Redefrete e ser autêntico, para ser convidado.</FormHelperText>
                </FormControl>
              </div>
            </ModalBody>

            <ModalFooter>

              <Button variant='ghost'>Cancelar</Button>
              <Button colorScheme={'primary'} mr={3} onClick={onClose}>Enviar Solciitação </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Styled.VehicleViewWrapper>
  )

}


VehicleView.config = {
  title: 'Meus Veículos',
  layout: 'ViewLayout'
}
export default VehicleView;