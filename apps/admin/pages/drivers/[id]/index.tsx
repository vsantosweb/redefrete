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
    Link,
    Alert,
    AlertIcon,
    AlertTitle,
    ModalOverlay,
    ModalContent,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    ModalFooter,
    useDisclosure,
    Spinner
} from '@chakra-ui/react'
import { AddressForm, BankForm, DriverForm, LicenceForm, PasswordForm, VehicleForm } from '@redefrete/templates/forms';
import { useForm } from "react-hook-form";
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverBankRepository, IDriverRepository, IDriverVehicleRepository } from '@redefrete/interfaces';
import { DataGrid, Loader } from '@redefrete/components';
import { useRouter } from 'next/router';
import { DriverProfile } from '@redefrete/types';
import { base64FileConverter } from '@redefrete/helpers';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);
const driverBankRepository = container.get<IDriverBankRepository>(SERVICE_KEYS.DRIVER_BANK_REPOSITORY);
const driverVehicleRepository = container.get<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY);


const Driver: Page = () => {

    const [driver, setDriver] = React.useState<DriverProfile>(null)
    const [driverStatuses, setDriverStatuses] = React.useState(null)

    const [apiStatusError, setApiStatusError] = React.useState(null)

    const router = useRouter();
    const [formAction, setFormAction] = React.useState<string | any>(router?.query.action)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const showDriver = (driverId) => {
        return driverRepository.show(driverId).then(response => setDriver(response.data))
    };

    React.useEffect(() => {

        showDriver(router.query.id)

        driverRepository.statusList().then().then(response => setDriverStatuses(response.data))

    }, [router.query.id])

    React.useEffect(() => {
        const timeOut = setTimeout(() => setFormAction(null), 2000)

        return () => { clearTimeout(timeOut) }
    }, [formAction])

    const driverDataForm = useForm({ mode: 'onChange' });
    const addressForm = useForm({ mode: 'onChange' });
    const licenceForm = useForm({ mode: 'onChange' });
    const bankForm = useForm({ mode: 'onChange' });
    const vehicleForm = useForm({ mode: 'onChange' });

    const handleupdateDriverData = async (formData) => {
        await driverRepository.update(router?.query.id, formData).then(response => {
            setFormAction('updated')
        })
        console.log(formData)
    }

    const changeStatus = (e) => {
        driverRepository.changeStatus(router.query.id, { driver_status_id: e.target.value })
            .then(response => {
                showDriver(router.query.id)
                setFormAction('updated')
            })
    }

    const resultMessages = {
        created: 'Cadastro efetuado com sucesso!',
        updated: 'Os dados foram atualizados.'
    }

    const handleUpdateOrCreateDriverAddress = async (formData) => {
        const { address } = formData;
        address.document_file = await base64FileConverter(address.document_file[0])
        await driverRepository.makeAddress(address, router.query.id).then(response => {
            setFormAction('updated')
            showDriver(router.query.id)

        })
    }

    const handleUpdateOrCreateDriverLicence = async (formData) => {

        const { licence } = formData;
        licence.document_file = await base64FileConverter(licence.document_file[0])

        await driverRepository.makeLicence(licence, router.query.id).then(response => {
            setFormAction('updated')
            showDriver(router.query.id)
        })
    }

    const handleCreateBank = async (formData) => {

        const { driver_bank } = formData;

        await driverBankRepository.create(driver_bank, router.query.id).then(response => {
            setFormAction('created')
            showDriver(router.query.id)
        })
    }

    const handleUpdateBank = async (formData) => {

        const { driver_bank } = formData;

        await driverBankRepository.update(driver_bank, router.query.id, driver?.banks[0].id).then(response => {
            setFormAction('updated')
        })
    }

    const handleCreateVehicle = async (formData) => {
        const data = { ...formData.vehicle, }

        data.document_file = await base64FileConverter(data.document_file[0]);
        data.driver_bank_id = formData.driver_bank_id
        await driverVehicleRepository.createVehicle(data, driver.id).then(response => {
            onClose()
            showDriver(router.query.id);
            setFormAction('created')
        }).catch(error => setApiStatusError(error.response.data.message))
    }

    return (
        driver ? <Styled.ProfileWrapper>

            <Alert status='info'>
                <AlertIcon />
                <AlertTitle>Importante:</AlertTitle>
                Para poder realizar o cadastro de veículos é necessário ter o cadastro completo do motorista!
            </Alert>
            {formAction && <Alert status={'success'}><AlertIcon />{resultMessages[formAction]}</Alert>}

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

                <Tabs variant={'line'} height={'100%'} colorScheme={'red'}>

                    <TabList>
                        <Tab>Dados do motorista</Tab>
                        <Tab>{!driver.address && <i style={{ color: 'red', marginRight: '4px' }} className={'las la-exclamation-circle la-2x'}></i>} Endereço</Tab>
                        <Tab>{!driver.licence && <i style={{ color: 'red', marginRight: '4px' }} className={'las la-exclamation-circle la-2x'}></i>} CNH</Tab>
                        <Tab>{driver.banks.length === 0 && <i style={{ color: 'red', marginRight: '4px' }} className={'las la-exclamation-circle la-2x'}></i>} Dados Bancários</Tab>
                        <Tab isDisabled={
                            !driver.address ||
                                !driver.licence ||
                                driver.banks?.length <= 0 ? true : false
                        }>Veículos</Tab>
                        <Tab isDisabled={driver.hubs?.length <= 0 ? true : false}>{"Hub's"}</Tab>

                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <form onSubmit={driverDataForm.handleSubmit(handleupdateDriverData)}>
                                <Stack spacing={3}>
                                    <DriverForm form={driverDataForm} driver={driver} />
                                    <Divider />
                                    <div>
                                        <Button
                                            type={'submit'}
                                            isLoading={driverDataForm.formState.isSubmitting}
                                            colorScheme={'primary'}>Salvar</Button>
                                    </div>
                                </Stack>
                            </form>
                        </TabPanel>
                        <TabPanel px={0}>
                            <Heading mb={3} size={'md'}>Endereço</Heading>
                            <form onSubmit={addressForm.handleSubmit(handleUpdateOrCreateDriverAddress)}>
                                <Stack spacing={3}>
                                    {driver.address && <Link color={'red'} target={'_blank'} href={driver?.address?.document_file}>Ver documento <i className={'las la-external-link-alt'}></i></Link>}

                                    <AddressForm form={addressForm} address={driver.address} />

                                    <Divider />
                                    <Box gap={4} display={'flex'} alignItems={'center'}>
                                        <Button type={'submit'} isLoading={addressForm.formState.isSubmitting} colorScheme={'primary'}>Salvar</Button>
                                        {addressForm.formState.isSubmitting && <> Registrando endereço e calculando {"Hub's"} disponíveis... <Spinner /></>}
                                    </Box>
                                </Stack>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <Heading mb={3} size={'md'}>CNH</Heading>
                            <form onSubmit={licenceForm.handleSubmit(handleUpdateOrCreateDriverLicence)}>
                                <Stack spacing={3}>

                                    {driver.licence && <Link color={'red'} target={'_blank'} href={driver?.licence?.document_file}>Ver documento <i className={'las la-external-link-alt'}></i></Link>}

                                    <LicenceForm form={licenceForm} licence={driver.licence} />
                                    <Divider />

                                    <Box gap={4} display={'flex'}>
                                        <Button
                                            isLoading={licenceForm.formState.isSubmitting}
                                            type={'submit'}
                                            colorScheme={'primary'}>Salvar</Button>
                                    </Box>
                                </Stack>
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <Accordion variant={'filled'} defaultIndex={[0]} allowToggle>
                                <form onSubmit={driver?.banks[0] ? bankForm.handleSubmit(handleUpdateBank) : bankForm.handleSubmit(handleCreateBank)}>
                                    <Stack>
                                        <BankForm bank={driver?.banks[0]} form={bankForm} />
                                        <span><Button colorScheme={'primary'} type={'submit'}>Salvar</Button></span>
                                    </Stack>
                                </form>


                                {/* {driver?.banks?.map((bank, index) =>

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
                                )} */}
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

                            <Box display={'flex'} flexDirection={'column'} gap={3}>
                                <Loader isPromisse={true} area={'fetch-vehicles'}>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} style={{ textAlign: 'right' }}>
                                        <Button onClick={onOpen} leftIcon={<i className={'las la-plus'}></i>} colorScheme={'primary'}>Adicionar</Button>
                                    </Box>

                                </Loader>
                                <Modal scrollBehavior={'inside'} size={'xl'} isCentered isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <form onSubmit={vehicleForm.handleSubmit(handleCreateVehicle)}>
                                        <ModalContent>
                                            <ModalHeader>Cadastrar novo Veículo</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Stack>
                                                    {apiStatusError && <Alert size={'sm'} status={'error'}>Erro: {apiStatusError}</Alert>}

                                                    <VehicleForm form={vehicleForm} driver={driver} />
                                                    <FormControl isInvalid={false}>
                                                        <FormLabel>Conta para pagamento</FormLabel>
                                                        <Select placeholder={'Selecione...'} {...vehicleForm.register('driver_bank_id', { required: true })}>
                                                            {driver.banks.map((bank, index) => <option key={index} value={bank.id}> {bank.bank_name} </option>)}
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
                            </Box>

                        </TabPanel >
                        <TabPanel>
                            <DataGrid
                                style={{ height: '550px' }}
                                columns={[
                                    { name: 'id', header: 'id', defaultVisible: false },
                                    { name: 'code', header: 'Código', },
                                    { name: 'name', header: 'HUB', defaultFlex: 1 },
                                    { name: 'distance', header: 'Distância(km/m)', render: ({ data }) => (data.pivot.distance / 1000).toFixed(2)  },
                                ]}
                                dataSource={driver.hubs || []}
                            />                        </TabPanel>
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