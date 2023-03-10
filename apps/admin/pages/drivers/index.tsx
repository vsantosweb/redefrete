import React from 'react';
import suspenseResource from '../../suspenseResource';
import { Avatar, Box, Input, Modal, Spinner, Stack, Link as ChakraLink, Select, Button, Badge, useDisclosure, ModalFooter, ModalOverlay, ModalCloseButton, ModalBody, ModalHeader, ModalContent, Alert } from '@chakra-ui/react';
import { Page } from '../_app';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import Link from 'next/link';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverBankRepository, IDriverRepository } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import { useForm } from 'react-hook-form';
import csvDownload from 'json-to-csv-export';
import queryString from 'query-string';
import { DriverForm } from '@redefrete/templates/forms';
import { useRouter } from 'next/router';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);
interface CsvDownloadProps {
  data: any[];
  filename?: string;
  delimiter?: string;
  headers?: string[];
}


const columns: Array<IColumn> = [
  { name: 'id', header: 'id', defaultVisible: false },
  {
    name: 'name', header: 'Nome', defaultFlex: 2.6, render: ({ value, ...rest }) => {

      return <Box display={'flex'} alignItems={'center'} gap={'10px'}><Avatar size={'sm'} name={value} /><Link href={'/drivers/' + rest.data.id}><ChakraLink>{value} <strong>({rest.data.email})</strong></ChakraLink></Link></Box>
    }
  },
  { name: 'document_1', header: 'CPF/CNPJ', defaultFlex: 1 },
  { name: 'phone', header: 'Telefone/Whatsapp', defaultFlex: 1 },
  { name: 'status', header: 'Status', defaultFlex: 1 },
  {
    name: 'recommend_hub', header: 'Hub', defaultFlex: 1,
    render: ({ data }) => data.recommended_hub ? <Badge variant={'solid'} colorScheme={'purple'}>{data.recommended_hub.code} - {data.recommended_hub.name}</Badge> : 'N/A'
  },
  { name: 'created_at', header: 'Criado em', defaultFlex: 1 },
];

const Driver: Page = () => {

  const [drivers, setDrivers] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [filterData, setFilterData] = React.useState<string>(null)
  const [loading, setLoading] = React.useState(false);
  const [driverStatuses, setDriverStatuses] = React.useState([]);
  const [driverFormErrorMessage, setDriverFormErrorMessage] = React.useState(false);
  const filter = useForm();
  const driverForm = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();
  // const onSelectionChange = React.useCallback(({ data }) => { Router.push(`/drivers/${data[0].id}`) }, [])

  const filterDrivers = search.length > 0 ? drivers.filter(driver => driver.document_1.includes(search)) : []


  const loadData = ({ skip, sortInfo, limit }) => {
    return driverRepository.list('?skip=' + skip + '&limit=' + limit + '&' + filterData)
      .then(response => {
        setDrivers(response.data)
        return { data: response.data, count: response.count };
      })
  }

  React.useEffect(() => {
    driverRepository.statusList().then(response => setDriverStatuses(response.data))
  }, [])

  const dataSource = React.useCallback(loadData, [filterData])

  const submitFilter = (formData) => {

    Object.keys(formData).map(data => formData[data] == '' && delete formData[data])
    setFilterData(queryString.stringify(formData))
  }

  const dataToConvert: CsvDownloadProps = {
    data: drivers,
    filename: 'motoristas',
    delimiter: ',',
    headers: drivers?.length > 0 && Object.keys(drivers[0])
  }
  const handleCreateDriver = (form) => {


    driverRepository.create(form).then(response => {
      router.push(`/drivers/${response.data.id}?action=created`)
    }).catch(error => setDriverFormErrorMessage(error.response.data.message))
  }

  return (
    <Stack h={'100%'}>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
        <div>
          <Input name={'search'} onChange={e => setSearch(e.target.value)} placeholder='CPF do motorista' />
        </div>
        <form onSubmit={filter.handleSubmit(submitFilter)} style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>

            <div>
              <Input size={'md'} type={'date'} {...filter.register('created_at')} placeholder="CEP" />
            </div>

            <div>
              <Select {...filter.register('driver_status_id')} placeholder={'Status'}>
                {driverStatuses.map((item, index) => (<option value={item.id} key={index}>{item.name}</option>))}
              </Select>
            </div>
            <div>
              {filterData && <Button onClick={() => [setFilterData(null), filter.reset()]} rightIcon={<i className={'las la-times'}></i>}>Limpar</Button>}
            </div>
            <div>
              <Button type={'submit'} rightIcon={<i className={'las la-filter'}></i>} colorScheme={'primary'}>Pesquisar</Button>
            </div>
          </div>
        </form>
        <div>
          <Button colorScheme={'primary'} variant={'outline'} onClick={() => csvDownload(dataToConvert)}>Exportar em CSV</Button>
        </div>
        <div>
          <Button colorScheme={'green'} leftIcon={<i className={'las la-plus'}></i>} onClick={onOpen}>Adicionar novo</Button>
        </div>
      </div>

      <DataGrid
        pagination
        columns={columns}
        dataSource={search.length > 0 ? filterDrivers : dataSource || []}
        onLoadingChange={setLoading}
      />


      <Modal size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={driverForm.handleSubmit(handleCreateDriver)}>
            <ModalHeader>Novo Motorista</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {driverFormErrorMessage && <Alert status={'error'}>{driverFormErrorMessage}</Alert>}
              <DriverForm form={driverForm} />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose}>Cancelar</Button>
              <Button type={'submit'} colorScheme={'green'}>Cadastrar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

Driver.config = { title: 'Conta de Usuários', layout: 'AccountLayout' }

export default Driver
