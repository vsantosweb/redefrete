import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, Stack } from '@chakra-ui/react';
import axios, { Axios } from 'axios';
import InputMask from 'react-input-mask';
import { Banks } from '../../../../resources/helpers/Banks';
import CPFValidation from '../../../../resources/helpers/CPFValidation';
import { UseFormProps } from 'react-hook-form';
import InputCustom from '../../../../resources/components/UI/Input/InputCustom';
import InputFile from '../../InputFile';

const vehicleTypes = [
    { id: 1, name: 'Carro', value: 'carros' },
    { id: 2, name: 'Moto', value: 'motos' },
    { id: 3, name: 'Caminhão', value: 'caminhoes' },
]
const VehicleForm = ({ form }) => {

    const [vehicleBrands, setVehicleBrands] = React.useState(null);
    const [vehicleModels, setVehicleModels] = React.useState(null);

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
            <Heading my={3} size={'md'}>Dados do Veículo</Heading>

            <input type={'hidden'} {...form.register('vehicle.brand', { required: true, })} />
            <input type={'hidden'} {...form.register('vehicle.vehicle_type_id', { required: true, })} />

            <Stack spacing={3}>
                <Stack direction={'row'}>

                    <FormControl isRequired={true} variant={'floating'}>
                        <FormLabel>Tipo</FormLabel>
                        <Select onChangeCapture={getBrands} placeholder={'Tipo de veículo'} {...form.register('vehicle.type', { required: true, })}  >
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
                        <InputCustom autoComplete={'off'} accept={'alpha'} maxLength={7} {...form.register('vehicle.licence_plate', { required: true })} />
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
                    <FormLabel>Nome do Responsável</FormLabel>
                    <InputCustom accept={'alpha'} autoComplete={'off'} {...form.register('vehicle.owner_name', { required: true })} />
                </FormControl>
                <FormControl isInvalid={form.formState.errors?.vehicle?.owner_document} isRequired={true} variant={'floating'}>
                    <FormLabel>CPF Responsável</FormLabel>
                    <InputMask
                        alwaysShowMask={true}
                        maskChar={null}
                        type={'tel'}
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

                <InputFile
                    required
                    label={'Documento do veículo'}
                    acceptFiles={['PNG', 'JPG', 'GIF']}
                    maxSize={'2MB'}
                    {...form.register('vehicle.document_file', { require: true })}
                />

            </Stack>

        </div>
    )
}

export default VehicleForm;