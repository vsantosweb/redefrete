import React from 'react';
import { Page } from './_app';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Stack,
} from '@chakra-ui/react'
import * as echarts from 'echarts';


const Home: Page = () => {


  return (
    <Stack>
      <StatGroup gap={3}>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
      <StatGroup gap={3}>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
        <Stat border={'solid 1px #eee'} p={3}>
          <StatLabel>Customers</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Stack>
  )
}


Home.config = {
  title: 'Dashboard',
  layout: 'AccountLayout'
}

export default Home
