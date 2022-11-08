import { Heading } from '@chakra-ui/react';
import { PartnerVehicleList } from '@redefrete/components';
import React from 'react';
import { Page } from '../_app';

// import { Container } from './styles';

 const PartnerVehicle: Page = () => {
    return(
        <div>
          <Heading size={'md'} flex={1}>Veículos Parceiros</Heading>

            <PartnerVehicleList />
        </div>
    )
}

PartnerVehicle.config = {
    title: 'Veículos Parceiros',
    layout: 'ViewLayout'
  }

export default PartnerVehicle;