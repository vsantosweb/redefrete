import React from 'react';
import { Page } from './_app';
import {
  Stack,
  Heading,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Grid, GridItem
} from '@chakra-ui/react'

import { DateRangePicker } from 'rsuite';

import DriverStatusOverview from '../resources/overview/DriverStatusOverview';
import moment from 'moment';
import { container, SERVICE_KEYS } from '@redefrete/container';

import { IDriverRepository } from '@redefrete/interfaces';

const driver = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);


const Home: Page = () => {

  const [value, setValue] = React.useState<any>([
    new Date(moment().startOf('month').format("YYYY-MM-DD HH:mm:ss")),
    new Date(moment().endOf('month').format("YYYY-MM-DD HH:mm:ss"))
  ]);

  const [driverRangeData, setDriverRangeData] = React.useState([]);
  const [driverHubsRangeData, setDriverHubsRangeData] = React.useState([]);

  React.useEffect(() => {

    driver.rangeDate({ date_from: moment(value[0]).format('YYYY-MM-DD'), date_to: moment(value[1]).format('YYYY-MM-DD') })
      .then(response => setDriverRangeData(response))

  }, [value])

  React.useEffect(() => {

    driver.hubsRangeDate({ date_from: moment(value[0]).format('YYYY-MM-DD'), date_to: moment(value[1]).format('YYYY-MM-DD') })
      .then(response => setDriverHubsRangeData(response))

  }, [value])
  return (
    <Stack>
      <div>
        <DateRangePicker
          cleanable={false}
          defaultValue={value}
          onChange={setValue}
        />
      </div>
      <Card variant={'outline'}>
        <CardHeader>
          <Stack direction={'row'} alignItems={'center'}>
            <Heading size='md'>Captação por período</Heading>

          </Stack>

        </CardHeader>
        <CardBody>
          <DriverStatusOverview rangeData={driverRangeData} type={'bar'} groupBy={'status'} />
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>

      <Card variant={'outline'}>
        <CardHeader>
          <Stack direction={'row'} alignItems={'center'}>
            <Heading size='md'>{`Distribuição para HUB's`}</Heading>

          </Stack>

        </CardHeader>
        <CardBody>
          <DriverStatusOverview rangeData={driverHubsRangeData} type={'bar'} groupBy={'company'} />
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
    </Stack>
  )
}


Home.config = {
  title: 'Dashboard',
  layout: 'AccountLayout'
}

export default Home
