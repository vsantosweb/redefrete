import React from 'react'
import { FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { InputCustom } from '@redefrete/components';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverRepository } from '@redefrete/interfaces';
import { suspenseResource } from '@redefrete/helpers';

const driverRepository = container.get<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY);

const statusList = suspenseResource(driverRepository.statusList);

const DriverForm = ({ form, driver }: any) => {
    
    return (
        <Stack spacing={3}>
            <FormControl isRequired={true} variant={'floating'}>
                <FormLabel>Nome do motorista</FormLabel>
                <InputCustom accept={'alpha'} defaultValue={driver.name || null} {...form.register('name', { required: true, pattern: { value: /[A-Za-z]/ } })} />
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Email</FormLabel>
                <Input type={'email'} defaultValue={driver.email || null} {...form.register('email', { required: true, minLength: 8 })} />
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Telefone/Whatsapp</FormLabel>
                <Input type={'tel'} defaultValue={driver.phone || null} {...form.register('phone', { required: true, minLength: 8 })} />
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Gênero</FormLabel>
                <Select placeholder={'Selecione...'} defaultValue={driver.gender || null}>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                </Select>
            </FormControl>

            <FormControl variant={'floating'}>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={driver.status || null}>
                    {statusList.read().data.map((status, index) => <option key={index}>{status.name}</option>)}
                </Select>
            </FormControl>
        </Stack>
    )
}

export default DriverForm;