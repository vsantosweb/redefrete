import React from 'react'
import { Checkbox, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Spinner, Stack } from '@chakra-ui/react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { CPFValidation } from '@redefrete/helpers';
import { InputCustom, InputFile } from '@redefrete/components';

const vehicleTypes = [
    { id: 1, name: 'Carro', value: 'carros' },
    { id: 2, name: 'Moto', value: 'motos' },
    { id: 3, name: 'Caminhão', value: 'caminhoes' },
]
const VehicleForm = ({ form, vehicle }: any) => {

    const [vehicleBrands, setVehicleBrands] = React.useState(null);
    const [vehicleModels, setVehicleModels] = React.useState(null);
    const [ownerAccount, setOwnerAccount] = React.useState(true);

    React.useEffect(() => {

        if (ownerAccount) {
            form.setValue('vehicle.owner_name', form.watch('name'), { shouldValidate: true })
            form.setValue('vehicle.owner_document', form.watch('document_1'), { shouldValidate: true })
            return;
        }

        form.setValue('vehicle.owner_name', '')
        form.setValue('vehicle.owner_document', '')

    }, [form.watch('name'), form.watch('document_1'), ownerAccount])


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
        console.log(form.getValues('vehicle.type'), e.target.value)
        axios.get('https://parallelum.com.br/fipe/api/v1/' + form.getValues('vehicle.type') + '/marcas/' + e.target.value + '/modelos')
            .then(response => {
                setVehicleModels(response.data.modelos);
                form.setValue('vehicle.brand', vehicleBrands.filter(brand => brand.codigo === e.target.value)[0].nome)
            })
            .catch(error => console.log(error.response))
    }

    return (

        <div>
            <Heading my={3} size={'md'}>Dados do Veículo</Heading>

            <input type={'hidden'} {...form.register('vehicle.brand', { required: true, })} />
            <input type={'hidden'} {...form.register('vehicle.vehicle_type_id', { required: true, })} />

            <Stack spacing={3}>
                <Checkbox defaultChecked={ownerAccount} onChange={() => setOwnerAccount(prev => !prev)}>Eu sou o responsável do veículo</Checkbox>
                {
                    !ownerAccount && <>
                        <FormControl isInvalid={form.formState.errors?.vehicle?.owner_document} isRequired={true}>
                            <FormLabel>CPF Titular</FormLabel>
                            <InputMask
                                alwaysShowMask={true}
                                maskChar={null}
                                type={'tel'}
                                defaultValue={vehicle?.document || ''}
                                mask={'999.999.999-99'}
                                {...form.register('vehicle.owner_document', {
                                    required: true,
                                    setValueAs: v => v.replace(/[^\d]/g, ''),
                                    validate: v => CPFValidation(v)
                                })}>
                                {(inputProps => <Input {...inputProps} autoComplete={'off'} placeholder={'000.000.000-00'} />)}
                            </InputMask>
                            <FormErrorMessage>CPF Inválido</FormErrorMessage>
                        </FormControl>
                        <FormControl isRequired={true}>
                            <FormLabel>Nome do Titular</FormLabel>
                            <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('vehicle.owner_name', { required: true })} />
                        </FormControl>
                    </>
                }

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
                        {vehicleModels?.map((model, index) => <option key={index} value={model.codigo}>{model.nome}</option>)}
                    </Select>
                </FormControl>

                <Stack direction={'row'}>
                    <FormControl isRequired={true} >
                        <FormLabel>Placa</FormLabel>
                        <Input style={{textTransform: 'uppercase'}} autoComplete={'off'} maxLength={7} {...form.register('vehicle.licence_plate', { required: true })} />
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