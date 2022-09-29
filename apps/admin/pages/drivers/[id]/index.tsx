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
} from '@chakra-ui/react'
import { AddressForm, BankForm, DriverForm, PasswordForm, VehicleForm } from '@redefrete/templates/forms';
import { useForm } from "react-hook-form";
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverRepository } from '@redefrete/interfaces';
import { GetServerSideProps, GetStaticProps } from 'next';
import { DriverProfileProps } from '@redefrete/types';
import { DataGrid } from '@redefrete/components';
import { IColumn } from '@inovua/reactdatagrid-enterprise/types';
import Link from 'next/link';
import { suspenseResource } from '@redefrete/helpers';
import api from '../../api';
import { useRouter } from 'next/router';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);

const columns: Array<IColumn> = [
    { name: 'id', header: 'id', defaultVisible: false },
    { name: 'name', header: 'Nome', render: ({ value, ...rest }) => <strong>{rest.data.document.name}</strong> },
    { name: 'file_path', header: 'URL', defaultFlex: 1.3, render: ({ value, ...rest }) => <Link target={'_blank'} href={rest.data.file_path}><ChakraLink>{rest.data.file_path}</ChakraLink></Link> },

];


export const getServerSideProps: GetServerSideProps = async (context) => {


    // const resource = await suspenseResource(driverRepository.show, 9).read()


    return {
        props: {
            driverId: 'resource'
        },
    }
}

driverRepository.show(9).then(response => console.log(response))

const Driver: Page = (driverId) => {

    const [driver, setDriver] = React.useState<DriverProfileProps>({})

    React.useEffect(() => {
        driverRepository.show(9).then(response => setDriver(response.data))
    }, [])

    const driverDataForm = useForm({ mode: 'onChange' });

    const handleupdateDriverData = async (formData) => {
        console.log(formData)
    }

    return (
        <Styled.ProfileWrapper>
            <Styled.ProfileDetails>
                <Styled.ProfileInfoContainer>
                    <Avatar name={driver.name} />
                    <Styled.ProfileInfo>
                        <Styled.ProfileInfoLabel>{driver.name}</Styled.ProfileInfoLabel>
                        <Styled.ProfileInfoValue>{driver.email}</Styled.ProfileInfoValue>
                    </Styled.ProfileInfo>
                </Styled.ProfileInfoContainer>
            </Styled.ProfileDetails>
            <Styled.ProfileOverView>
                <Tabs variant={'enclosed'} colorScheme={'red'}>

                    <TabList>
                        <Tab>Dados do motorista</Tab>
                        <Tab>Documentos</Tab>
                        <Tab>Dados bancários</Tab>
                        <Tab>Veículos</Tab>
                        <Tab>Senha</Tab>
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

                        <TabPanel>
                            <DataGrid
                                columns={columns}
                                dataSource={driver.documents || []}
                            />
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
                                    { name: 'brand', header: 'Marca' },
                                    { name: 'licence_plate', header: 'Placa', },
                                    { name: 'owner_document', header: 'Documento do Resposável' },
                                    { name: 'owner_name', header: 'Nome do responsável' },
                                    { name: 'document_url', header: 'Document', defaultFlex: 1.3, render: ({ value, ...rest }) => <Link target={'_blank'} href={rest.data.document_url}><ChakraLink>{rest.data.document_url}</ChakraLink></Link> },
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
        </Styled.ProfileWrapper>
    )
}

Driver.config = {
    title: 'Motoristas',
    layout: 'AccountLayout'
}

export default (Driver);