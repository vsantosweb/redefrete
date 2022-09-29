import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { ListView } from '@redefrete/components';
import { Page } from '../_app';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import VehicleForm from './_form';


const vehicles = [
  { name: 'MNL-4542', label: 'Fiat Toro', path: '/veiculos/FLV-3465' },
  { name: 'FLV-3465', label: 'Fiat Strada', path: '/veiculos/FLV-3465' },
]

const Vehicles: Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <ListView list={vehicles} />
      <Button onClick={onOpen} colorScheme={'primary'} size={'lg'} width={'100%'}>+ Adicionar Novo</Button>
      <>

        <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastrar novo Veículo</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={0}>
              <VehicleForm />
            </ModalBody>


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