import React from 'react'
import { Checkbox, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { CPFValidation, licencePlateValidator, stateList } from '@redefrete/helpers';
import { DocumentInput, InputCustom, InputFile } from '@redefrete/components';

import { container, SERVICE_KEYS } from '@redefrete/container';
import { IVehicleRepository } from 'libs/repository/Interfaces/Vehicle/IVehicleRepository';
import moment from 'moment';

const vehicleRepository = container.get<IVehicleRepository>(SERVICE_KEYS.VEHICLE_REPOSITORY);

const vehicleTypes = [
    { id: 1, name: 'PASSEIO', value: 'carros' },
    { id: 2, name: 'MOTO', value: 'motos' },
    { id: 3, name: 'TRUCK', value: 'caminhoes' },
    { id: 4, name: 'UTILITÁRIO', value: 'caminhoes' },
    { id: 5, name: 'VAN', value: 'caminhoes' },
    { id: 6, name: 'VLC', value: 'caminhoes' },
    { id: 7, name: 'VUC', value: 'caminhoes' },
    { id: 8, name: 'KOMBI', value: 'caminhoes' },
    { id: 9, name: '¾ (TRÊS QUARTOS)', value: 'caminhoes' },
    { id: 10, name: 'TOCO', value: 'caminhoes' },
]

const VehicleForm = ({ form, vehicle, driver = {} }: any) => {

    const [vehicleBrands, setVehicleBrands] = React.useState(null);
    const [vehicleModels, setVehicleModels] = React.useState(null);
    const [ownerAccount, setOwnerAccount] = React.useState(true);
    const [licenceVehicleMessage, setLicenceVehicleMessage] = React.useState(null);
    const [selectedDocument, setSelectedDocument] = React.useState('document_1');
    const formField = {
        name: form.watch('name'),
        document_1: form.watch('document_1'),
        mother_name: form.watch('mother_name'),
        birthday: form.watch('birthday'),
        rg: form.watch('rg'),
        rg_issue: form.watch('rg_issue'),
        rg_uf: form.watch('rg_uf'),
    }
    React.useEffect(() => {

        if (ownerAccount) {

            form.setValue('vehicle.owner_name', driver.name, { shouldValidate: true })
            form.setValue('vehicle.owner_document', driver.document_1, { shouldValidate: true })
            form.setValue('vehicle.owner_mother_name', driver.mother_name, { shouldValidate: true })
            form.setValue('vehicle.owner_birthday', driver.birthday, { shouldValidate: true })
            form.setValue('vehicle.owner_rg', driver.rg, { shouldValidate: true })
            form.setValue('vehicle.owner_rg_issue', driver.rg_issue, { shouldValidate: true })
            form.setValue('vehicle.owner_rg_uf', driver.rg_uf, { shouldValidate: true })
            form.setValue('vehicle.owner_phone', driver.phone, { shouldValidate: true })

            form.setValue('vehicle.owner_address_1', driver.address.address_1, { shouldValidate: true })
            form.setValue('vehicle.owner_address_2', driver.address.address_2, { shouldValidate: true })
            form.setValue('vehicle.owner_address_zipcode', driver.address.zipcode, { shouldValidate: true })
            form.setValue('vehicle.owner_address_number', driver.address.number, { shouldValidate: true })
            form.setValue('vehicle.owner_address_complement', driver.address.complement, { shouldValidate: true })
            form.setValue('vehicle.owner_address_city', driver.address.city, { shouldValidate: true })
            form.setValue('vehicle.owner_address_state', driver.address.state, { shouldValidate: true })

            return;
        }

        form.setValue('vehicle.owner_name', '', { shouldValidate: true })
        form.setValue('vehicle.owner_document', '', { shouldValidate: true })
        form.setValue('vehicle.owner_name', '', { shouldValidate: true })
        form.setValue('vehicle.owner_document', '', { shouldValidate: true })
        form.setValue('vehicle.owner_mother_name', '', { shouldValidate: true })
        form.setValue('vehicle.owner_birthday', '', { shouldValidate: true })
        form.setValue('vehicle.owner_rg', '', { shouldValidate: true })
        form.setValue('vehicle.owner_rg_issue', '', { shouldValidate: true })
        form.setValue('vehicle.owner_rg_uf', '', { shouldValidate: true })
        form.setValue('vehicle.owner_phone', '', { shouldValidate: true })

        form.setValue('vehicle.owner_address_1', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_2', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_zipcode', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_number', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_complement', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_city', '', { shouldValidate: true })
        form.setValue('vehicle.owner_address_state', '', { shouldValidate: true })

    }, [driver, form, ownerAccount]
    )


    // const getBrands = (e) => {

    //     if (vehicleModels && vehicleBrands) {
    //         setVehicleBrands(null)
    //         setVehicleModels(null)
    //         form.resetField('vehicle.brand')
    //         form.resetField('vehicle.brand_code')
    //         form.resetField('vehicle.model')

    //     }
    //     axios.get('https://parallelum.com.br/fipe/api/v1/' + e.target.value + '/marcas').then(response => {

    //         setVehicleBrands(response.data);
    //         form.setValue('vehicle.vehicle_type_id', vehicleTypes.filter(type => type.value === e.target.value)[0].id)

    //     })
    //         .catch(error => console.log(error.response.data))
    // }

    const getModels = (e) => {

        axios.get('https://parallelum.com.br/fipe/api/v1/' + form.getValues('vehicle.type') + '/marcas/' + e.target.value + '/modelos')
            .then(response => {
                setVehicleModels(response.data.modelos);
                form.setValue('vehicle.brand', vehicleBrands.filter(brand => brand.codigo === e.target.value)[0].nome)
            })
            .catch(error => console.log(error.response))
    }

    const resetAddress = () => {
        form.setValue('vehicle.owner_address_1', '')
        form.setValue('vehicle.owner_address_2', '')
        form.setValue('vehicle.owner_address_city', '')
        form.setValue('vehicle.owner_address_state', '')
    }

    const fillAddressFields = (zipcode: string) => {

        axios.get(`https://viacep.com.br/ws/${zipcode}/json`).then(response => {
            if (response.data.erro) return resetAddress()
            form.setValue('vehicle.owner_address_1', response.data.logradouro)
            form.setValue('vehicle.owner_address_2', response.data.bairro)
            form.setValue('vehicle.owner_address_city', response.data.localidade)
            form.setValue('vehicle.owner_address_state', response.data.uf)
        })

    }

    return (

        <div>
            <Heading my={3} size={'md'}>Dados do Proprietário</Heading>

            <input type={'hidden'} {...form.register('vehicle.brand', { required: true, })} />

            <Stack spacing={3}>
                <Checkbox defaultChecked={ownerAccount} onChange={() => setOwnerAccount(prev => !prev)}>Eu sou proprietário do veículo</Checkbox>
                {
                    !ownerAccount && <>
                        <DocumentInput
                            field={'vehicle.owner_document'}
                            selectedDocument={(value) => setSelectedDocument(value)}
                            useForm={form}
                        />
                        <FormControl isRequired={true}>
                            <FormLabel>Nome do Titular</FormLabel>
                            <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('vehicle.owner_name', { required: true })} />
                        </FormControl>


                        {selectedDocument === 'document_1' && <>
                            <FormControl isRequired={true}>
                                <FormLabel>Nome da mãe</FormLabel>
                                <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('vehicle.owner_mother_name', { required: true })} />
                            </FormControl>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Data de nascimento</FormLabel>
                                <Input
                                    type={'date'}
                                    autoComplete={'off'}
                                    max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
                                    {...form.register('vehicle.owner_birthday', { required: true, minLength: 4 })}
                                />
                            </FormControl>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Nº RG</FormLabel>
                                <InputCustom
                                    accept={'noSpecialChar'}
                                    maxLength={9}
                                    autoComplete={'off'}
                                    {...form.register('vehicle.owner_rg', { required: true, minLength: 4 })}
                                />
                            </FormControl>

                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>UF</FormLabel>
                                <Select  {...form.register('vehicle.owner_rg_uf', { required: true })}>
                                    {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                                </Select>
                            </FormControl>

                            <Stack direction={'row'}>
                                <FormControl isRequired={true} variant={'floating'}>
                                    <FormLabel>Data de emissão</FormLabel>
                                    <Input
                                        type={'date'} autoComplete={'off'}
                                        {...form.register('vehicle.owner_rg_issue', { required: true })} />
                                </FormControl>
                            </Stack>
                            <FormControl variant={'floating'}>
                                <FormLabel>Telefone/Whatsapp</FormLabel>
                                <InputMask
                                    mask={'(99) 99999-9999'}
                                    autoComplete={'off'}
                                    type={'tel'}
                                    defaultValue={vehicle?.owner_phone || null}
                                    {...form.register('vehicle.owner_phone', { required: true, minLength: 11, setValueAs: v => v.replace(/[^\d]/g, '') })}
                                >
                                    {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99 99999-999'} />)}
                                </InputMask>
                            </FormControl>
                        </>
                        }
                        <Heading size={'md'}>Endereço</Heading>
                        <FormControl isRequired={true} variant={'floating'}>
                            <FormLabel>CEP</FormLabel>
                            <InputMask
                                alwaysShowMask={true}
                                maskChar={null}
                                type={'tel'}
                                defaultValue={vehicle?.zipcode}
                                mask={'99999-999'}
                                {...form.register('vehicle.owner_address_zipcode', {
                                    required: true,
                                    maxLength: 8,
                                    setValueAs: v => v.replace(/[^\d]/g, ''),
                                    validate: (value) => {
                                        return value.length === 8 ? fillAddressFields(value) : resetAddress()
                                    }
                                })}>
                                {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'99999-999'} />)}
                            </InputMask>

                        </FormControl>

                        <FormControl isRequired={true} variant={'floating'}>
                            <FormLabel>Endereço</FormLabel>
                            <Input defaultValue={vehicle?.owner_address_1} autoComplete={'off'}  {...form.register('vehicle.owner_address_1', { required: true })} />
                        </FormControl>
                        <FormControl isRequired={true} variant={'floating'}>
                            <FormLabel>Bairro</FormLabel>
                            <Input defaultValue={vehicle?.owner_address_2} autoComplete={'off'}  {...form.register('vehicle.owner_address_2', { required: true })} />
                        </FormControl>

                        <Stack direction={'row'}>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Cidade</FormLabel>
                                <Input defaultValue={vehicle?.owner_address_city} autoComplete={'off'} {...form.register('vehicle.owner_address_city', { required: true })} />
                            </FormControl>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Estado</FormLabel>
                                <Input defaultValue={vehicle?.owner_address_state} autoComplete={'off'}  {...form.register('vehicle.owner_address_state', { required: true })} />
                            </FormControl>
                        </Stack>
                        <Stack direction={'row'}>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Nº</FormLabel>
                                <Input defaultValue={vehicle?.owner_address_number} autoComplete={'off'} type={'tel'}  {...form.register('vehicle.owner_address_number', { required: true })} />
                            </FormControl>
                            <FormControl variant={'floating'}>
                                <FormLabel>Complemento</FormLabel>
                                <Input defaultValue={vehicle?.owner_address_complement} autoComplete={'off'} {...form.register('vehicle.owner_address_complement')} />
                            </FormControl>
                        </Stack>
                    </>

                }
                {/* Dados do Beículo */}
                <hr />
                <Heading my={3} size={'md'}>Dados do Veículo</Heading>

                <Stack direction={'row'}>

                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Tipo</FormLabel>
                        <Select placeholder={'Tipo de veículo'} {...form.register('vehicle.vehicle_type_id', { required: true })}  >
                            {vehicleTypes.map((type, index) => <option value={type.id} key={index}>{type.name} </option>)}
                        </Select>
                    </FormControl>

                    <FormControl isRequired={true}>
                        <FormLabel>Marca</FormLabel>
                        <Input
                            autoComplete={'off'}
                            {...form.register('vehicle.brand', { required: true })}
                        />
                    </FormControl>
                </Stack>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Modelo</FormLabel>
                    <Input
                        autoComplete={'off'}
                        {...form.register('vehicle.model', { required: true, })}
                    />
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Ano de Fabricação</FormLabel>
                    <Input
                        type={'phone'}
                        autoComplete={'off'}
                        {...form.register('vehicle.manufacture_year', { required: true, })}
                    />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Ano modelo</FormLabel>
                    <Input
                        type={'phone'}
                        autoComplete={'off'}
                        {...form.register('vehicle.model_year', { required: true, })}
                    />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Chassi</FormLabel>
                    <Input defaultValue={vehicle?.chassis} autoComplete={'off'}  {...form.register('vehicle.chassis', { required: true })} />
                </FormControl>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Cor</FormLabel>
                    <Input defaultValue={vehicle?.color} autoComplete={'off'}  {...form.register('vehicle.color', { required: true })} />
                </FormControl>

                <Stack direction={'row'}>
                    <FormControl isInvalid={form.formState.errors?.vehicle?.licence_plate} isRequired={true} >
                        <FormLabel>Placa</FormLabel>
                        <InputCustom
                            accept={'noSpecialChar'}
                            style={{ textTransform: 'uppercase' }}
                            autoComplete={'off'}
                            maxLength={7}
                            {...form.register('vehicle.licence_plate', {
                                required: true,
                                validate: async (licencePlate: string) => {

                                    if (!licencePlateValidator(licencePlate)) {
                                        setLicenceVehicleMessage('Placa inválida')
                                        return false;
                                    }

                                    return licencePlate.length >= 7 && licencePlateValidator(licencePlate) ? await vehicleRepository.checkVehicleExists(licencePlate)
                                        .then(response => {
                                            setLicenceVehicleMessage(response.message)
                                            return response.success
                                        }) : setLicenceVehicleMessage(null)
                                }



                            })}
                        />
                        <FormErrorMessage>{licenceVehicleMessage}</FormErrorMessage>
                    </FormControl>
                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Renavam</FormLabel>
                        <InputMask
                            alwaysShowMask={true}
                            maskChar={null}
                            type={'tel'}
                            mask={'99999999999'}
                            {...form.register('vehicle.licence_number', { required: true })}
                        >
                            {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'00000000000'} />)}
                        </InputMask>
                    </FormControl>


                </Stack>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>UF</FormLabel>
                    <Select defaultValue={vehicle?.uf || ''} {...form.register('vehicle.uf', { required: true })}>
                        {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                    </Select>
                </FormControl>
                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Cidade</FormLabel>
                    <Input
                        autoComplete={'off'}
                        {...form.register('vehicle.city', { required: true, })}
                    />
                </FormControl>
                <InputFile
                    required
                    label={'Documento do veículo'}
                    acceptFiles={['PNG', 'JPG', 'GIF', 'PDF']}
                    maxSize={'2MB'}
                    {...form.register('vehicle.document_file', { required: true })}
                />

            </Stack>

        </div>
    )
}

export default VehicleForm;