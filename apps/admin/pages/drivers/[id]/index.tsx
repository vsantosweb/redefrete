import React from 'react'
import { Page } from '../../_app'
import * as Styled from './styles';
import {
    Tabs, TabList, TabPanels, Tab, TabPanel, Link as ChakraLink, Stack, Button, Divider, Avatar, Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Select,
    FormControl,
    FormLabel,
    Link,
    Switch,
} from '@chakra-ui/react'
import { AddressForm, BankForm, DriverForm, LicenceForm, PasswordForm } from '@redefrete/templates/forms';
import { useForm } from "react-hook-form";
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverRepository } from '@redefrete/interfaces';
import { DataGrid } from '@redefrete/components';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { DriverProfile } from '@redefrete/types';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);




const Driver: Page = () => {

    const [driver, setDriver] = React.useState<DriverProfile>(null)
    const [driverStatuses, setDriverStatuses] = React.useState(null)

    const router = useRouter();

    const showDriver = (driverId) => {
        return driverRepository.show(driverId).then(response => setDriver(response.data))
    };

    React.useEffect(() => {

        showDriver(router.query.id)

        driverRepository.statusList().then().then(response => setDriverStatuses(response.data))

    }, [router.query.id])



    const driverDataForm = useForm({ mode: 'onChange' });


    const handleupdateDriverData = async (formData) => {
        console.log(formData)
    }

    const changeStatus = (e) => {
        driverRepository.changeStatus(router.query.id, { driver_status_id: e.target.value })
            .then(response => showDriver(router.query.id))
    }
    console.log(driver)
    return (
        driver ? <Styled.ProfileWrapper>
            <Styled.ProfileDetails>
                <Styled.ProfileInfoContainer>
                    <Avatar size={'lg'} name={driver.name} />
                    <Styled.ProfileInfo>
                        <Styled.ProfileInfoLabel>{driver.name}</Styled.ProfileInfoLabel>
                        <Styled.ProfileInfoValue>{driver.email}</Styled.ProfileInfoValue>

                        <FormControl isRequired={true}>
                            {
                                driver && <Select onChange={changeStatus} size={'xs'} defaultValue={driver?.driver_status_id || ''}>
                                    {driverStatuses ? driverStatuses?.map((status, index) => {
                                        return <option value={status.id} key={index}>{status.name}</option>
                                    }) : ''}
                                </Select>
                            }
                        </FormControl>

                    </Styled.ProfileInfo>
                </Styled.ProfileInfoContainer>
            </Styled.ProfileDetails>
            <Styled.ProfileOverView>

                <Tabs variant={'enclosed'} colorScheme={'red'}>

                    <TabList>
                        <Tab>Dados do motorista</Tab>
                        <Tab>Endereço</Tab>
                        <Tab>CNH</Tab>
                        <Tab>Dados bancários</Tab>
                        <Tab>Veículos</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <form onSubmit={handleupdateDriverData}>
                                <Stack spacing={3}>
                                    <DriverForm form={driverDataForm} driver={driver} />
                                    <Divider />
                                    <div>
                                        <Button disabled={!driverDataForm.formState.isValid || driverDataForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
                                    </div>
                                </Stack>
                            </form>
                        </TabPanel>

                        <TabPanel px={0}>
                            <Heading mb={3} size={'md'}>Endereço</Heading>
                            <form onSubmit={handleupdateDriverData}>
                                <Stack spacing={3}>
                                    <Link color={'red'} target={'_blank'} href={driver?.licence?.document_file}>Ver documento <i className={'las la-external-link-alt'}></i></Link>

                                    {driver.address && <AddressForm form={driverDataForm} driver={driver} />}

                                    <Divider />
                                    <Box gap={4} display={'flex'}>
                                        <Button disabled={!driverDataForm.formState.isValid || driverDataForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
                                    </Box>
                                </Stack>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <Heading mb={3} size={'md'}>CNH</Heading>
                            <form onSubmit={handleupdateDriverData}>
                                <Stack spacing={3}>
                                    <Link color={'red'} target={'_blank'} href={driver?.address?.document_file}>Ver documento <i className={'las la-external-link-alt'}></i></Link>

                                    {driver.licence && <LicenceForm form={driverDataForm} driver={driver} />}

                                    <Divider />
                                    <Box gap={4} display={'flex'}>
                                        <Button disabled={!driverDataForm.formState.isValid || driverDataForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
                                    </Box>
                                </Stack>
                            </form>
                        </TabPanel>

                        <TabPanel>
                            <Accordion variant={'filled'} defaultIndex={[0]} allowToggle>
                                {driver?.banks?.map((bank, index) =>

                                    <AccordionItem key={index}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex='1' textAlign='left'> <Heading size={'sm'}>Conta  {index + 1}</Heading> </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <form>
                                                <Stack>
                                                    <BankForm bank={bank} form={driverDataForm} />
                                                    <span><Button>Salvar</Button></span>
                                                </Stack>
                                            </form>
                                        </AccordionPanel>
                                    </AccordionItem>
                                )}
                            </Accordion>
                        </TabPanel>
                        <TabPanel>
                            <DataGrid
                                columns={[
                                    { name: 'id', header: 'id', defaultVisible: false },
                                    { name: 'licence_plate', header: 'Placa', },
                                    { name: 'model', header: 'Modelo', },
                                    { name: 'brand', header: 'Marca' },
                                    { name: 'type', header: 'Tipo', render: ({ value }) => value.name },
                                    { name: 'owner_name', header: 'Nome do responsável', defaultFlex: 1 },
                                    { name: 'owner_document', header: 'Documento do Resposável', defaultFlex: 1 },
                                    { name: 'document_url', header: 'Documento do Veículo', defaultFlex: 1, render: ({ value, ...rest }) => <Link target={'_blank'} href={rest.data.document_url}><ChakraLink>{rest.data.document_url}</ChakraLink></Link> },
                                ]}
                                dataSource={driver.vehicles || []}
                            />

                        </TabPanel>

                        <TabPanel>
                            <PasswordForm form={driverDataForm} />
                        </TabPanel>
                    </TabPanels>

                </Tabs>
            </Styled.ProfileOverView>
        </Styled.ProfileWrapper> : <div>Loading...</div>
    )
}

Driver.config = {
    title: 'Motoristas',
    layout: 'AccountLayout'
}

export default Driver;