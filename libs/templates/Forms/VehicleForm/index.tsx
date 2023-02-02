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
    { id: 1, name: 'Carro', value: 'carros' },
    { id: 2, name: 'Moto', value: 'motos' },
    { id: 3, name: 'Caminhão', value: 'caminhoes' },
]
const VehicleForm = ({ form, vehicle }: any) => {

    const [vehicleBrands, setVehicleBrands] = React.useState(null);
    const [vehicleModels, setVehicleModels] = React.useState(null);
    const [ownerAccount, setOwnerAccount] = React.useState(true);
    const [licenceVehicleMessage, setLicenceVehicleMessage] = React.useState(null);

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

            form.setValue('vehicle.owner_name', formField.name, { shouldValidate: true })
            form.setValue('vehicle.owner_document', formField.document_1, { shouldValidate: true })
            form.setValue('vehicle.owner_mother_name', formField.mother_name, { shouldValidate: true })
            form.setValue('vehicle.owner_birthday', formField.birthday, { shouldValidate: true })
            form.setValue('vehicle.owner_rg', formField.rg, { shouldValidate: true })
            form.setValue('vehicle.owner_rg_issue', formField.rg_issue, { shouldValidate: true })
            form.setValue('vehicle.owner_rg_uf', formField.rg_uf, { shouldValidate: true })

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

    }, [
        formField?.name,
        formField?.document_1,
        formField.birthday,
        formField.mother_name,
        formField.rg,
        formField.rg_issue,
        formField.rg_uf,
        ownerAccount,
        form
    ]
    )


    const getBrands = (e) => {

        if (vehicleModels && vehicleBrands) {
            setVehicleBrands(null)
            setVehicleModels(null)
            form.resetField('vehicle.brand')
            form.resetField('vehicle.brand_code')
            form.resetField('vehicle.model')

        }
        axios.get('https://parallelum.com.br/fipe/api/v1/' + e.target.value + '/marcas').then(response => {

            setVehicleBrands(response.data);
            form.setValue('vehicle.vehicle_type_id', vehicleTypes.filter(type => type.value === e.target.value)[0].id)

        })
            .catch(error => console.log(error.response.data))
    }

    const getModels = (e) => {

        axios.get('https://parallelum.com.br/fipe/api/v1/' + form.getValues('vehicle.type') + '/marcas/' + e.target.value + '/modelos')
            .then(response => {
                setVehicleModels(response.data.modelos);
                form.setValue('vehicle.brand', vehicleBrands.filter(brand => brand.codigo === e.target.value)[0].nome)
            })
            .catch(error => console.log(error.response))
    }

    return (

        <div>
            <Heading my={3} size={'md'}>Dados do Proprietário</Heading>

            <input type={'hidden'} {...form.register('vehicle.brand', { required: true, })} />
            <input type={'hidden'} {...form.register('vehicle.vehicle_type_id', { required: true, })} />

            <Stack spacing={3}>
                <Checkbox defaultChecked={ownerAccount} onChange={() => setOwnerAccount(prev => !prev)}>Eu sou proprietário do veículo</Checkbox>
                {
                    !ownerAccount && <>
                        <DocumentInput field={'vehicle.owner_document'} useForm={form} />
                        <FormControl isRequired={true}>
                            <FormLabel>Nome do Titular</FormLabel>
                            <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('vehicle.owner_name', { required: true })} />
                        </FormControl>
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

                        <Stack direction={'row'}>
                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>Data de emissão</FormLabel>
                                <Input
                                    type={'date'} autoComplete={'off'}
                                    {...form.register('vehicle.owner_rg_issue', { required: true })} />
                            </FormControl>

                            <FormControl isRequired={true} variant={'floating'}>
                                <FormLabel>UF</FormLabel>
                                <Select  {...form.register('vechile.owner_rg_uf', { required: true })}>
                                    {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                                </Select>
                            </FormControl>
                        </Stack>

                    </>
                }
                <hr />
                <Heading my={3} size={'md'}>Dados do Veículo</Heading>

                <Stack direction={'row'}>

                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Tipo</FormLabel>
                        <Select onChangeCapture={getBrands} placeholder={'Tipo de veículo'} {...form.register('vehicle.type', { required: true })}  >
                            {vehicleTypes.map((type, index) => <option value={type.value} key={index}>{type.name} </option>)}
                        </Select>
                    </FormControl>

                    <FormControl isRequired={true}>
                        <FormLabel>Marca</FormLabel>
                        <Select onChangeCapture={getModels} placeholder={'Marca do veículo'} isDisabled={!vehicleBrands}
                            {...form.register('vehicle.brand_code', { required: true })}
                        >
                            {vehicleBrands?.map((brand, index) => <option key={index} value={brand.codigo}>{brand.nome}</option>)}
                        </Select>
                    </FormControl>
                </Stack>

                <FormControl isRequired={true} variant={'floating'}>
                    <FormLabel>Modelo</FormLabel>
                    <Select placeholder={'Marca do veículo'} isDisabled={!vehicleModels} {...form.register('vehicle.model', { required: true, })}>
                        {vehicleModels?.map((model, index) => <option key={index} value={model.nome}>{model.nome}</option>)}
                    </Select>
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
                        <FormLabel>UF</FormLabel>
                        <Select defaultValue={vehicle?.uf || ''} {...form.register('vehicle.uf', { required: true })}>
                            {stateList.map(state => <option key={state} value={state}>{state}</option>)}
                        </Select>
                    </FormControl>

                </Stack>

                <InputFile
                    required
                    label={'Documento do veículo'}
                    acceptFiles={['PNG', 'JPG', 'GIF']}
                    maxSize={'2MB'}
                    {...form.register('vehicle.document_file', { required: true })}
                />

            </Stack>

        </div>
    )
}

export default VehicleForm;