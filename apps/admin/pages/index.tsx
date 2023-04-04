import React from 'react';
import { Page } from './_app';
import {
  Stack,
  Heading,
} from '@chakra-ui/react'
import { Grid, Row, Col, Badge } from 'rsuite';

import { DateRangePicker } from 'rsuite';
import { Panel, Placeholder } from 'rsuite';

import DriverStatusOverview from '../resources/overview/DriverStatusOverview';
import moment from 'moment';
import { container, SERVICE_KEYS } from '@redefrete/container';

import { IDriverRepository } from '@redefrete/interfaces';
import ApexChart from '../resources/components/Charts';
import BasicBarChart from '../resources/components/Charts/BasicBarChart';
import LineChart from '../resources/overview/LineChart';
import _ from 'lodash';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import { DataGrid } from '@redefrete/components';

const driver = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);

const Card = ({ children, title, ...rest }) => (
  <Panel {...rest} bordered header={title}>
    {children}
  </Panel>
);


const approvalRegisterColumns: Array<IColumn> = [
  { name: 'id', header: 'id', defaultVisible: false },
  {
    name: 'name', header: 'Nome', defaultFlex: 1.8, render: ({ value, ...rest }) => <strong>{rest.data.name}</strong>
  },
  { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1.3 },
  { name: 'vehicle_type', header: 'Tipo de veículo', defaultFlex: .7 },
  { name: 'city', header: 'Cidade', defaultFlex: 1 },
  { name: 'hub', header: 'HUB', defaultFlex: 1.4, render: ({ value, ...rest }) => <Badge color="violet" content={rest.data.hub} /> },
  { name: 'company', header: 'Empresa', defaultFlex: 1 },

];

const registerByHubsColumns: Array<IColumn> = [
  { name: 'id', header: 'id', defaultVisible: false },
  { name: 'name', header: 'HUB', defaultFlex: 4, render: ({ value, ...rest }) => <strong>{rest.data.name}</strong> },
  { name: 'qty', header: 'Qty', defaultFlex: 1, render: ({ value, ...rest }) => <Badge color="blue" content={rest.data.qty} /> },
];


const Home: Page = () => {

  const [value, setValue] = React.useState<any>([
    new Date(moment().startOf('month').format("YYYY-MM-DD HH:mm:ss")),
    new Date(moment().endOf('month').format("YYYY-MM-DD HH:mm:ss"))
  ]);

  const [driverRangeData, setDriverRangeData] = React.useState([]);
  const [driverHubsRangeData, setDriverHubsRangeData] = React.useState([]);

  const groupByHub = _.groupBy(driverHubsRangeData, 'hub');



  const registerByHub = Object.keys(groupByHub).map((item, index) => {
    return {
      id: index + 1,
      name: item,
      qty: groupByHub[item].length
    }
  })

  React.useEffect(() => {

    driver.rangeDate({ date_from: moment(value[0]).format('YYYY-MM-DD'), date_to: moment(value[1]).format('YYYY-MM-DD') })
      .then(response => setDriverRangeData(response))

  }, [value])

  React.useEffect(() => {

    driver.hubsRangeDate({ date_from: moment(value[0]).format('YYYY-MM-DD'), date_to: moment(value[1]).format('YYYY-MM-DD') })
      .then(response => setDriverHubsRangeData(response))

  }, [value])

  return (
    <Grid fluid>
      <Stack>
        <Row>
          <Col>
            <DateRangePicker
              cleanable={false}
              defaultValue={value}
              onChange={setValue}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>

            <Card title={'Total de Pré-cadastros'}>
              <BasicBarChart options={{ barColor: '#9043e7' }} rangeData={driverHubsRangeData} orderBy={'created_at'} />
            </Card>
          </Col>
          <Col lg={12}>
            <Card title={'Pré-cadastros por status'}>
              <DriverStatusOverview rangeData={driverHubsRangeData} type={'line'} groupBy={'is_avaiable'} />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={18}>
            <Card title={'Últimos Pré-cadastros aprovados'}>
              <DataGrid
                columns={approvalRegisterColumns}
                dataSource={_.slice(driverHubsRangeData, 0, 5)}
                style={{ minHeight: '244px' }}
              />
            </Card>
          </Col>
          <Col lg={6}>
            <Card title={'Pré-cadastros aprovados por HUB'}>
              <DataGrid
                columns={registerByHubsColumns}
                dataSource={registerByHub}
                style={{ minHeight: '244px' }}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Stack>
    </Grid>
  )
}

Home.config = {
  title: 'Dashboard',
  layout: 'AccountLayout'
}

export default Home
