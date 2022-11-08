import React from 'react';

import { DriverPartnerList, InputSelect, ListView } from '@redefrete/components';
import { Page } from '../../_app';

import * as Styled from './styles';
import { IDriverVehicleRepository, IDriverRepository, IDriverPartnerRepository } from '@redefrete/interfaces';
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
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const driverVehicleService = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);
const driverPartnerService = container.get<IDriverPartnerRepository>(SERVICE_KEYS.DRIVER_PARTNER_REPOSITORY);

const VehicleView: Page = () => {

  const [vehicle, setVehicle] = React.useState<Vehicle>({});
  const [partnerErrorMessage, setPartnerErrorMessage] = React.useState<string>(null);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, reset, formState } = useForm();

  React.useEffect(() => { showVehicle() }, [])

  const showVehicle = () => trackPromise(
    driverVehicleService.showVehicle(router.query['licence-plate'] as string).then(
      response => setVehicle(response.data)
    ), 'show-vehicle')

  const deleteVehicle = () => driverVehicleService.deleteVehicle(vehicle.id).then(response => router.push('/veiculos'))

  const invitePartner = async (formData) => {

    formData.vehicle_id = vehicle.id;

    return await driverPartnerService.invitePartner(formData).then((response) => {

      if (!response.success) return setPartnerErrorMessage(response.message)
      onClose()
      reset()
      showVehicle()
    })
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
          {/* <div>
            <FormControl>
              <Input placeholder={'Todos...'} type={'search'} />
            </FormControl>
          </div>
          <FormControl width={'auto'}>
            <Select placeholder={'Status'}>
              <option>Pendente</option>
            </Select>
          </FormControl> */}

          <Button onClick={onOpen} leftIcon={<i className={'las la-plus'}></i>} colorScheme={'primary'}>Convidar Motorista</Button>

        </Box>

        <Box border={'solid 1px #ddd'} borderRadius={'10px'} bg={'white'} alignItems={'center'} style={{ gap: '10px' }}>
          {vehicle?.partners?.length > 0 ? <DriverPartnerList showVehicle={showVehicle} partners={vehicle.partners} /> : 'Sem parceiros'}
        </Box>
      </Stack>

      <>

        <Modal isCentered isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
          <ModalOverlay />
          <form onSubmit={handleSubmit(invitePartner)}>
            <ModalContent>
              <ModalHeader>Convidar Motorista</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  <FormControl isRequired={true} isInvalid={partnerErrorMessage ? true : false}>
                    <FormLabel>Email do motorista</FormLabel>
                    <Input maxLength={50} type={'email'} {...register('email', { required: true })} />
                    <FormErrorMessage>{partnerErrorMessage}</FormErrorMessage>
                    <FormHelperText>O motorista precisa possuir um cadastro Redefrete e ser autêntico, para ser convidado.</FormHelperText>
                  </FormControl>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => [onClose(), reset()]} variant='ghost'>Cancelar</Button>
                <Button isLoading={formState.isSubmitting} type={'submit'} colorScheme={'primary'} mr={3} >Enviar Solciitação </Button>
              </ModalFooter>

            </ModalContent>
          </form>
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