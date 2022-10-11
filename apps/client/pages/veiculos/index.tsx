import React from 'react';
import { Box, Button, FormControl, FormLabel, Select, Stack, useDisclosure } from '@chakra-ui/react';
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
import { IDriverVehicleRepository, IVehicleTypeRepository } from '@redefrete/interfaces';
import { base64FileConverter } from '@redefrete/helpers';
import { trackPromise } from 'react-promise-tracker';

const driverVehicleService = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);


const Vehicles: Page = () => {

  const [vehicles, setVehicles] = React.useState([]);
  const [vehicleCreated, setVehicleCreated] = React.useState(null);

  const { user } = React.useContext(RouteGuardContext);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const vehicleForm = useForm<UseFormProps | any>({ mode: 'onChange', defaultValues: { name: user.name, document_1: user.document_1 } });

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
    let data = { ...formData.vehicle, }

    data.document_file = await base64FileConverter(data.document_file[0]);
    data.driver_bank_id = formData.driver_bank_id

    // return console.log(data);

    await driverVehicleService.createVehicle(data).then(response => {
      console.log(response)
      onClose()
      setVehicleCreated(Math.random());
    })
  }
  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <div style={{textAlign:'right'}}><Button onClick={onOpen}  colorScheme={'primary'} >+ Adicionar novo</Button></div>
      <Loader isPromisse={true} area={'fetch-vehicles'}>
        <ListView list={vehicles} />
      </Loader>
      <>
        <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={vehicleForm.handleSubmit(handleCreateVehicle)}>
              <ModalHeader>Cadastrar novo Veículo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  <VehicleForm form={vehicleForm} />
                  <FormControl isInvalid={false}>
                    <FormLabel>Conta para pagamento</FormLabel>
                    {/* <Select {...vehicleForm.register('driver_bank_id', { required: false })}>
                      <option>Nubank - Pagamentos </option>
                    </Select> */}
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button type={'submit'} disabled={!vehicleForm.formState.isValid} isLoading={vehicleForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
              </ModalFooter>
            </form>
          </ModalContent>
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