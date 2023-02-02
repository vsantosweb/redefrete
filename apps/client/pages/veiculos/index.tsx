import React from 'react';
import { Alert, Box, Button, FormControl, FormLabel, Heading, Select, Stack, useDisclosure } from '@chakra-ui/react';
import { ListView, Loader } from '@redefrete/components';
import { Page } from '../_app';
import { RouteGuardContext } from '../../RouteGuard';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { VehicleForm } from '@redefrete/templates/forms';
import { useForm, UseFormProps } from 'react-hook-form';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverVehicleRepository } from '@redefrete/interfaces';
import { base64FileConverter } from '@redefrete/helpers';
import { trackPromise } from 'react-promise-tracker';

const driverVehicleService = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);


const Vehicles: Page = () => {

  const [vehicles, setVehicles] = React.useState([]);
  const [vehicleCreated, setVehicleCreated] = React.useState(null);
  const [apiStatusError, setApiStatusError] = React.useState(null)
  const { user } = React.useContext(RouteGuardContext);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const vehicleForm = useForm<UseFormProps | any>({ mode: 'onChange', defaultValues: { ...user } });

  React.useEffect(() => {
    trackPromise(
      driverVehicleService.getVehicles().then(
        resp => setVehicles(
          resp.data.map(vehicle => (
            {
              name: vehicle.licence_plate,
              label: `${vehicle.brand} - ${vehicle.model}`,
              path: `/veiculos/${vehicle.licence_plate}`
            }
          )
          )
        )
      ), 'fetch-vehicles')
  }, [vehicleCreated])

  const handleCreateVehicle = async (formData) => {
    const data = { ...formData.vehicle, }

    data.document_file = await base64FileConverter(data.document_file[0]);
    data.driver_bank_id = formData.driver_bank_id

    await driverVehicleService.createVehicle(data).then(response => {
      onClose()
      setVehicleCreated(Math.random());
    }).catch(error => setApiStatusError(error.response.data.message))
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Loader isPromisse={true} area={'fetch-vehicles'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} style={{ textAlign: 'right' }}>
          <Heading size={'md'}>Meus Veículos</Heading>
          <Button onClick={onOpen} leftIcon={<i className={'las la-plus'}></i>} colorScheme={'primary'}>Adicionar novo</Button>
        </Box>

        <ListView list={vehicles} />
      </Loader>
      <>
        <Modal scrollBehavior={'inside'} size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={vehicleForm.handleSubmit(handleCreateVehicle)}>
            <ModalContent>
              <ModalHeader>Cadastrar novo Veículo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  {apiStatusError && <Alert size={'sm'} status={'error'}>Erro: {apiStatusError}</Alert>}

                  <VehicleForm form={vehicleForm} />
                  <FormControl isInvalid={false}>
                    <FormLabel>Conta para pagamento</FormLabel>
                    <Select placeholder={'Selecione...'} {...vehicleForm.register('driver_bank_id', { required: true })}>
                      {user.banks.map((bank, index) => <option key={index} value={bank.id}> {bank.bank_name} </option>)}
                    </Select>
                    <small>Adicionar conta bancária +</small>
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button type={'submit'} disabled={!vehicleForm.formState.isValid} isLoading={vehicleForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      </>
    </Box>
  )

}


Vehicles.config = {
  title: 'Meus Veículos',
  layout: 'ViewLayout'
}
export default Vehicles;